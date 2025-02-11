import React from 'react'
import Shell from '@/components/ui/Shell'
import { MdCoffeeMaker } from 'react-icons/md'
import { ButtonLink } from '@/components/ui/ButtonLink'

const NotFound = () => {
	return (
		<div className="w-full h-screen bg-gray-900 flex flex-col gap-20 items-center justify-center min-h-screen font-[family-name:var(--font-playfair)]">
			<Shell className="flex items-center gap-12">
				<MdCoffeeMaker size={96} className="text-gray-200" />
				<p className="text-gray-200 text-3xl">Sorry... This page is not available</p>
			</Shell>
			<ButtonLink
				href={'/'}
				text="Go Back"
				className="button w-32 bg-orange-600 p-2 border-2 border-orange-600 hover:border-gray-200 text-gray-200 font-semibold active:scale-95 transition-all duration-150"
			/>
		</div>
	)
}

export default NotFound
