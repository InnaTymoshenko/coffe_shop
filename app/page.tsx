import Main from '@/components/Main'

export default function Home() {
	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen gap-16  font-[family-name:var(--font-geist-sans)]">
			<header className="w-full h-20 bg-gray-50 row-start-1 flex gap-6 items-center justify-center"></header>
			<main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
				<Main />
			</main>
			<footer className="w-full h-20 bg-black row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
		</div>
	)
}
