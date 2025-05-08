'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import Shell from '@/components/ui/shell'
import ProductTable from '@/components/layouts/tables/product-table'
import { useAdminStore } from '@/store/admin-store'
import { AddProductForm } from '@/components/add-product-form'
import { ProductData } from '@/types/item-type'
import { Modal } from '@/components/ui/modal'

const ProductPage = () => {
	const [selectTab, setSelectTab] = useState('coffee')
	const [isAddProduct, setIsAddProduct] = useState(false)
	const { coffeeData, cupcakeData, addProduct } = useAdminStore()

	const handleAddProduct = (item: ProductData) => {
		addProduct(item)
		setIsAddProduct(false)
		console.log(item)
	}

	return (
		<>
			<Shell className="container flex flex-col gap-4">
				<div className="w-full py-4 flex justify-between items-center">
					<h1 className="text-2xl font-bold">Products</h1>
					<Button
						text="Add new product"
						className="flex items-center justify-between gap-1 border border-gray-900 rounded-lg px-4 py-2 text-gray-900 hover:bg-gray-100"
						onClick={() => setIsAddProduct(true)}
					/>
				</div>
				<div className="flex justify-start gap-4">
					<Button
						className={`py-2 text-lg flex items-center gap-1 font-semibold transition-all text-decoration-2
            ${selectTab === 'coffee' ? 'underline ' : 'no-underline text-gray-600'}`}
						style={{ textUnderlineOffset: '6px' }}
						onClick={() => setSelectTab('coffee')}
					>
						Coffee
					</Button>
					<Button
						className={`px-4 py-2 text-lg flex items-center gap-1 font-semibold transition-all text-decoration-2
            ${selectTab === 'cupcake' ? 'underline ' : 'no-underline text-gray-600'}`}
						style={{ textUnderlineOffset: '6px' }}
						onClick={() => setSelectTab('cupcake')}
					>
						Cupcake
					</Button>
				</div>
				<div>
					{selectTab === 'coffee' && coffeeData.length > 0 && <ProductTable data={coffeeData} />}
					{selectTab === 'cupcake' && cupcakeData.length > 0 && <ProductTable data={cupcakeData} />}
				</div>
			</Shell>
			{isAddProduct && (
				<Modal isOpen={isAddProduct} onClose={() => setIsAddProduct(false)}>
					<AddProductForm onAdd={handleAddProduct} setIsAddProduct={setIsAddProduct} />
				</Modal>
			)}
		</>
	)
}

export default ProductPage
