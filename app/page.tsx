'use client'

import { useState } from 'react'
import About from '@/components/About'
import Bottom from '@/components/Bottom'
import Header from '@/components/Header'
// import Location from '@/components/Location'
import Main from '@/components/Main'
import Products from '@/components/Products'
import Traditions from '@/components/Traditions'
import Cart from '@/components/Cart'

export default function Home() {
	const [openCart, setOpenCart] = useState(false)

	const openCartHandler = () => {
		setOpenCart(!openCart)
	}

	return (
		<div className="relative grid grid-rows-[0px_1fr_20px] items-center justify-items-center min-h-screen font-[family-name:var(--font-playfair)]">
			{openCart && <Cart openCartHandler={openCartHandler} />}
			<Header openCartHandler={openCartHandler} />
			<div className="fixed top-0 left-0 w-full h-screen bg-banner basic z-[-2]" />
			<main className="relative w-full min-h-screen flex flex-col row-start-2 items-center sm:items-start pb-12">
				<Main />
				<Products />
				<About />
				<Traditions />
				<Bottom />
				{/* <Location /> */}
			</main>
			<footer className="w-full h-40 bg-black row-start-3 flex gap-6 flex-wrap items-center justify-center">
				<h2 className="text-white text-3xl">Footer</h2>
			</footer>
		</div>
	)
}
