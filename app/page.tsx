import Header from '@/components/Header'
import Main from '@/components/Main'
import Products from '@/components/Products'

export default function Home() {
	return (
		<div className="relative grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen  font-[family-name:var(--font-geist-sans)]">
			<Header />
			<main className="relative flex flex-col row-start-2 items-center sm:items-start">
				<Main />
				<Products />
			</main>
			<footer className="w-full h-20 bg-black row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
		</div>
	)
}
