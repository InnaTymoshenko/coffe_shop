'use client'

import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserProfileFormData, userProfileSchema } from '@/utils/validation/user-schema'
import { UserProfile } from '@/types/users-type'
import { Button } from '@/components/ui/button'
import Shell from '@/components/ui/shell'
import Select from '@/components/ui/select'

interface EditUserProps {
	item: UserProfile
	onSave: (updated: UserProfile) => void
	setIsEditing: (value: boolean) => void
}

const genderOptions = [
	{ value: 'male', label: 'Man' },
	{ value: 'female', label: 'Woman' }
]

const languageOptions = [
	{ value: 'uk-UA', label: 'Ukrainian' },
	{ value: 'en-US', label: 'English' }
]

export const EditAccountProfileForm = ({ item, onSave, setIsEditing }: EditUserProps) => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors }
	} = useForm<UserProfileFormData>({
		defaultValues: item,
		resolver: zodResolver(userProfileSchema)
	})

	const onSubmit = (data: UserProfileFormData) => {
		const finalData = {
			...data,
			updatedAt: new Date().toLocaleDateString('uk-UA')
		}
		onSave({
			...item,
			...finalData
		})
		console.log(data)
	}

	return (
		<Shell className="container rounded-sm text-gray-900">
			<div className="w-full flex justify-between items-center">
				<h2 className="text-2xl font-semibold">Edit Profile</h2>
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 max-w-xl mx-auto">
				<div className="w-full grid grid-cols-2 gap-2 items-center">
					<div>
						<label className="block text-sm text-gray-500 font-medium">Last Name:</label>
						<input {...register('lastName')} className="w-full border border-gray-400 p-2 rounded bg-gray-300" />
						{errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
					</div>
					<div>
						<label className="block text-sm text-gray-500 font-medium">First Name:</label>
						<input {...register('firstName')} className="w-full border border-gray-400 p-2 rounded bg-gray-300" />
						{errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
					</div>
					<div>
						<label className="block text-sm text-gray-500 font-medium">Second Name:</label>
						<input {...register('secondName')} className="w-full border border-gray-400 p-2 rounded bg-gray-300" />
						{errors.secondName && <p className="text-red-500 text-sm">{errors.secondName.message}</p>}
					</div>
					<div>
						<label className="block text-sm text-gray-500 font-medium">Birthday (dd.mm.yy):</label>
						<input {...register('birthday')} className="w-full border border-gray-400 p-2 rounded bg-gray-300" />
						{errors.birthday && <p className="text-red-500 text-sm">{errors.birthday.message}</p>}
					</div>
				</div>
				<div className="w-full grid grid-cols-2 gap-2 items-center">
					<div>
						<label className="block text-sm text-gray-500 font-medium">Email:</label>
						<input
							type="email"
							{...register('email')}
							className="w-full border border-gray-400 p-2 rounded bg-gray-300"
						/>
						{errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
					</div>
					<div>
						<label className="block text-sm text-gray-500 font-medium">Phone:</label>
						<input {...register('phone')} className="w-full border border-gray-400 p-2 rounded bg-gray-300" />
						{errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
					</div>
				</div>
				<div>
					<label className="block text-sm text-gray-500 font-medium">Address:</label>
					<input {...register('address')} className="w-full border border-gray-400 p-2 rounded bg-gray-300" />
					{errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
				</div>
				<div className="w-full grid grid-cols-2 gap-2 items-center">
					<div>
						<label className="text-sm text-gray-500 font-medium">Gender:</label>
						<Controller
							name="gender"
							control={control}
							render={({ field, fieldState }) => (
								<Select
									options={genderOptions}
									value={field.value}
									onChange={field.onChange}
									error={fieldState.error?.message}
									className="w-full p-2 rounded-sm bg-gray-300"
								/>
							)}
						/>
					</div>
					<div>
						<label className="block text-sm text-gray-500 font-medium">Language:</label>
						<Controller
							name="language"
							control={control}
							render={({ field, fieldState }) => (
								<Select
									options={languageOptions}
									value={field.value}
									onChange={field.onChange}
									error={fieldState.error?.message}
									className="w-full border-gray-300 p-2 rounded-sm bg-gray-300"
								/>
							)}
						/>
					</div>
				</div>
				<div>
					<label className="font-medium text-sm text-gray-500">Notes</label>
					<textarea {...register('notes')} className="w-full border border-gray-400 p-2 rounded bg-gray-300" />
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
