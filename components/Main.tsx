'use client'

import React from 'react'
import Shell from './ui/shell'
import { ButtonLink } from './ui/button-link'

const Main = () => {
	return (
		<div className="relative w-full h-screen bg-black/30 flex flex-col justify-center font-[family-name:var(--font-playfair)]">
			<Shell className="container text-white">
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
					<div className="w-[250px] flex justify-start items-center gap-6">
						<ButtonLink
							text="Check menu"
							className="button w-32 bg-transparent text-lg  px-4 py-3 border-2 border-gray-900 hover:bg-gray-900 active:bg-gray-900/80 active:scale-95 transition-all duration-150 "
							href={'/menu'}
						/>
						<ButtonLink
							href={'/#booking'}
							text="Book table"
							className="button w-32 bg-gray-900 text-lg  px-4 py-3 border-2 border-gray-900 hover:bg-transparent hover:border-gray-900 active:bg-gray-900/40 active:scale-95 transition-all duration-150 "
						/>
					</div>
				</div>
			</Shell>
			<div className="basic blur-sm absolute top-[-5rem] z-[-1] w-full h-[115%] bg-basic " />
		</div>
	)
}

export default Main
