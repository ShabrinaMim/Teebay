import React, { HTMLAttributes, useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import { Product } from '../../types/graphql'
import { formatDateWithOrdinal } from '../../utils/DateTime'
import IconButton from '../shared/IconButton'
import DeleteProductDialog from './DeleteProductDialog'

type ProductCardProps = {
  product: Product
  isUserOwner?: boolean
} & HTMLAttributes<HTMLDivElement>

const ProductCard: React.FC<ProductCardProps> = ({ product, isUserOwner, className }) => {
  const navigate = useNavigate()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  return (
    <>
      {isDeleteDialogOpen && (
        <DeleteProductDialog isOpen={isDeleteDialogOpen} setIsOpen={setIsDeleteDialogOpen} product={product} />
      )}
      <div
        className={twMerge(
          'w-80 rounded-2xl p-5 bg-slate-200 border border-gray-500 hover:shadow-lg transition-all cursor-pointer flex flex-col gap-y-3',
          className
        )}
        onClick={() => navigate(`/product/${product.id}`)}
      >
        {/* Title Centered */}
        <h2 className="text-lg font-semibold text-center text-slate-800">{product.title}</h2>

        <div className="text-sm text-slate-700 space-y-1">
          <p><span className="font-medium">Categories:</span> {product.categories.map(c => c.name).join(', ')}</p>
          <p><span className="font-medium">Price:</span> ${product.price}</p>
          <p><span className="font-medium">Description:</span> {product.description}</p>
          <p><span className="font-medium">Date Posted:</span> {formatDateWithOrdinal(new Date(Number(product.createdAt)))}</p>
        </div>

        {/* Action Buttons for Owner */}
        {isUserOwner && (
          <div className="flex justify-center gap-x-4 mt-2">
            <IconButton
              onClick={e => {
                e.preventDefault()
                e.stopPropagation()
                setIsDeleteDialogOpen(true)
              }}
              icon={<FaTrash className="text-red-500" />}
            />
            <IconButton
              onClick={e => {
                e.preventDefault()
                e.stopPropagation()
                navigate(`/product/${product.id}/edit`)
              }}
              icon={<FaEdit className="text-blue-600" />}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default ProductCard
