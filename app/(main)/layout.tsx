import Header from '@/components/header'
import Footer from '@/components/footer'

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className="relative flex flex-col items-center justify-between min-h-screen font-[family-name:var(--font-playfair)]">
			<Header />
			<main className="relative w-full min-h-screen flex flex-col row-start-2 items-center sm:items-start mb-16 pb-16">
				{children}
			</main>
			<footer className="w-full px-4 pt-8 bg-black row-start-3 flex gap-6 flex-wrap items-end justify-between text-gray-200">
				<Footer />
			</footer>
		</div>
	)
}
