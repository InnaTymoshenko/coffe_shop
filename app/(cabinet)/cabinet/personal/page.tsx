/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useState } from 'react'
import Shell from '@/components/ui/shell'
import { Button } from '@/components/ui/button'
import { useAdminStore } from '@/store/admin-store'
import { Modal } from '@/components/ui/modal'
import { EditAccountProfileForm } from '@/components/layouts/forms/edit-account-form'
import { UserProfile } from '@/types/users-type'
import AnimatedButton from '@/components/ui/animated-button'
import AvatarEditor from '@/components/avatar-editor'

const AccountPersonalPage = () => {
	const { cafesData, mockUser, editMockUser } = useAdminStore()
	const [isEditing, setIsEditing] = useState(false)
	const [isOpen, setIsOpen] = useState(false)

	const userLanguage = (value: string) => {
		if (value === 'uk-UA') return 'Ukrainian'
		else if (value === 'en-US') return 'English'
	}

	const handleEditAccountProfile = (item: UserProfile) => {
		editMockUser(item)
		setIsEditing(false)
	}

	const handleEditAvatar = (item: UserProfile) => {
		editMockUser(item)
		setIsOpen(false)
	}

	const favoriteCafe = cafesData.find(cafe => cafe.id === mockUser.favoriteCafeId)

	return (
		<Shell className="container flex flex-col gap-8">
			<div className="w-full flex flex-col gap-6 justify-start items-start text-gray-200">
				<h1 className="text-3xl font-bold my-8">Personal data</h1>
				<div className="w-full flex justify-start items-end gap-8">
					<img
						src={mockUser.avatarUrl}
						alt={`${mockUser.firstName} ${mockUser.lastName}`}
						className="rounded-full border border-gray-700 w-40 h-40 object-cover object-center"
					/>
					<Button
						className="button relative overflow-hidden w-28 h-8 py-2 px-4 border-2 transition-all duration-150 bg-orange-600 border-orange-600 hover:border-gray-200 active:bg-orange-700 active:scale-95 "
						onClick={() => setIsOpen(true)}
					>
						<AnimatedButton className="w-28 py-1 hover:-top-9" text={'Edit avatar'} />
					</Button>
				</div>
				<div className="w-full flex flex-col justify-between items-stretch gap-6 p-8 lg:mb-2 sm:mb-6 bg-gray-900 border border-gray-800 rounded-sm">
					<div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-2 border-b border-b-gray-800 pb-2">
						<div className="grid sm:grid-cols-3 lg:grid-cols-1 gap-2">
							<span className="text-gray-500 font-thin">LastName</span>
							<span className="font-semibold lg:col-span-1 sm:col-span-2">{mockUser.lastName}</span>
						</div>
						<div className="grid sm:grid-cols-3 lg:grid-cols-1 gap-2">
							<span className="text-gray-500 font-thin">First Name</span>
							<span className="font-semibold lg:col-span-1 sm:col-span-2">{mockUser.firstName}</span>
						</div>
						<div className="grid sm:grid-cols-3 lg:grid-cols-1 gap-2">
							<span className="text-gray-500 font-thin">Second Name</span>
							<span className="font-semibold lg:col-span-1 sm:col-span-2">{mockUser.secondName}</span>
						</div>
					</div>
					<div className="grid lg:grid-cols-3 sm:grid-cols-1 lg:grid-rows-1 sm:grid-rows-3 gap-2 border-b border-b-gray-800 pb-2">
						<div className="grid sm:grid-cols-3 lg:grid-cols-1 gap-2">
							<span className="text-gray-500 font-thin">Birthday</span>
							<span className="font-semibold lg:col-span-1 sm:col-span-2">{mockUser.birthday}</span>
						</div>
						<div className="grid sm:grid-cols-3 lg:grid-cols-1 gap-2">
							<span className="text-gray-500 font-thin">Gender</span>
							<span className="font-semibold lg:col-span-1 sm:col-span-2">{mockUser.gender}</span>
						</div>
						<div className="grid sm:grid-cols-3 lg:grid-cols-1 gap-2">
							<span className="text-gray-500 font-thin">Language</span>
							<span className="font-semibold lg:col-span-1 sm:col-span-2">{userLanguage(mockUser.language)}</span>
						</div>
					</div>
					<div className="grid lg:grid-cols-3 sm:grid-cols-1 lg:grid-rows-1 sm:grid-rows-3 gap-2 border-b border-b-gray-800 pb-2">
						<div className="grid sm:grid-cols-3 lg:grid-cols-1 gap-2">
							<span className="text-gray-500 font-thin">Phone</span>
							<span className="font-semibold lg:col-span-1 sm:col-span-2">{mockUser.phone}</span>
						</div>
						<div className="grid sm:grid-cols-3 lg:grid-cols-1 gap-2">
							<span className="text-gray-500 font-thin">Email</span>
							<span className="font-semibold lg:col-span-1 sm:col-span-2">{mockUser.email}</span>
						</div>
						<div className="grid sm:grid-cols-3 lg:grid-cols-1 gap-2">
							<span className="text-gray-500 font-thin">Address</span>
							<span className="font-semibold lg:col-span-1 sm:col-span-2">{mockUser.address}</span>
						</div>
					</div>
					<div className="grid lg:grid-cols-3 sm:grid-cols-1 lg:grid-rows-1 sm:grid-rows-3 gap-2 border-b border-b-gray-800 pb-2">
						<div className="grid sm:grid-cols-3 lg:grid-cols-1 gap-2">
							<span className="text-gray-500 font-thin">Favorite Cafe</span>
							<span className="font-semibold lg:col-span-1 sm:col-span-2">{favoriteCafe?.name}</span>
						</div>
						<div className="grid sm:grid-cols-3 lg:grid-cols-1 gap-2">
							<span className="text-gray-500 font-thin">Notes</span>
							<span className="font-semibold lg:col-span-1 sm:col-span-2">{mockUser.notes}</span>
						</div>
						<div className="grid sm:grid-cols-3 lg:grid-cols-1 gap-2">
							<span className="text-gray-500 font-thin"></span>
							<span className="font-semibold lg:col-span-1 sm:col-span-2"></span>
						</div>
					</div>
					<Button
						className="button relative overflow-hidden w-28 h-8 py-2 px-4 border-2 transition-all duration-150 bg-orange-600 border-orange-600 hover:border-gray-200 active:bg-orange-700 active:scale-95 "
						onClick={() => setIsEditing(true)}
					>
						<AnimatedButton className="w-28 py-1 hover:-top-9" text={'Edit data'} />
					</Button>
				</div>
			</div>
			{isOpen && (
				<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} className="justify-center items-center">
					<AvatarEditor item={mockUser} onSave={handleEditAvatar} setIsOpen={setIsOpen} />
				</Modal>
			)}
			{isEditing && (
				<Modal isOpen={isEditing} onClose={() => setIsEditing(false)} className="justify-center items-center">
					<EditAccountProfileForm item={mockUser} onSave={handleEditAccountProfile} setIsEditing={setIsEditing} />
				</Modal>
			)}
		</Shell>
	)
}

export default AccountPersonalPage
