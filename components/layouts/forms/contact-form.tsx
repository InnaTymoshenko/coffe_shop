'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ContactFormData, contactSchema } from '@/utils/validation/contact-schema'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

export const ContactForm = () => {
	const [showSuccess, setShowSuccess] = useState(false)
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting, isSubmitSuccessful }
	} = useForm<ContactFormData>({
		resolver: zodResolver(contactSchema),
		defaultValues: {
			name: '',
			email: '',
			message: '',
			phone: ''
		}
	})

	useEffect(() => {
		if (isSubmitSuccessful) {
			setShowSuccess(true)
			const timer = setTimeout(() => {
				setShowSuccess(false)
			}, 3000)

			return () => clearTimeout(timer)
		}
	}, [isSubmitSuccessful])

	const onSubmit = async (data: ContactFormData) => {
		console.log('Form submitted:', data)
		reset()
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
			<div>
				<input
					{...register('name')}
					type="text"
					placeholder="Your Name"
					className="w-full p-3 text-gray-200 text-md border-2 border-gray-800 rounded-sm bg-gray-900"
				/>
				{errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
			</div>
			<div>
				<input
					{...register('phone')}
					type="tel"
					className="w-full p-3 text-gray-200 text-md border-2 border-gray-800 rounded-sm bg-gray-900"
					placeholder="Your Phone"
				/>
				{errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
			</div>
			<div>
				<input
					{...register('email')}
					type="email"
					placeholder="Your Email"
					className="w-full p-3 text-gray-200 text-md border-2 border-gray-800 rounded-sm bg-gray-900"
				/>
				{errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
			</div>
			<div>
				<textarea
					{...register('message')}
					placeholder="Your Message"
					className="w-full h-32 p-3 text-gray-200 text-md border-2 border-gray-800 rounded-sm bg-gray-900"
				/>
				{errors.message && <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>}
			</div>
			<Button
				text={isSubmitting ? 'Sending...' : 'Send'}
				type="submit"
				disabled={isSubmitting}
				className="button w-32  bg-orange-600 p-2 border-2 border-orange-600 hover:border-gray-200 text-gray-200 font-semibold active:scale-95 transition-all duration-150"
			/>
			{showSuccess && <p className="text-green-600 text-lg mt-2">{`Thank you! We'll get back to you soon.`}</p>}
		</form>
	)
}
