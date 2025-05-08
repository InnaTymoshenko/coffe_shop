'use client'

import { useState } from 'react'
import { ProductData } from '@/types/item-type'
import Shell from './ui/Shell'
import { CoffeeForm } from './CoffeeForm'
import { CupcakeForm } from './CupcakeForm'

type AddNewProduct = {
	onAdd: (product: ProductData) => void
	setIsAddProduct: (value: boolean) => void
}

export function AddProductForm({ onAdd, setIsAddProduct }: AddNewProduct) {
	const [category, setCategory] = useState<'Coffee' | 'Cupcake' | ''>('')

	return (
		<Shell className="container w-full max-w-2xl flex flex-col gap-6 bg-gray-50 p-8 rounded-lg">
			<div className="w-full flex justify-between items-center">
				<h2 className="text-2xl font-semibold">Add new product</h2>
				<div className="w-1/3 flex justify-end items-end gap-4">
					<label className="text-sm font-medium mb-1 block">Select category:</label>
					<select
						value={category}
						onChange={e => setCategory(e.target.value as 'Coffee' | 'Cupcake')}
						className="w-full border rounded p-2"
					>
						<option value="">Choose...</option>
						<option value="Coffee">Coffee</option>
						<option value="Cupcake">Cupcake</option>
					</select>
				</div>
			</div>
			{category === 'Coffee' && <CoffeeForm onAdd={onAdd} setIsAddProduct={setIsAddProduct} />}
			{category === 'Cupcake' && <CupcakeForm onAdd={onAdd} setIsAddProduct={setIsAddProduct} />}
		</Shell>
	)
}
