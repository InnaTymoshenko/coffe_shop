'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { FaArrowLeftLong } from 'react-icons/fa6'
import Shell from '@/components/ui/shell'
import { LocationData } from '@/types/location-type'
import { normalizedPhone } from '@/method/fn'
import { Button } from '@/components/ui/button'
import { ButtonLink } from '@/components/ui/button-link'
import { Modal } from '@/components/ui/modal'
import EditCafeForm from '@/components/layouts/forms/edit-cafe-form'
import { useAdminStore } from '@/store/admin-store'

export default function CafeAdminPage() {
	const [selectedCafe, setSelectedCafe] = useState<LocationData>()
	const [isEditing, setIsEditing] = useState(false)
	const params = useParams()
	const id = params?.id as string
	const { cafesData, editCafe } = useAdminStore()

	useEffect(() => {
		if (cafesData) {
			const selectedCafe = cafesData.find(c => c.id === id)
			setSelectedCafe(selectedCafe)
		}
	}, [cafesData, id])

	const handleEditCafe = (item: LocationData) => {
		editCafe(item)
		setIsEditing(false)
	}

	return (
		<Shell className="container flex flex-col gap-8">
			<ButtonLink
				href={'/admin/cafes'}
				text="Back to cafes"
				className="flex gap-1 items-center font-medium hover:underline"
			>
				<FaArrowLeftLong />
			</ButtonLink>
			<h1 className="text-2xl font-bold my-8">{selectedCafe?.name}</h1>
			<div className="w-full flex gap-12">
				{selectedCafe && (
					<Image
						src={selectedCafe?.img}
						alt={selectedCafe?.name}
						width={300}
						height={300}
						priority
						className="w-[300px] h-auto"
					/>
				)}
				<div className="flex flex-col gap-2">
					{selectedCafe && (
						<ul className="grid grid-cols-2 gap-y-2">
							<li className="font-medium">ID:</li>
							<li>{selectedCafe?.id}</li>
							<li className="font-medium">Rating:</li>
							<li>{selectedCafe?.averageRating}</li>
							<li className="font-medium">Address:</li>
							<li>{selectedCafe?.address}</li>
							<li className="font-medium">Location:</li>
							<li>{`${selectedCafe?.lat}, ${selectedCafe?.lng}`}</li>
							<li className="font-medium">Created:</li>
							<li>{selectedCafe?.createdAt}</li>
							<li className="font-medium">Updated:</li>
							<li>{selectedCafe?.updatedAt}</li>
							<li className="font-medium">Manager:</li>
							<li>{selectedCafe?.managerName}</li>
							<li className="font-medium">Phone:</li>
							<li>
								<Link href={`tel:${normalizedPhone(selectedCafe?.phone)}`} className="text-blue-500 hover:underline">
									{selectedCafe.phone}
								</Link>
							</li>
							<li className="font-medium">Email:</li>
							<li>
								<Link href={`mailto:${selectedCafe.managerEmail}`} className="text-blue-500 hover:underline">
									{selectedCafe.managerEmail}
								</Link>
							</li>
							<li className="font-medium">Total orders:</li>
							<li>{selectedCafe?.totalOrders}</li>
							<li className="font-medium">Total Clients:</li>
							<li>{selectedCafe?.totalClients}</li>
							<li className="font-medium">Opening:</li>
							<li>{selectedCafe?.openingHours}</li>
							<li className="font-medium">Status:</li>
							<li>{selectedCafe?.isActive ? 'Open' : 'Closed'}</li>
							<li className="font-medium">Notes:</li>
							<li>{selectedCafe?.notes}</li>
						</ul>
					)}
				</div>
			</div>
			<div className="w-full flex justify-start items-center gap-6">
				<Button
					text="Edit Profile Cafe"
					className="w-1/4 rounded-lg p-3 bg-gray-100 border border-gray-400 hover:bg-gray-300"
					onClick={() => setIsEditing(true)}
				/>
			</div>
			{isEditing && selectedCafe && (
				<Modal isOpen={isEditing} onClose={() => setIsEditing(false)} className={'justify-center items-center'}>
					<EditCafeForm item={selectedCafe} onSave={handleEditCafe} setIsEditing={setIsEditing} />
				</Modal>
			)}
		</Shell>
	)
}
