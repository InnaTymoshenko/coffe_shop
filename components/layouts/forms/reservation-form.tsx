'use client'

import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { v4 as uuidv4 } from 'uuid'
import { Calendar, Clock } from 'lucide-react'
import DatePicker from '../../client-date-picker'
import TimePicker from '../../client-time-picker'
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import 'react-time-picker/dist/TimePicker.css'
import { ReservationFormData, reservationSchema } from '@/utils/validation/reservation-schema'
import { LocationData } from '@/types/location-type'
import fakeLocation from '@/fakedata/location.json'
import Select from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import AnimatedButton from '@/components/ui/animated-button'

const cafeOptions = [
	{ value: 'khreschatyk', label: 'Coffee Town - Khreschatyk' },
	{ value: 'podil', label: 'Coffee Town - Podil' },
	{ value: 'jbolon', label: 'Coffee Town - Obolon' }
]

const ReservationForm = () => {
	const [cafes, setCafes] = useState<LocationData[]>([])
	const [showSuccess, setShowSuccess] = useState(false)
	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting, isSubmitSuccessful }
	} = useForm<ReservationFormData>({
		resolver: zodResolver(reservationSchema),
		defaultValues: {
			date: new Date(),
			time: '12:00',
			cafe: 'Coffee Town - Хрещатик'
		}
	})

	useEffect(() => {
		const cafes = fakeLocation as LocationData[]
		setCafes(cafes)
	}, [])

	useEffect(() => {
		if (isSubmitSuccessful) {
			setShowSuccess(true)
			const timer = setTimeout(() => {
				setShowSuccess(false)
			}, 3000)

			return () => clearTimeout(timer)
		}
	}, [isSubmitSuccessful])

	const onSubmit = async (data: ReservationFormData) => {
		const cafe = cafes.find(cafe => cafe.name === data.cafe)
		const formattedDate =
			data.date instanceof Date
				? data.date.toLocaleDateString('uk-UA')
				: new Date(data.date).toLocaleDateString('uk-UA')

		const finalData = {
			...data,
			id: uuidv4(),
			address: cafe?.address,
			isReady: true,
			date: formattedDate
		}
		console.log('Reservation Data:', finalData)
		await new Promise(resolve => setTimeout(resolve, 1000))
		reset()
	}

	return (
		<div id="booking" className="w-full flex flex-col flex-wrap gap-4 justify-center items-start">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-full mx-auto bg-gray-900/80 p-6 rounded-sm shadow-md flex flex-col gap-4 items-center"
			>
				<div className="w-full grid md:grid-cols-3 sm:grid-cols-1 grid-rows-2 gap-4">
					<div className="">
						<input
							{...register('name')}
							type="text"
							className="w-full p-3 text-gray-200 text-md border-2 border-gray-800 rounded-sm bg-gray-900"
							placeholder="Your Name"
						/>
						{errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
					</div>
					<div className="">
						<input
							{...register('tel')}
							type="tel"
							className="w-full p-3 text-gray-200 text-md border-2 border-gray-800 rounded-sm bg-gray-900"
							placeholder="Your Phone"
						/>
						{errors.tel && <p className="text-red-500 text-sm">{errors.tel.message}</p>}
					</div>
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
					<div className="relative">
						<Controller
							control={control}
							name="date"
							render={({ field }) => (
								<>
									<div className="max-h-[300px] custom-datepicker">
										<DatePicker
											{...field}
											onChange={field.onChange}
											value={field.value}
											minDate={new Date()}
											calendarIcon={null}
											clearIcon={null}
											format="y-MM-dd"
											calendarProps={{
												tileDisabled: ({ date }) => date.getDay() === 1
											}}
											className="w-full p-3 text-gray-200 text-md border-2 border-gray-800 rounded-sm bg-gray-900 cursor-pointer focus:outline-none focus:border-gray-200 placeholder:text-gray-200"
										/>
									</div>
								</>
							)}
						/>
						<Calendar
							size={20}
							className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-200 pointer-events-none"
						/>
						{errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
					</div>
					<div className="relative">
						<Controller
							name="time"
							control={control}
							render={({ field }) => (
								<>
									<div className="custom-timepicker">
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
									</div>
								</>
							)}
						/>
						<Clock
							size={20}
							className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-200 pointer-events-none"
						/>
						{errors.time && <p className="text-red-500 text-sm">{errors.time.message}</p>}
					</div>
					<div className="w-full text-gray-200 text-md border-2 border-gray-800 rounded-sm bg-gray-900 ">
						{cafes.length > 0 && (
							<Controller
								name="cafe"
								control={control}
								render={({ field, fieldState }) => (
									<Select
										options={cafeOptions}
										value={field.value}
										onChange={field.onChange}
										error={fieldState.error?.message}
										style="border-gray-800"
										className="w-full p-3 text-gray-200 text-md rounded-sm bg-gray-900"
									/>
								)}
							/>
						)}
					</div>
				</div>
				<div className="w-full">
					<textarea
						{...register('comment')}
						className="w-full p-3 text-gray-200 text-md border-2 border-gray-800 rounded-sm bg-gray-900"
						rows={4}
						placeholder="Your Message"
					></textarea>
					{errors.comment && <p className="text-red-500 text-sm">{errors.comment.message}</p>}
				</div>
				<Button
					type="submit"
					className="button relative overflow-hidden w-32 h-10 bg-orange-600 p-2 border-2 border-orange-600 hover:border-gray-200 text-gray-200 font-semibold active:scale-95 transition-all duration-150"
					disabled={isSubmitting}
				>
					<AnimatedButton className="w-32 py-2 hover:-top-9" text={isSubmitting ? 'Sending...' : 'Reserve Table'} />
				</Button>
				{showSuccess && <p className="text-green-600 text-lg mt-2">{`Thank you! We've reserved your table.`}</p>}
			</form>
		</div>
	)
}

export default ReservationForm
