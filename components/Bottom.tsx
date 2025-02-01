import React from 'react'
import Shell from './ui/Shell'
import Reviews from './Reviews'
import ReservationForm from './ReservationForm'

// type Props = {}

const Bottom = () => {
	return (
		<div className="w-full min-h-screen flex flex-col gap-8 justify-start py-8">
			<Shell className="container flex flex-col flex-wrap gap-4 justify-center items-start">
				<h2 className="text-white text-3xl my-6">Reviews</h2>
				<Reviews />
				<h2 className="text-white text-3xl my-6">Book a Table</h2>
				<ReservationForm />
			</Shell>
		</div>
	)
}

export default Bottom
