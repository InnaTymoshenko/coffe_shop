import type { Metadata } from 'next'
import { Geist, Geist_Mono, Playwrite_IN, Playfair_Display } from 'next/font/google'
import '@/styles/globals.css'
import Header from '@/components/Header'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin-ext']
})

const playwrite = Playwrite_IN({
	variable: '--font-playwrite'
})

const playfair = Playfair_Display({
	variable: '--font-playfair',
	subsets: ['latin']
})

export const metadata: Metadata = {
	title: 'Coffee Town',
	description: 'Greating coffee for you',
	icons: {
		icon: [{ url: '/favicon.ico' }]
	}
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${playwrite.variable} ${playfair.variable} antialiased`}
			>
				<div className="relative grid grid-rows-[0px_1fr_20px] items-center justify-items-center min-h-screen font-[family-name:var(--font-playfair)]">
					<Header />
					<div className="fixed top-0 left-0 w-full h-screen bg-banner basic z-[-2]" />
					<main className="relative w-full min-h-screen flex flex-col row-start-2 items-center sm:items-start pb-12">
						{children}
					</main>
					<footer className="w-full h-40 bg-black row-start-3 flex gap-6 flex-wrap items-center justify-center">
						<h2 className="text-white text-3xl">Footer</h2>
					</footer>
				</div>
			</body>
		</html>
	)
}
