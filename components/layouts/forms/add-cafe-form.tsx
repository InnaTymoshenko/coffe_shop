import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { v4 as uuidv4 } from 'uuid'
import { LocationData } from '@/types/location-type'
import { Button } from '@/components/ui/button'
import { NewCafeFormValues, newCafeSchema } from '@/utils/validation/cafes-schema'
import Shell from '@/components/ui/shell'

type AddNewCafeProps = {
	onAdd: (data: LocationData) => void
	setIsAddNewCafe: (value: boolean) => void
}

const AddCafeForm = ({ onAdd, setIsAddNewCafe }: AddNewCafeProps) => {
	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm<NewCafeFormValues>({
		resolver: zodResolver(newCafeSchema),
		defaultValues: {
			isActive: true
		}
	})

	const onSubmit = (data: NewCafeFormValues) => {
		const newCafe = {
			...data,
			id: uuidv4(),
			createdAt: new Date().toLocaleDateString('uk-UA'),
			updatedAt: '',
			totalOrders: 0,
			totalClients: 0,
			averageRating: 0
		}
		onAdd(newCafe)
		console.log(newCafe)
	}

	return (
		<Shell className="container w-full max-w-2xl flex flex-col gap-6 bg-gray-50 p-8 rounded-lg">
			<div className="w-full flex justify-between items-center">
				<h2 className="text-2xl font-semibold">Add new Cafe</h2>
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 max-w-xl mx-auto">
				<div className="w-full grid grid-cols-2 gap-y-2">
					<label className="block text-sm font-medium">Name:</label>
					<input type="text" {...register('name')} placeholder="Description" className="w-full border p-2 rounded" />
					{errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
				</div>
				<div className="w-full grid grid-cols-2 gap-y-2">
					<label className="block text-sm font-medium">Address:</label>
					<input type="text" {...register('address')} className="w-full border p-2 rounded" />
					{errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
				</div>
				<div className="w-full grid grid-cols-2 gap-y-2">
					<label className="block text-sm font-medium">Location 1:</label>
					<input
						type="number"
						step="0.0001"
						{...register('lat')}
						placeholder="Latitude"
						className="w-full border p-2 rounded"
					/>
					{errors.lat && <p className="text-red-500 text-sm">{errors.lat.message}</p>}
				</div>
				<div className="w-full grid grid-cols-2 gap-y-2">
					<label className="block text-sm font-medium">Location 2:</label>
					<input
						type="number"
						step="0.0001"
						{...register('lng')}
						placeholder="Longitude"
						className="w-full border p-2 rounded"
					/>
					{errors.lng && <p className="text-red-500 text-sm">{errors.lng.message}</p>}
				</div>
				<div className="w-full grid grid-cols-2 gap-y-2">
					<label className="block text-sm font-medium">Photo:</label>
					<input {...register('img')} placeholder="Image URL" className="w-full border p-2 rounded" />
					{errors.img && <p className="text-red-500 text-sm">{errors.img.message}</p>}
				</div>
				<div className="w-full grid grid-cols-2 gap-y-2">
					<label className="block text-sm font-medium">Phone:</label>
					<input {...register('phone')} placeholder="Phone" className="w-full border p-2 rounded" />
					{errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
				</div>
				<div className="w-full grid grid-cols-2 gap-y-2">
					<label className="block text-sm font-medium">Manager Name:</label>
					<input {...register('managerName')} placeholder="Manager Name" className="w-full border p-2 rounded" />
					{errors.managerName && <p className="text-red-500 text-sm">{errors.managerName.message}</p>}
				</div>
				<div className="w-full grid grid-cols-2 gap-y-2">
					<label className="block text-sm font-medium">Manager Email:</label>
					<input {...register('managerEmail')} placeholder="Manager Email" className="w-full border p-2 rounded" />
					{errors.managerEmail && <p className="text-red-500 text-sm">{errors.managerEmail.message}</p>}
				</div>
				<div className="w-full grid grid-cols-2 gap-y-2">
					<label className="block text-sm font-medium">Opening Hours:</label>
					<input
						{...register('openingHours')}
						placeholder="Opening Hours (e.g. 08:00 - 21:00)"
						className="w-full border p-2 rounded"
					/>
				</div>
				<div className="w-full grid grid-cols-2 gap-y-2">
					<label className="block text-sm font-medium">Notes:</label>
					<textarea {...register('notes')} placeholder="Notes" className="w-full border p-2 rounded" />
				</div>
				<div className="w-full grid grid-cols-2 gap-y-2">
					<label className="flex items-center space-x-2">
						<input type="checkbox" {...register('isActive')} />
						<span>Is Active</span>
					</label>
				</div>
				<div className="w-full flex justify-start items-center gap-6">
					<Button
						text="Add New Cafe"
						type="submit"
						className="w-32 bg-green-500 text-white px-4 py-2 rounded-sm hover:bg-green-600"
					/>
					<Button
						text="Close"
						className="w-32 bg-red-500 text-white px-4 py-2 rounded-sm hover:bg-red-600"
						onClick={() => setIsAddNewCafe(false)}
					/>
				</div>
			</form>
		</Shell>
	)
}

export default AddCafeForm
