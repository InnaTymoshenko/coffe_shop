import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { v4 as uuidv4 } from 'uuid'
import { ProductData } from '@/types/item-type'
import { Button } from './ui/button'
import { useAdminStore } from '@/store/admin-store'
import { addProductSchema } from '@/method/validation/product-schema'

type AddProductFormData = z.infer<typeof addProductSchema>

type AddNewProduct = {
	onAdd: (product: ProductData) => void
	setIsAddProduct: (value: boolean) => void
}

export function CupcakeForm({ onAdd, setIsAddProduct }: AddNewProduct) {
	const { isAdmin } = useAdminStore()

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<AddProductFormData>({
		resolver: zodResolver(addProductSchema),
		defaultValues: {
			title: '',
			alt: '',
			rating: 4.5,
			ingridients: [''],
			category: 'Cupcake',
			price: [{ size: 'medium', price: 0, quantity: 1, isChecked: false }],
			src: {
				medium: '',
				portrait: '',
				landscape: '',
				tiny: ''
			}
		}
	})

	const onSubmit = (data: AddProductFormData) => {
		const enrichedPrice = data.price.map(p => ({
			...p,
			isChecked: isAdmin ? false : p.isChecked
		}))

		const newProduct: ProductData = {
			...data,
			ingridients: data.ingridients?.filter(i => i.trim() !== '') ?? [],
			src: {
				medium: data.src.medium || '',
				portrait: data.src.portrait || '',
				landscape: data.src.landscape || '',
				tiny: data.src.tiny || ''
			},
			price: enrichedPrice,
			id: uuidv4(),
			totalPrice: 0
		}

		onAdd(newProduct)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 max-w-xl mx-auto">
			<div className="w-full grid grid-cols-2 gap-y-2">
				<label className="block text-sm font-medium">Title:</label>
				<input {...register('title')} placeholder="Title" className="w-full border p-2 rounded" />
				{errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
			</div>
			<div className="w-full grid grid-cols-2 gap-y-2">
				<label className="block text-sm font-medium">Description:</label>
				<input {...register('alt')} placeholder="Description" className="w-full border p-2 rounded" />
				{errors.alt && <p className="text-red-500 text-sm">{errors.alt.message}</p>}
			</div>
			<div className="w-full grid grid-cols-2 gap-y-2">
				<label className="block text-sm font-medium">Rating:</label>
				<input
					type="number"
					step="0.1"
					{...register('rating', { valueAsNumber: true })}
					placeholder="Rating"
					className="w-full border p-2 rounded"
				/>
				{errors.rating && <p className="text-red-500 text-sm">{errors.rating.message}</p>}
			</div>
			<div className="w-full grid grid-cols-2 gap-y-2">
				<label className="block text-sm font-medium">Category:</label>
				<input {...register('category')} placeholder="Cupcake" className="w-full border p-2 rounded" />
			</div>
			<div className="w-full grid grid-cols-2 gap-y-2">
				<label className="block text-sm font-medium">Ingredients:</label>
				<div className=" flex flex-col gap-2">
					{[0, 1, 2].map(i => (
						<input
							key={i}
							{...register(`ingridients.${i}`)}
							placeholder={`Ingredient ${i + 1}`}
							className="w-full border p-2 rounded mb-1"
						/>
					))}
				</div>
			</div>
			<div className="w-full grid grid-cols-2 gap-y-2">
				<label className="block text-sm font-medium">Price Options:</label>
				<div className=" flex flex-col gap-2">
					{[0].map(i => (
						<div key={i} className="grid grid-cols-2 gap-2 mb-2">
							<input {...register(`price.${i}.size`)} placeholder="Size" className="border p-2 rounded" />
							<input
								type="number"
								{...register(`price.${i}.price`, { valueAsNumber: true })}
								placeholder="Price"
								className="border p-2 rounded"
							/>
							{!isAdmin && (
								<>
									<input
										type="number"
										step="0.1"
										{...register(`price.${i}.quantity`, { valueAsNumber: true })}
										placeholder="Qty"
										className="border p-2 rounded"
									/>
									<input type="checkbox" {...register(`price.${i}.isChecked`)} className="mt-2" />
								</>
							)}
						</div>
					))}
				</div>
			</div>
			<div className="w-full grid grid-cols-2 gap-y-2">
				<label className="block text-sm font-medium">Image URLs:</label>
				<div className=" flex flex-col gap-2">
					<input {...register('src.medium')} placeholder="Medium Image URL" className="w-full border p-2 rounded" />
					<input {...register('src.portrait')} placeholder="Portrait Image URL" className="w-full border p-2 rounded" />
					<input
						{...register('src.landscape')}
						placeholder="Landscape Image URL"
						className="w-full border p-2 rounded"
					/>
					<input {...register('src.tiny')} placeholder="Tiny Image URL" className="w-full border p-2 rounded" />
				</div>
			</div>
			<div className="w-full flex justify-start items-center gap-6">
				<Button
					text="Add Product"
					type="submit"
					className="w-32 bg-green-500 text-white px-4 py-2 rounded-sm hover:bg-green-600"
				/>
				<Button
					text="Close"
					className="w-32 bg-red-500 text-white px-4 py-2 rounded-sm hover:bg-red-600"
					onClick={() => setIsAddProduct(false)}
				/>
			</div>
		</form>
	)
}
