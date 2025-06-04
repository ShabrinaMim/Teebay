import { useQuery } from '@apollo/client'
import React from 'react'
import ProductCard from '../components/product/ProductCard'
import Loading from '../components/shared/Loading'
import LoadingError from '../components/shared/LoadingError'
import { GET_PRODUCTS } from '../graphql/Product'
import { ProductsData } from '../types/graphql'

const AllProducts: React.FC = () => {
  const { loading, error, data } = useQuery<ProductsData>(GET_PRODUCTS)

  if (loading) {
    return <Loading />
  } else if (error) {
    return <LoadingError errorMessage="Error fetching products" />
  }

  return (
    <div className="w-full flex flex-col items-center pt-4 px-4">
      <h1 className="text-3xl font-semibold text-center mb-6 text-blue-700">ALL PRODUCTS</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
        {data?.products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default AllProducts
