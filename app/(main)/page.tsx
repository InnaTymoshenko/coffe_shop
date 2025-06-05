'use client'

import About from '@/components/about'
import Bottom from '@/components/bottom'
import Main from '@/components/main'
import Map from '@/components/map-wrapper'
import Products from '@/components/products'
import Traditions from '@/components/traditions'

export default function Home() {
	return (
		<>
			<Main />
			<Products />
			<About />
			<Traditions />
			<Bottom />
			<Map />
			<div className="fixed top-0 left-0 right-0 bottom-0 w-full min-h-screen bg-banner basic z-[-2]" />
		</>
	)
}
