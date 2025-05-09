'use client'

import React, { useState, useEffect } from 'react'
import { ProductData } from '@/types/item-type'
import { Button } from '../../ui/button'
import { useAdminStore } from '@/store/admin-store'
import { EditProductForm } from '@/components/layouts/forms/edit-product-form'
import { Modal } from '@/components/ui/modal'

type TableProps = {
	data: ProductData[]
}

const ProductTable = ({ data }: TableProps) => {
	const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null)
	const [isEditing, setIsEditing] = useState(false)
	const { deleteProduct, editCardProduct } = useAdminStore()

	useEffect(() => {
		const handelKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setSelectedProduct(null)
				setIsEditing(false)
			}
		}
		document.addEventListener('keydown', handelKeyDown)
		return () => {
			document.removeEventListener('keydown', handelKeyDown)
		}
	}, [])

	useEffect(() => {
		if (selectedProduct) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'auto'
		}
	}, [selectedProduct])

	const handleDeleteProduct = (id: string) => {
		deleteProduct(id)
		setSelectedProduct(null)
	}

	const handleSave = (updated: ProductData) => {
		editCardProduct(updated)
		setIsEditing(false)
		setSelectedProduct(null)
	}

	return (
		<>
			<div className="overflow-x-auto mt-4">
				<table className="min-w-full border-collapse">
					<thead className="hover:bg-gray-50">
						<tr className="border-b border-gray-300">
							<th className="p-2">Product</th>
							<th className="p-2">ID</th>
							<th className="p-2">Category</th>
							<th className="p-2">Promotion</th>
						</tr>
					</thead>
					<tbody>
						{data.map(d => (
							<tr key={d.id} className="text-center border-b border-gray-300 hover:bg-gray-50">
								<td className="p-4 flex justify-start items-center gap-4">
									<div className="bg-gray-100 border border-gray-300 w-16 h-16 rounded" />
									<div className="flex flex-col justify-between items-start gap-4">
										<span className="text-xl font-semibold">{d.title}</span>
										<Button
											text="See more"
											onClick={() => setSelectedProduct(d)}
											className="border border-gray-50 rounded-sm px-2 py-1 hover:border-gray-300 hover:bg-gray-200 "
										/>
									</div>
								</td>
								<td className="p-4">{d.id}</td>
								<td className="p-4">{d.category}</td>
								<td className="p-4">-</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{selectedProduct && (
				<div className="fixed top-0 right-0 w-[600px] h-full bg-white border-l border-l-gray-300 shadow-2xl z-10 overflow-y-auto">
					<div className="flex justify-between items-center h-20 p-4 mb-4 bg-gray-200 border-b border-b-gray-400">
						<h3 className="text-lg font-semibold">Product Details</h3>
						<Button
							text="✕"
							onClick={() => setSelectedProduct(null)}
							className="py-1 px-2 border border-gray-400 rounded-full text-gray-600 text-xl hover:bg-gray-300 "
						/>
					</div>
					<div className="flex flex-col gap-6 p-4">
						<div className="flex items-center gap-6">
							<div className="bg-gray-100 border border-gray-300 w-16 h-16 rounded"></div>
							<div className="flex flex-col gap-1">
								<span className="font-medium">{selectedProduct.title}</span>
								<span className="text-secondary">Rating: {selectedProduct.rating}</span>
							</div>
						</div>

						<ul className="grid grid-cols-2 gap-y-2">
							<li className="font-medium">ID:</li>
							<li>{selectedProduct.id}</li>
							<li className="font-medium">Description:</li>
							<li>{selectedProduct.alt}</li>
							<li className="font-medium">Ingridients:</li>
							<ul>
								{selectedProduct.ingridients.map(ing => (
									<li key={ing}>{ing}</li>
								))}
							</ul>
						</ul>
						<ul>
							{selectedProduct.price.map(p => (
								<li key={`${selectedProduct.id}-${p.size}`} className="grid grid-cols-4 gap-y-2">
									<span className="font-medium">Size:</span>
									{p.size}
									<span className="font-medium">Price:</span>
									{`${p.price}$`}
								</li>
							))}
						</ul>
						<div className="flex flex-col gap-4">
							<Button
								text="Edit Product"
								className="w-full rounded-lg p-3 bg-gray-100 border border-gray-400 hover:bg-gray-300"
								onClick={() => setIsEditing(true)}
							/>
							<Button
								text="Delete Product"
								className="w-full border border-red-400 bg-red-500 hover:bg-red-600 text-gray-200 font-semibold rounded-lg p-3"
								onClick={() => handleDeleteProduct(selectedProduct.id)}
							/>
						</div>
					</div>
				</div>
			)}
			{isEditing && selectedProduct && (
				<Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
					<EditProductForm product={selectedProduct} onSave={handleSave} setIsEditing={setIsEditing} />
				</Modal>
			)}
		</>
	)
}

export default ProductTable
