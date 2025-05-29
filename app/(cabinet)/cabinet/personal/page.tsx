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
	const { cafesData, moskUser, editMoskUser } = useAdminStore()
	const [isEditing, setIsEditing] = useState(false)
	const [isOpen, setIsOpen] = useState(false)

	const userLanguage = (value: string) => {
		if (value === 'uk-UA') return 'Ukrainian'
		else if (value === 'en-US') return 'English'
	}

	const handleEditAccountProfile = (item: UserProfile) => {
		editMoskUser(item)
		setIsEditing(false)
	}

	const handleEditAvatar = (item: UserProfile) => {
		editMoskUser(item)
		setIsOpen(false)
	}

	const favoriteCafe = cafesData.find(cafe => cafe.id === moskUser.favoriteCafeId)

	return (
		<Shell className="container flex flex-col gap-8">
			<div className="w-full flex flex-col gap-6 justify-start items-start text-gray-200">
				<h1 className="text-3xl font-bold my-8">Personal data</h1>
				<div className="w-full flex justify-start items-end gap-8">
					<img
						src={moskUser.avatarUrl}
						alt={`${moskUser.firstName} ${moskUser.lastName}`}
						className="rounded-full border border-gray-700 w-40 h-40 object-cover object-center"
					/>
					<Button
						className="button relative overflow-hidden w-28 h-8 py-2 px-4 border-2 transition-all duration-150 bg-orange-600 border-orange-600 hover:border-gray-200 active:bg-orange-700 active:scale-95 "
						onClick={() => setIsOpen(true)}
					>
						<AnimatedButton className="w-28 py-1 hover:-top-9" text={'Edit avatar'} />
					</Button>
				</div>
				<div className="w-full flex flex-col justify-between items-stretch gap-6 p-8 bg-gray-900 border border-gray-800 rounded-sm">
					<div className="grid grid-cols-3 gap-2 border-b border-b-gray-800 pb-2">
						<span className="text-gray-500 font-thin">LastName</span>
						<span className="text-gray-500 font-thin">First Name</span>
						<span className="text-gray-500 font-thin">Second Name</span>
						<span className="font-semibold">{moskUser.lastName}</span>
						<span className="font-semibold">{moskUser.firstName}</span>
						<span className="font-semibold">{moskUser.secondName}</span>
					</div>
					<div className="grid grid-cols-3 gap-2 border-b border-b-gray-800 pb-2">
						<span className="text-gray-500 font-thin">Birthday</span>
						<span className="text-gray-500 font-thin">Gender</span>
						<span className="text-gray-500 font-thin">Language</span>
						<span className="font-semibold">{moskUser.birthday}</span>
						<span className="font-semibold">{moskUser.gender}</span>
						<span className="font-semibold">{userLanguage(moskUser.language)}</span>
					</div>
					<div className="grid grid-cols-3 gap-2 border-b border-b-gray-800 pb-2">
						<span className="text-gray-500 font-thin">Phone</span>
						<span className="text-gray-500 font-thin">Email</span>
						<span className="text-gray-500 font-thin">Address</span>
						<span className="font-semibold">{moskUser.phone}</span>
						<span className="font-semibold">{moskUser.email}</span>
						<span className="font-semibold">{moskUser.address}</span>
					</div>
					<div className="grid grid-cols-3 gap-2 border-b border-b-gray-800 pb-2">
						<span className="text-gray-500 font-thin">Favorite Cafe</span>
						<span className="text-gray-500 font-thin">Notes</span>
						<span className="text-gray-500 font-thin"></span>
						<span className="font-semibold">{favoriteCafe?.name}</span>
						<span className="font-semibold">{moskUser.notes}</span>
						<span className="font-semibold"></span>
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
					<AvatarEditor item={moskUser} onSave={handleEditAvatar} setIsOpen={setIsOpen} />
				</Modal>
			)}
			{isEditing && (
				<Modal isOpen={isEditing} onClose={() => setIsEditing(false)} className="justify-center items-center">
					<EditAccountProfileForm item={moskUser} onSave={handleEditAccountProfile} setIsEditing={setIsEditing} />
				</Modal>
			)}
		</Shell>
	)
}

export default AccountPersonalPage
