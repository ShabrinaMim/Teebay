import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import BuyProductDialog from '../components/product/BuyProductDialog'
import RentProductDialog from '../components/product/RentProductDialog'
import Loading from '../components/shared/Loading'
import LoadingError from '../components/shared/LoadingError'
import PrimaryActionButton from '../components/shared/PrimaryActionButton'
import { GET_PRODUCT } from '../graphql/Product'
import { ProductData, ProductVars } from '../types/graphql'
import { formatDateWithOrdinal } from '../utils/DateTime'

const ProductDetails: React.FC = () => {
  const [isRentDialogOpen, setIsRentDialogOpen] = useState(false)
  const [isBuyDialogOpen, setIsBuyDialogOpen] = useState(false)
  const { id: productId } = useParams()
  const { loading, error, data } = useQuery<ProductData, ProductVars>(GET_PRODUCT, {
    variables: { id: productId as string },
  })

  if (loading) return <Loading />
  if (error || !data?.product) return <LoadingError errorMessage="Product not found" />

  const { product } = data

  return (
    <>
      {isBuyDialogOpen && (
        <BuyProductDialog isOpen={isBuyDialogOpen} setIsOpen={setIsBuyDialogOpen} product={product} />
      )}
      {isRentDialogOpen && (
        <RentProductDialog isOpen={isRentDialogOpen} setIsOpen={setIsRentDialogOpen} product={product} />
      )}
      <div className="w-full flex justify-center mt-10 px-4">
        <div className="w-full max-w-md bg-blue-50 border border-blue-300 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-center text-blue-900 mb-4">{product.title}</h2>
          <div className="text-sm text-blue-800 space-y-2">
            <p><strong>Categories:</strong> {product.categories.map(c => c.name).join(', ')}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>Date Posted:</strong> {formatDateWithOrdinal(new Date(Number(product.createdAt)))}</p>
          </div>
          <div className="flex justify-center gap-x-4 mt-6">
            <PrimaryActionButton label="Buy" onClick={() => setIsBuyDialogOpen(true)} />
            <PrimaryActionButton label="Rent" onClick={() => setIsRentDialogOpen(true)} />
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetails
