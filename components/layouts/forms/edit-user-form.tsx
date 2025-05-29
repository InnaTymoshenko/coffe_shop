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

const statusOptions = [
	{ value: 'active', label: 'Active' },
	{ value: 'inactive', label: 'Inactive' },
	{ value: 'banned', label: 'Blocked' }
]

export const EditUserProfileForm = ({ item, onSave, setIsEditing }: EditUserProps) => {
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
		<Shell>
			<div className="w-full flex justify-between items-center">
				<h2 className="text-2xl font-semibold">Edit User Profile</h2>
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 max-w-xl mx-auto">
				<div className="w-full grid grid-cols-2 gap-x-2 items-center">
					<div className="pr-2">
						<label className="block text-sm font-medium">First Name:</label>
						<input {...register('firstName')} className="w-full border border-gray-400 p-2 rounded" />
						{errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
					</div>
					<div className="pl-2">
						<label className="block text-sm font-medium">Last Name:</label>
						<input {...register('lastName')} className="w-full border border-gray-400 p-2 rounded" />
						{errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
					</div>
				</div>
				<div className="w-full grid grid-cols-2 gap-x-2 items-center">
					<div className="pr-2">
						<label className="block text-sm font-medium">Email:</label>
						<input type="email" {...register('email')} className="w-full border border-gray-400 p-2 rounded" />
						{errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
					</div>
					<div className="pl-2">
						<label className="block text-sm font-medium">Phone:</label>
						<input {...register('phone')} className="w-full border border-gray-400 p-2 rounded" />
						{errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
					</div>
				</div>
				<div>
					<label className="block text-sm font-medium">Address:</label>
					<input {...register('address')} className="w-full border border-gray-400 p-2 rounded" />
					{errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
				</div>
				<div>
					<label className="block text-sm font-medium">Birthday (dd.mm.yy):</label>
					<input {...register('birthday')} className="w-full border border-gray-400 p-2 rounded" />
					{errors.birthday && <p className="text-red-500 text-sm">{errors.birthday.message}</p>}
				</div>
				<div className="w-full grid grid-cols-2 gap-x-2 items-center">
					<div className="pr-2">
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
					<div className="pl-2">
						<label className="block text-sm font-medium">Birthday (dd.mm.yy):</label>
						<input {...register('birthday')} className="w-full border border-gray-400 p-2 rounded" />
						{errors.birthday && <p className="text-red-500 text-sm">{errors.birthday.message}</p>}
					</div>
				</div>
				<div className="w-full grid grid-cols-2 gap-x-2 items-center">
					<div className="pr-2">
						<label className="text-sm font-medium">Gender:</label>
						<Controller
							name="gender"
							control={control}
							render={({ field, fieldState }) => (
								<Select
									options={genderOptions}
									value={field.value}
									onChange={field.onChange}
									error={fieldState.error?.message}
									className="w-full border p-2 rounded-sm"
								/>
							)}
						/>
					</div>
					<div className="pl-2">
						<label className="block text-sm font-medium">Language:</label>
						<Controller
							name="language"
							control={control}
							render={({ field, fieldState }) => (
								<Select
									options={languageOptions}
									value={field.value}
									onChange={field.onChange}
									error={fieldState.error?.message}
									className="w-full border p-2 rounded-sm"
								/>
							)}
						/>
					</div>
				</div>
				<div>
					<label className="block text-sm font-medium">Avatar:</label>
					<input {...register('avatarUrl')} className="w-full border border-gray-400 p-2 rounded" />
					{errors.avatarUrl && <p className="text-red-500 text-sm">{errors.avatarUrl.message}</p>}
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
