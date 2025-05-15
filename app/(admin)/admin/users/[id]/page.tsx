/* eslint-disable @next/next/no-img-element */
'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { FaArrowLeftLong } from 'react-icons/fa6'
import Shell from '@/components/ui/shell'
import { normalizedPhone } from '@/method/fn'
import { Button } from '@/components/ui/button'
import { ButtonLink } from '@/components/ui/button-link'
import { Modal } from '@/components/ui/modal'
import { useAdminStore } from '@/store/admin-store'
import { UserProfile } from '@/types/users-type'
import { Badge } from '@/components/ui/badge'
import { EditUserProfileForm } from '@/components/layouts/forms/edit-user-form'

export default function UserAdminPage() {
	const [selectedUser, setSelectedUser] = useState<UserProfile>()
	const [isEditing, setIsEditing] = useState(false)
	const params = useParams()
	const id = params?.id as string
	const { usersData, editUser } = useAdminStore()

	useEffect(() => {
		if (usersData) {
			const selectedUser = usersData.find(c => c.id === id)
			setSelectedUser(selectedUser)
		}
	}, [usersData, id])

	const blockedUser = (id: string) => {
		const user = usersData.find(user => user.id === id)
		if (!user) return
		const updatedUser: UserProfile = { ...user, status: 'banned' }
		editUser(updatedUser)
	}

	if (!id) return <p>Not found User!</p>

	const handleEditUserProfile = (item: UserProfile) => {
		editUser(item)
		setIsEditing(false)
	}

	return (
		<Shell className="container flex flex-col gap-8">
			<ButtonLink
				href={'/admin/users'}
				text="Back to users"
				className="flex gap-1 items-center font-medium hover:underline"
			>
				<FaArrowLeftLong />
			</ButtonLink>
			{selectedUser && (
				<div className="w-full flex gap-8 justify-start items-center">
					<img src={selectedUser?.avatarUrl} alt={selectedUser?.lastName} className="w-[100px] h-auto" />
					<h1 className="text-2xl font-bold my-8">{`${selectedUser?.firstName} ${selectedUser?.lastName}`}</h1>
				</div>
			)}

			<div className="w-full flex gap-12">
				<div className="flex flex-col gap-2">
					{selectedUser && (
						<ul className="grid grid-cols-2 gap-y-2">
							<li className="font-medium">ID:</li>
							<li>{selectedUser?.id}</li>
							<li className="font-medium">Created At:</li>
							<li>{selectedUser?.createdAt}</li>
							<li className="font-medium">Updated At:</li>
							<li>{selectedUser?.updatedAt}</li>
							<li className="font-medium">Birthday:</li>
							<li>{selectedUser?.birthday}</li>
							<li className="font-medium">Gender:</li>
							<li>{selectedUser?.gender}</li>
							<li className="font-medium">Address:</li>
							<li>{selectedUser?.address}</li>
							<li className="font-medium">Phone:</li>
							<li>
								<Link href={`tel:${normalizedPhone(selectedUser?.phone)}`} className="text-blue-500 hover:underline">
									{selectedUser.phone}
								</Link>
							</li>
							<li className="font-medium">Email:</li>
							<li>
								<Link href={`mailto:${selectedUser.email}`} className="text-blue-500 hover:underline">
									{selectedUser.email}
								</Link>
							</li>
							<li className="font-medium">Status:</li>
							<li>
								<Badge
									variant={
										selectedUser.status === 'active'
											? 'success'
											: selectedUser.status === 'banned'
											? 'danger'
											: 'outline'
									}
								>
									{selectedUser.status}
								</Badge>
							</li>
							<li className="font-medium">Language:</li>
							<li>{selectedUser?.language}</li>
							<li className="font-medium">Role:</li>
							<li>{selectedUser?.role}</li>
							<li className="font-medium">Last login at:</li>
							<li>{selectedUser?.lastLoginAt}</li>
							<li className="font-medium">Order count:</li>
							<li>{selectedUser?.orderCount}</li>
							<li className="font-medium">Total spent:</li>
							<li>{selectedUser?.totalSpent}</li>
							<li className="font-medium">Favorite cafe:</li>
							<li>
								<Link
									href={`/admin/cafes/${selectedUser.favoriteCafeId}`}
									target="_blank"
									className="text-blue-500 hover:underline"
								>
									{selectedUser.favoriteCafeId === 'khreschatyk'
										? 'Coffee Town - Хрещатик'
										: selectedUser.favoriteCafeId === 'podil'
										? 'Coffee Town - Поділ'
										: selectedUser.favoriteCafeId === 'obolon'
										? 'Coffee Town - Оболонь'
										: null}
								</Link>
							</li>
							<li className="font-medium">Subscribed:</li>
							<li>{selectedUser?.newsletterSubscribed ? 'Yes' : 'No'}</li>
							<li className="font-medium">Notes:</li>
							<li>{selectedUser?.notes}</li>
						</ul>
					)}
				</div>
			</div>
			<div className="flex justify-start items-center gap-4">
				<Button
					text="Edit profile"
					className="w-full rounded-lg p-3 bg-gray-100 border border-gray-400 hover:bg-gray-300"
					onClick={() => setIsEditing(true)}
				/>
				<ButtonLink
					href={`/admin/users/${id}/orders-history`}
					text="View Order History"
					className="w-full rounded-lg p-3 bg-green-600 text-gray-200 font-semibold border border-green-500 hover:bg-green-700"
				/>

				<Button
					text="Blocked user"
					className="w-full border border-red-400 bg-red-500 hover:bg-red-600 text-gray-200 font-semibold rounded-lg p-3"
					onClick={() => blockedUser(id)}
				/>
			</div>
			{isEditing && selectedUser && (
				<Modal isOpen={isEditing} onClose={() => setIsEditing(false)} className={'justify-center items-center'}>
					<EditUserProfileForm item={selectedUser} onSave={handleEditUserProfile} setIsEditing={setIsEditing} />
				</Modal>
			)}
		</Shell>
	)
}
