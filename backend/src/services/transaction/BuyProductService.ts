import { GraphQLError } from 'graphql'
import { TransactionRepository } from '../../database/TransactionRepository'
import { ProductRepository } from '../../database/ProductRepository'
import { DataLoaders } from '../../providers/DataLoaders'
import { Service } from '../Service'

export class BuyProductService extends Service {
  private transactionRepository: TransactionRepository
  private productRepository: ProductRepository

  constructor(
    private buyerId: string,
    private productId: string,
    private loaders: DataLoaders
  ) {
    super()
    this.transactionRepository = new TransactionRepository()
    this.productRepository = new ProductRepository()
  }

  async execute() {
    const product = await this.loaders.productLoader.loadProductsById.load(this.productId)

    if (!product) {
      throw new GraphQLError('Product not found', {
        extensions: { code: 'BAD_USER_INPUT' },
      })
    }

    if (!product.isAvailable) {
      throw new GraphQLError('Product is not available for purchase', {
        extensions: { code: 'BAD_USER_INPUT' },
      })
    }

    if (product.ownerId === this.buyerId) {
      throw new GraphQLError('Cannot buy your own product', {
        extensions: { code: 'BAD_USER_INPUT' },
      })
    }

    const transaction = await this.transactionRepository.createTransaction({
      buyerId: this.buyerId,
      sellerId: product.ownerId,
      productId: this.productId,
      price: product.price,
    })

    // Mark product as unavailable
    await this.productRepository.updateProductAvailability(this.productId, false)

    // Clear cached product
    await this.loaders.productLoader.loadProductsById.clear(this.productId)

    return transaction
  }
}
