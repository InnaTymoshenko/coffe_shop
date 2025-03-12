'use client'

import About from '@/components/About'
import Bottom from '@/components/Bottom'
// import Location from '@/components/Location'
import Main from '@/components/Main'
import Products from '@/components/Products'
import Traditions from '@/components/Traditions'

export default function Home() {
	return (
		<>
			<div className="fixed top-0 left-0 w-full h-screen bg-banner basic z-[-2]" />
			<Main />
			<Products />
			<About />
			<Traditions />
			<Bottom />
			{/* <Location /> */}
		</>
	)
}
