'use client'

import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PromotionFormData, promotionSchema } from '@/utils/validation/promotions-schema'
import Shell from '../../ui/shell'
import { Button } from '../../ui/button'
import { PromotionData } from '@/types/promotion-type'
import { formatDate } from '@/utils/fn'
import Select from '@/components/ui/select'

interface EditPromotionFormProps {
	promotion: PromotionData
	onSave: (updated: PromotionData) => void
	setIsEditing: (value: boolean) => void
}

const statusPromotionOptions = [
	{ value: 'active', label: 'Active' },
	{ value: 'finished', label: 'Finished' },
	{ value: 'moderation', label: 'Moderation' }
]

export function EditPromotionForm({ promotion, onSave, setIsEditing }: EditPromotionFormProps) {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors }
	} = useForm<PromotionFormData>({
		resolver: zodResolver(promotionSchema),
		defaultValues: promotion
	})

	const onSubmit = (data: PromotionFormData) => {
		const uptatedStatus = data.isActive ? 'active' : data.status === 'active' ? 'finished' : data.status
		onSave({
			...promotion,
			...data,
			status: uptatedStatus,
			end: promotion.end || formatDate(data.end),
			start: promotion.start || formatDate(data.start)
		})
	}

	return (
		<Shell>
			<div className="w-full flex justify-between items-center">
				<h2 className="text-2xl font-semibold">Edit promotions</h2>
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 max-w-xl mx-auto">
				<div>
					<label className="block text-sm font-medium">Title</label>
					<input {...register('title')} placeholder="Title" className="w-full border border-gray-400 p-2 rounded" />
					{errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
				</div>
				<div>
					<label className="block text-sm font-medium">Description</label>
					<textarea
						{...register('description')}
						placeholder="Description"
						className="w-full border border-gray-400 p-2 rounded"
					/>
					{errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
				</div>
				<div>
					<label className="block text-sm font-medium">Start</label>
					<input type="date" {...register('start')} className="w-full border border-gray-400 p-2 rounded" />
					{errors.start && <p className="text-red-500 text-sm">{errors.start.message}</p>}
				</div>
				<div>
					<label className="block text-sm font-medium">End</label>
					<input type="date" {...register('end')} className="w-full border border-gray-400 p-2 rounded" />
					{errors.end && <p className="text-red-500 text-sm">{errors.end.message}</p>}
				</div>
				<div>
					<label className="block text-sm font-medium">Status</label>
					<Controller
						name="status"
						control={control}
						render={({ field, fieldState }) => (
							<Select
								options={statusPromotionOptions}
								value={field.value}
								onChange={field.onChange}
								error={fieldState.error?.message}
								className="w-full p-2 rounded-sm"
							/>
						)}
					/>
				</div>
				<div>
					<label className="block text-sm font-medium">Type</label>
					<input {...register('type')} placeholder="Type" className="w-full border border-gray-400 p-2 rounded" />
					{errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
				</div>
				<div>
					<label className="mr-2">Is active?</label>
					<input type="checkbox" {...register('isActive')} />
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
