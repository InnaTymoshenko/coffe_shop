import React from 'react'
import Shell from '@/components/ui/shell'
import ReservationForm from '@/components/layouts/forms/reservation-form'
import PromotionsList from '@/components/promotions-list'

// type Props = {}

const TraditionalPage = () => {
	return (
		<>
			<div className="w-full h-[20vh] " />
			<div className="w-full flex bg-gray-900 flex-col gap-8 justify-start py-8 mb-8">
				<Shell className="container flex flex-col gap-8 justify-start items-start">
					<h1 className="capitalize text-gray-200 text-3xl my-6 ">Our traditions</h1>
					<PromotionsList />
				</Shell>
			</div>
			<div className="w-full min-h-[70vh] flex flex-col gap-8 justify-start py-8 mb-8">
				<Shell className="container flex flex-col flex-wrap gap-4 justify-center items-start">
					<h2 className="text-white text-3xl my-6 bg-gray-900/80 p-2 rounded-sm">Book a Table</h2>
					<ReservationForm />
				</Shell>
			</div>
			<div className="fixed top-0 left-0 w-full h-screen bg-cup basic -z-10 " aria-hidden="true" />
		</>
	)
}

export default TraditionalPage
