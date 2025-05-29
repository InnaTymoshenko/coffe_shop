/* eslint-disable @next/next/no-img-element */
'use client'

import { useRef, useState } from 'react'
import { Button } from './ui/button'
import { UserProfile } from '@/types/users-type'

type Props = {
	item: UserProfile
	onSave: (updated: UserProfile) => void
	setIsOpen: (value: boolean) => void
}

export default function AvatarEditor({ item, onSave, setIsOpen }: Props) {
	const [previewUrl, setPreviewUrl] = useState(item.avatarUrl)
	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const fileInputRef = useRef<HTMLInputElement | null>(null)

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			const url = URL.createObjectURL(file)
			setPreviewUrl(url)
			setSelectedFile(file)
		}
	}

	const handleClick = () => {
		fileInputRef.current?.click()
	}

	const handleSave = () => {
		if (selectedFile) {
			console.log('Saved to state:', selectedFile)
			setSelectedFile(null)
			onSave({
				...item,
				avatarUrl: previewUrl
			})
		}
	}

	return (
		<div className="w-full flex flex-col justify-start items-center gap-8">
			<img
				src={previewUrl}
				alt={`${item.firstName} ${item.lastName}`}
				className="rounded-full border border-gray-400 w-40 h-40 object-cover object-center"
			/>
			<input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
			<div className="w-full flex justify-center items-center gap-6">
				<Button
					text="Edit"
					onClick={handleClick}
					className="w-32 bg-orange-500 text-white px-4 py-2 rounded-sm hover:bg-orange-600"
				/>
				<Button
					text="Save"
					onClick={handleSave}
					className="w-32 bg-green-500 text-white px-4 py-2 rounded-sm hover:bg-green-600"
				/>
				<Button
					text="Close"
					className="w-32 bg-red-500 text-white px-4 py-2 rounded-sm hover:bg-red-600"
					onClick={() => setIsOpen(false)}
				/>
			</div>
		</div>
	)
}
