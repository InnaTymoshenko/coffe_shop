/* eslint-disable @next/next/no-img-element */
import React from 'react'

// type Props = {}

const Location = () => {
	return (
		<div className="w-full  flex bg-gray-900 flex-col gap-8 justify-start py-8">
			<div className="w-[80%] flex gap-4 justify-between items-center mx-auto p-4">
				<div className="w-[40%] "></div>
				<div className="w-[40%] ">
					<img src={'/assets/banner.jpg'} alt="" className="w-full h-full object-cover object-center" />
				</div>
			</div>
		</div>
	)
}

export default Location
