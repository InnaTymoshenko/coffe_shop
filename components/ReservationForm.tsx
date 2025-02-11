'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Calendar, Clock } from 'lucide-react'

const reservationSchema = z.object({
	name: z.string().min(2, 'Name must be at least 2 characters'),
	email: z.string().email('Invalid email format'),
	tel: z.string().regex(/^\+?\d{10,15}$/, 'Invalid phone number'),
	date: z.string().min(1, 'Date is required'),
	time: z.string().min(1, 'Time is required'),
	guests: z.number().min(1, 'At least 1 guest required').max(20, 'Maximum 20 guests'),
	comment: z.string().max(500, 'Comment must be less than 500 characters').optional()
})

type ReservationFormData = z.infer<typeof reservationSchema>

const ReservationForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm<ReservationFormData>({
		resolver: zodResolver(reservationSchema)
	})

	const onSubmit = async (data: ReservationFormData) => {
		console.log('Reservation Data:', data)
		await new Promise(resolve => setTimeout(resolve, 1000))
		alert('Table reserved successfully!')
	}

	return (
		<div id="booking" className="w-full flex flex-col flex-wrap gap-4 justify-center items-start">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-full mx-auto bg-gray-900/80 p-6 rounded-sm shadow-md flex flex-col gap-4 items-center"
			>
				<div className="w-full grid grid-cols-3 grid-rows-2 gap-4">
					{/* Name */}
					<div className="">
						<input
							{...register('name')}
							type="text"
							className="w-full p-3 text-gray-200 text-md border-2 border-gray-800 rounded-sm bg-gray-900"
							placeholder="Your Name"
						/>
						{errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
					</div>

					{/* Email */}
					<div className="">
						<input
							{...register('email')}
							type="email"
							className="w-full p-3 text-gray-200 text-md border-2 border-gray-800 rounded-sm bg-gray-900"
							placeholder="Your Email"
						/>
						{errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
					</div>

					{/* Phone Number */}
					<div className="">
						<input
							{...register('tel')}
							type="tel"
							className="w-full p-3 text-gray-200 text-md border-2 border-gray-800 rounded-sm bg-gray-900"
							placeholder="Your Phone"
						/>
						{errors.tel && <p className="text-red-500 text-sm">{errors.tel.message}</p>}
					</div>

					{/* Date */}
					<div className="relative">
						<input
							{...register('date')}
							type="date"
							className="w-full p-3 text-gray-200 text-md border-2 border-gray-800 rounded-sm bg-gray-900"
						/>
						<Calendar size={20} className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-200" />
						{errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
					</div>

					{/* Time */}
					<div className="relative">
						<input
							{...register('time')}
							type="time"
							className="w-full p-3 text-gray-200 text-md border-2 border-gray-800 rounded-sm bg-gray-900 placeholder:text-gray-200"
						/>
						<Clock size={20} className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-200" />
						{errors.time && <p className="text-red-500 text-sm">{errors.time.message}</p>}
					</div>

					{/* Guests */}
					<div>
						<input
							{...register('guests', { valueAsNumber: true })}
							type="number"
							min="1"
							max="20"
							className="w-full p-3 text-gray-200 text-md border-2 border-gray-800 rounded-sm bg-gray-900"
							placeholder="Number Of People"
						/>
						{errors.guests && <p className="text-red-500 text-sm">{errors.guests.message}</p>}
					</div>
				</div>

				{/* Comments */}
				<div className="w-full">
					<textarea
						{...register('comment')}
						className="w-full p-3 text-gray-200 text-md border-2 border-gray-800 rounded-sm bg-gray-900"
						rows={4}
						placeholder="Your Message"
					></textarea>
					{errors.comment && <p className="text-red-500 text-sm">{errors.comment.message}</p>}
				</div>

				{/* Submit Button */}
				<button
					type="submit"
					className="button w-32 h-[80%] bg-orange-600 p-2 border-2 border-orange-600 hover:border-gray-200 text-gray-200 font-semibold active:scale-95 transition-all duration-150"
					disabled={isSubmitting}
				>
					{isSubmitting ? 'Submitting...' : 'Reserve Table'}
				</button>
			</form>
		</div>
	)
}

export default ReservationForm
