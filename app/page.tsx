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
			<Main />
			<Products />
			<About />
			<Traditions />
			<Bottom />
			{/* <Location /> */}
		</>
	)
}
