'use client'

import React from 'react'
import Shell from './ui/shell'
import { ButtonLink } from './ui/button-link'
import AnimatedButton from './ui/animated-button'

const Main = () => {
	return (
		<div className="relative w-full h-screen bg-black/30 flex flex-col justify-center font-[family-name:var(--font-playfair)]">
			<Shell className="container text-white">
				<div className="lg:w-[60%] sm:w-full p-4">
					<h1 className="lg:text-6xl sm:text-3xl my-10">Coffee Town – A Taste of the City in Every Cup</h1>
					<p className="my-10 lg:text-xl sm:text-lg">
						Experience the perfect blend of coziness and inspiration at Coffee Town. We offer the freshest coffee
						blends, aromatic pastries, and a warm welcome. Our café is the ideal spot for business meetings, friendly
						gatherings, or a quiet moment with your favorite drink. Visit us and immerse yourself in the magic of
						coffee!
					</p>
				</div>
				<div className="w-[60%] flex justify-start gap-6 p-4">
					<div className="w-[250px] flex justify-start items-center gap-6">
						<ButtonLink
							href="/menu"
							aria-label="Check menu"
							className="button relative w-32 h-12 overflow-hidden bg-transparent text-lg text-gray-200 px-4 py-3 border-2 border-gray-900 hover:bg-gray-900 active:bg-gray-900/80 active:scale-95 transition-all duration-150"
						>
							<AnimatedButton className="w-32 py-2 hover:-top-10" text="Check menu" />
						</ButtonLink>
						<ButtonLink
							href="/#booking"
							aria-label="Book table"
							className="button relative w-32 h-12 overflow-hidden bg-gray-900 text-lg text-gray-200 px-4 py-3 border-2 border-gray-900 hover:bg-transparent hover:border-gray-900 active:bg-gray-900/40 active:scale-95 transition-all duration-150 "
						>
							<AnimatedButton className="w-32 py-2 hover:-top-10" text="Book table" />
						</ButtonLink>
					</div>
				</div>
			</Shell>
			<div className="basic blur-sm absolute top-[-5rem] z-[-1] w-full h-[115%] bg-basic " />
		</div>
	)
}

export default Main
