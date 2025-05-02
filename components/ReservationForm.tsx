'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Calendar, Clock } from 'lucide-react'
import DatePicker from './ClientDatePicker'
import TimePicker from './ClientTimePicker'
// import 'react-datepicker/dist/react-datepicker.css'

const reservationSchema = z.object({
	name: z.string().min(2, 'Name must be at least 2 characters'),
	email: z.string().email('Invalid email format'),
	tel: z.string().regex(/^\+?\d{10,15}$/, 'Invalid phone number'),
	date: z.date({ required_error: 'Date is required' }).refine(date => date > new Date(), 'Date must be in the future'),
	time: z.string().min(1, 'Time is required'),
	guests: z.number().min(1, 'At least 1 guest required').max(20, 'Maximum 20 guests'),
	comment: z.string().max(500, 'Comment must be less than 500 characters').optional()
})

type ReservationFormData = z.infer<typeof reservationSchema>

const ReservationForm = () => {
	const {
		control,
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm<ReservationFormData>({
		resolver: zodResolver(reservationSchema),
		defaultValues: {
			date: undefined,
			time: ''
		}
	})

	const onSubmit = async (data: ReservationFormData) => {
		const formattedDate =
			data.date instanceof Date
				? data.date.toLocaleDateString('uk-UA')
				: new Date(data.date).toLocaleDateString('uk-UA')

		const finalData = {
			...data,
			date: formattedDate
		}

		console.log('Reservation Data:', finalData)

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
						<Controller
							control={control}
							name="date"
							render={({ field }) => (
								<DatePicker
									{...field}
									onChange={field.onChange}
									value={field.value}
									minDate={new Date()}
									maxDate={new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 * 4)}
									calendarIcon={null}
									clearIcon={null}
									format="y-MM-dd"
									calendarProps={{
										tileDisabled: ({ date }) => date.getDay() === 1
									}}
									className="w-full p-3 text-gray-200 text-md border-2 border-gray-800 rounded-sm bg-gray-900 cursor-pointer focus:outline-none focus:border-gray-200 placeholder:text-gray-200"
								/>
							)}
						/>
						{/* <input
							{...register('date')}
							type="date"
							className="w-full p-3 text-gray-200 text-md border-2 border-gray-800 rounded-sm bg-gray-900"
						/> */}
						<Calendar
							size={20}
							className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-200 pointer-events-none"
						/>
						{errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
					</div>

					{/* Time */}
					<div className="relative">
						<Controller
							name="time"
							control={control}
							render={({ field }) => (
								<TimePicker
									{...field}
									onChange={field.onChange}
									value={field.value}
									disableClock={true}
									clearIcon={null}
									minTime="10:00"
									maxTime="20:00"
									className="w-full p-3 text-gray-200 text-md border-2 border-gray-800 rounded-sm bg-gray-900 placeholder:text-gray-200 cursor-pointer"
								/>
							)}
						/>
						{/* <input
							{...register('time')}
							type="time"
							className="w-full p-3 text-gray-200 text-md border-2 border-gray-800 rounded-sm bg-gray-900 placeholder:text-gray-200"
						/> */}
						<Clock
							size={20}
							className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-200 pointer-events-none"
						/>
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
