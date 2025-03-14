'use client'

import { useParams } from 'next/navigation'
import { useProductCart } from '@/store'

export default function ProductPage() {
	const params = useParams()
	const id = params?.id

	const { cupcakeData, coffeeData } = useProductCart()
	const product = [...coffeeData, ...cupcakeData].find(p => p.id === Number(id))

	if (!product) {
		return <p className="text-center text-red-500">Продукт не знайдено</p>
	}

	console.log(product)

	return (
		<>
			<div className="fixed top-0 left-0 w-full h-screen bg-stillife basic z-[-2]" />
		</>
	)
}
