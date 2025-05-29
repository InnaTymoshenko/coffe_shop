import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LocationData } from '@/types/location-type'
import { Button } from '@/components/ui/button'
import { CafeFormValues, cafeSchema } from '@/utils/validation/cafes-schema'
import Shell from '@/components/ui/shell'

type EditCafeProps = {
	item: LocationData
	onSave: (updated: LocationData) => void
	setIsEditing: (value: boolean) => void
}

const EditCafeForm = ({ item, onSave, setIsEditing }: EditCafeProps) => {
	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm<CafeFormValues>({
		resolver: zodResolver(cafeSchema),
		defaultValues: item
	})

	const onSubmit = (data: CafeFormValues) => {
		const finalData = {
			...data,
			updatedAt: new Date().toLocaleDateString('uk-UA')
		}
		onSave({
			...item,
			...finalData
		})
		console.log('Saving cafe:', finalData)
	}

	return (
		<Shell>
			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-semibold">Edit Cafe Profile</h2>
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 max-w-xl mx-auto">
				<div>
					<label className="block text-sm font-medium">Name</label>
					<input {...register('name')} className="w-full border border-gray-400 p-2 rounded" />
					{errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
				</div>
				<div>
					<label className="block text-sm font-medium">Address</label>
					<input {...register('address')} className="w-full border border-gray-400 p-2 rounded" />
					{errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
				</div>
				<div>
					<label className="block text-sm font-medium">Phone</label>
					<input {...register('phone')} className="w-full border border-gray-400 p-2 rounded" />
					{errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
				</div>
				<div>
					<label className="block text-sm font-medium">Manager Name</label>
					<input {...register('managerName')} className="w-full border border-gray-400 p-2 rounded" />
					{errors.managerName && <p className="text-red-500 text-sm">{errors.managerName.message}</p>}
				</div>
				<div>
					<label className="block text-sm font-medium">Manager Email</label>
					<input {...register('managerEmail')} className="w-full border border-gray-400 p-2 rounded" />
					{errors.managerEmail && <p className="text-red-500 text-sm">{errors.managerEmail.message}</p>}
				</div>
				<div>
					<label className="block text-sm font-medium">Opening Hours</label>
					<input {...register('openingHours')} className="w-full border border-gray-400 p-2 rounded" />
				</div>
				<div className="flex items-center gap-2">
					<input type="checkbox" {...register('isActive')} />
					<label className="font-medium">Opening</label>
				</div>
				<div>
					<label className="font-medium">Notes</label>
					<textarea {...register('notes')} className="w-full border border-gray-400 p-2 rounded" />
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

export default EditCafeForm
