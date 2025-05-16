'use client'

import { useState } from 'react'
import { Category, ProductData } from '@/types/item-type'
import Shell from '@/components/ui/shell'
import { CupcakeForm } from './cupcake-form'
import { CoffeeForm } from './coffee-form'
import Select from '@/components/ui/select'

type AddNewProduct = {
	onAdd: (product: ProductData) => void
	setIsAddProduct: (value: boolean) => void
}

const categoryOptions = [
	{ value: '', label: 'Choose...' },
	{ value: 'Coffee', label: 'Coffee' },
	{ value: 'Cupcake', label: 'Cupcake' }
]

export function AddProductForm({ onAdd, setIsAddProduct }: AddNewProduct) {
	const [category, setCategory] = useState<Category>('')

	return (
		<Shell className="container w-full max-w-2xl flex flex-col gap-6 bg-gray-50 p-8 rounded-lg">
			<div className="w-full flex justify-between items-center">
				<h2 className="text-2xl font-semibold w-full">Add new product</h2>
				<Select
					label="Select category:"
					options={categoryOptions}
					value={category}
					onChange={setCategory}
					className="w-32 border rounded p-2"
				/>
			</div>
			{category === 'Coffee' && <CoffeeForm onAdd={onAdd} setIsAddProduct={setIsAddProduct} />}
			{category === 'Cupcake' && <CupcakeForm onAdd={onAdd} setIsAddProduct={setIsAddProduct} />}
		</Shell>
	)
}
