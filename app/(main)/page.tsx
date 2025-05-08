'use client'

import About from '@/components/about'
import Bottom from '@/components/bottom'
// import Location from '@/components/Location'
import Main from '@/components/Main'
import Map from '@/components/MapWrapper'
import Products from '@/components/Products'
import Traditions from '@/components/Traditions'

export default function Home() {
	return (
		<>
			<Main />
			<Products />
			<About />
			<Traditions />
			<Bottom />
			<Map />
			<div className="fixed top-0 left-0 w-full h-screen bg-banner basic z-[-2]" />
		</>
	)
}
