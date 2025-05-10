'use client'

import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { v4 as uuidv4 } from 'uuid'
import { promotionSchema } from '@/method/validation/promotions-schema'
import Shell from '@/components/ui/shell'
import { PromotionData } from '@/types/promotion-type'
import { Button } from '@/components/ui/button'
import Select from '@/components/ui/select'
import { formatDate } from '@/method/fn'

type PromotionFormData = z.infer<typeof promotionSchema>

interface AddPromotionFormProps {
	onAdd: (data: PromotionData) => void
	setIsAddPromotion: (value: boolean) => void
}

const statusOptions = [
	{ value: 'moderation', label: 'Moderation' },
	{ value: 'active', label: 'Active' },
	{ value: 'finished', label: 'Finished' }
]

const typeOptions = [
	{ value: 'event-based', label: 'event-based' },
	{ value: 'combo', label: 'combo' },
	{ value: 'time-limited', label: 'time-limited' },
	{ value: 'discount', label: 'discount' }
]

export function AddPromotionForm({ onAdd, setIsAddPromotion }: AddPromotionFormProps) {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors }
	} = useForm<PromotionFormData>({
		resolver: zodResolver(promotionSchema),
		defaultValues: {
			title: '',
			description: '',
			start: '',
			end: '',
			isActive: false,
			status: 'moderation',
			type: 'event-based'
		}
	})

	const onSubmit = (data: PromotionFormData) => {
		onAdd({ ...data, id: uuidv4(), end: formatDate(data.end), start: formatDate(data.start) })
	}

	return (
		<Shell className="container w-full max-w-2xl flex flex-col gap-6 bg-gray-50 p-8 rounded-lg">
			<div className="w-full flex justify-between items-center">
				<h2 className="text-2xl font-semibold">Add new promotion</h2>
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 max-w-xl mx-auto">
				<div className="w-full grid grid-cols-2 gap-y-2">
					<label className="block text-sm font-medium">Title:</label>
					<input {...register('title')} placeholder="Title" className="w-full border p-2 rounded" />
					{errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
				</div>
				<div className="w-full grid grid-cols-2 gap-y-2">
					<label className="block text-sm font-medium">Description:</label>
					<textarea {...register('description')} placeholder="Description" className="w-full border p-2 rounded" />
					{errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
				</div>
				<div className="w-full grid grid-cols-2 gap-y-2">
					<label className="block text-sm font-medium">Start:</label>
					<input type="date" {...register('start')} className="w-full border p-2 rounded" />
					{errors.start && <p className="text-red-500 text-sm">{errors.start.message}</p>}
				</div>
				<div className="w-full grid grid-cols-2 gap-y-2">
					<label className="block text-sm font-medium">End:</label>
					<input type="date" {...register('end')} className="w-full border p-2 rounded" />
					{errors.end && <p className="text-red-500 text-sm">{errors.end.message}</p>}
				</div>
				<div className="w-full grid grid-cols-2 gap-y-2">
					<label className="block text-sm font-medium">Status:</label>
					<Controller
						name="status"
						control={control}
						render={({ field, fieldState }) => (
							<Select
								options={statusOptions}
								value={field.value}
								onChange={field.onChange}
								error={fieldState.error?.message}
								className="w-full border p-2 rounded-sm"
							/>
						)}
					/>
				</div>
				<div className="w-full grid grid-cols-2 gap-y-2">
					<label className="block text-sm font-medium">Type:</label>
					<Controller
						name="type"
						control={control}
						render={({ field, fieldState }) => (
							<Select
								options={typeOptions}
								value={field.value}
								onChange={field.onChange}
								error={fieldState.error?.message}
								className="w-full border p-2 rounded-sm"
							/>
						)}
					/>
				</div>
				<div className="w-full grid grid-cols-2 gap-y-2">
					<label className="flex items-center space-x-2">
						<input type="checkbox" {...register('isActive')} />
						<span>Is Active</span>
					</label>
				</div>
				<div className="w-full flex justify-start items-center gap-6">
					<Button
						text="Add Promotion"
						type="submit"
						className="w-32 bg-green-500 text-white px-4 py-2 rounded-sm hover:bg-green-600"
					/>
					<Button
						text="Close"
						className="w-32 bg-red-500 text-white px-4 py-2 rounded-sm hover:bg-red-600"
						onClick={() => setIsAddPromotion(false)}
					/>
				</div>
			</form>
		</Shell>
	)
}
