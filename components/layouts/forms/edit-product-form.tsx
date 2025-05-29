import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ProductData } from '@/types/item-type'
import { useAdminStore } from '@/store/admin-store'
import { Button } from '../../ui/button'
import Shell from '../../ui/shell'
import { EditProductFormData, editProductSchema } from '@/utils/validation/product-schema'
import Select from '@/components/ui/select'

type EditForm = {
	product: ProductData
	onSave: (updated: ProductData) => void
	setIsEditing: (value: boolean) => void
}

const typeOptions = [
	{ value: 'event-based', label: 'Event-based' },
	{ value: 'combo', label: 'Combo' },
	{ value: 'time-limited', label: 'Time-limited' },
	{ value: 'discount', label: 'Discount' },
	{ value: 'seasonal', label: 'Seasonal' },
	{ value: '2+1', label: '2+1' }
]

export function EditProductForm({ product, onSave, setIsEditing }: EditForm) {
	const { isAdmin } = useAdminStore()

	const {
		register,
		handleSubmit,
		control,
		formState: { errors }
	} = useForm<EditProductFormData>({
		resolver: zodResolver(editProductSchema),
		defaultValues: {
			title: product.title,
			alt: product.alt,
			rating: product.rating,
			ingridients: product.ingridients,
			price: product.price,
			promotion: product.promotion || undefined
		}
	})

	const onSubmit = (data: EditProductFormData) => {
		const enrichedPrice = data.price.map((p, i) => ({
			...p,
			isChecked: isAdmin ? product.price[i]?.isChecked ?? false : p.isChecked
		}))

		const updatedPromotion = !data.promotion?.type ? undefined : data.promotion

		console.log({
			...product,
			...data,
			price: enrichedPrice,
			promotion: updatedPromotion
		})

		onSave({
			...product,
			...data,
			price: enrichedPrice,
			promotion: data.promotion?.type
				? {
						type: data.promotion.type,
						label: data.promotion.label?.trim() || ''
				  }
				: undefined
		})
	}

	return (
		<Shell className="container flex flex-col gap-6 rounded-lg ">
			<div className="w-full flex justify-between items-center">
				<h2 className="text-2xl font-semibold">Edit product</h2>
				<span className="font-medium">Category: {product.category}</span>
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 w-full">
				<div>
					<label className="block text-sm font-medium">Title</label>
					<input {...register('title')} className="w-full border border-gray-400 rounded p-2" />
					{errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
				</div>

				<div>
					<label className="block text-sm font-medium">Description</label>
					<input {...register('alt')} className="w-full border border-gray-400 rounded p-2" />
					{errors.alt && <p className="text-red-500 text-sm">{errors.alt.message}</p>}
				</div>

				<div>
					<label className="block text-sm font-medium">Rating</label>
					<input
						type="number"
						step="0.1"
						{...register('rating', { valueAsNumber: true })}
						className="w-full border border-gray-400 rounded p-2"
					/>
					{errors.rating && <p className="text-red-500 text-sm">{errors.rating.message}</p>}
				</div>

				<div>
					<label className="block text-sm font-medium">Ingredients</label>
					{product.ingridients.map((_, i) => (
						<input
							key={i}
							{...register(`ingridients.${i}`)}
							className="w-full border border-gray-400 rounded p-2 my-1"
						/>
					))}
				</div>
				<div className="grid grid-cols-2 gap-2">
					<div>
						<label className="block text-sm font-medium">Promotion type:</label>
						<Controller
							name="promotion.type"
							control={control}
							render={({ field, fieldState }) => (
								<Select
									options={[{ value: '', label: 'No promotion' }, ...typeOptions]}
									value={field.value ?? ''}
									onChange={field.onChange}
									error={fieldState.error?.message}
									className="w-full p-2 rounded-sm"
								/>
							)}
						/>
					</div>
					<div>
						<label className="block text-sm font-medium">Promotion label:</label>
						<input type="text" {...register('promotion.label')} className="w-full border border-gray-400 p-2 rounded" />
					</div>
				</div>
				<div>
					<label className="block text-sm font-medium">Prices</label>
					{product.price.map((_, i) => (
						<div key={i} className="grid grid-cols-2 gap-2 my-2">
							<input type="text" {...register(`price.${i}.size`)} className="border border-gray-400 rounded p-2" />
							<input
								type="number"
								step={0.01}
								{...register(`price.${i}.price`, { valueAsNumber: true })}
								className="border border-gray-400 rounded p-2"
							/>
							{!isAdmin && (
								<>
									<input
										type="number"
										{...register(`price.${i}.quantity`, { valueAsNumber: true })}
										placeholder="Qty"
										className="border border-gray-400 p-2 rounded"
									/>
									<input type="checkbox" {...register(`price.${i}.isChecked`)} className="mt-2" />
								</>
							)}
						</div>
					))}
				</div>
				<div className="w-full flex justify-start items-center gap-6">
					<Button
						text="Save"
						type="submit"
						className="w-32 bg-green-500 text-white px-4 py-2 rounded-sm hover:bg-green-600"
					/>
					<Button
						text="Close"
						className="w-32 bg-red-500 text-white px-4 py-2 rounded-sm hover:bg-red-600"
						onClick={() => setIsEditing(false)}
					/>
				</div>
			</form>
		</Shell>
	)
}
