'use client'

import Image from 'next/image'
import React from 'react'

// type Props = {}

const MenuPage = () => {
	return (
		<>
			{/* <div className=" w-full h-[30vh] bg-stillife basic z-[-2]" /> */}
			<Image
				src={'/assets/still-life.jpg'}
				width={500}
				height={500}
				alt={'still-life'}
				className="w-[80%] h-auto mx-auto"
			/>
		</>
	)
}

export default MenuPage
