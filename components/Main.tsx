'use client'

import React from 'react'
import { Button } from './Button'

const Main = () => {
	return (
		<div className="relative w-full h-screen flex flex-col justify-center font-[family-name:var(--font-playfair)]">
			<div className="w-full max-w-[1200px] mx-auto text-white">
				<div className="w-[60%] p-4">
					<h1 className="text-6xl my-10">Coffee Town – A Taste of the City in Every Cup</h1>
					<p className="my-10 text-xl">
						Experience the perfect blend of coziness and inspiration at Coffee Town. We offer the freshest coffee
						blends, aromatic pastries, and a warm welcome. Our café is the ideal spot for business meetings, friendly
						gatherings, or a quiet moment with your favorite drink. Visit us and immerse yourself in the magic of
						coffee!
					</p>
				</div>
				<div className="w-[60%] flex justify-start gap-6 p-4">
					<Button
						text="Check menu"
						className="button w-32 bg-transparent text-lg  px-4 py-3 border-2 border-gray-900 hover:bg-gray-900  transition-all duration-300"
					/>
					<Button
						text="Book table"
						className="button w-32 bg-gray-900 text-lg  px-4 py-3 border-2 border-gray-900 hover:bg-transparent hover:border-gray-900  transition-all duration-300"
					/>
				</div>
			</div>

			<div className="basic absolute top-[-5rem] z-[-1] w-full h-[115%] bg-basic " />
		</div>
	)
}

export default Main
