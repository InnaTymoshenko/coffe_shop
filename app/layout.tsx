import type { Metadata } from 'next'
import { Geist, Geist_Mono, Playwrite_IN, Playfair_Display } from 'next/font/google'
import '@/styles/globals.css'

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
				<div>{children}</div>
			</body>
		</html>
	)
}
