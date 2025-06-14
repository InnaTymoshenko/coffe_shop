import React from 'react'
import Header from '@/components/header'
import NavSidebar from '@/components/layouts/dashboard/nav-sidebar'
import { dashboardConfig } from '@/root-config/dashboard'
import Footer from '@/components/footer'

function AccountLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className="flex min-h-screen flex-col">
			<div className="flex items-center h-20 justify-between border-b border-gray-800 px-6 sticky top-0 bg-gray-900/95" />
			<Header />
			<div className="flex-1 md:grid md:grid-cols-[200px_minmax(0,1fr)]">
				<aside className="top-20 sm:hidden h-[calc(100vh-5rem)] w-full overflow-y-auto border-r border-r-gray-800 md:sticky md:block bg-gray-900/95">
					<NavSidebar items={dashboardConfig.accountSidebarNav} variant="user" />
				</aside>
				<main className="flex w-full flex-col min-h-screen">
					{children}
					<div className="fixed top-0 left-0 w-full h-full bg-barista basic z-[-2] ">
						<div className="absolute inset-0 bg-gray-900/50 z-[-1]" />
					</div>
				</main>
			</div>
			<footer className="w-full px-4 pt-8 bg-black row-start-3 flex gap-6 flex-wrap items-end justify-between text-gray-200">
				<Footer />
			</footer>
		</div>
	)
}

export default AccountLayout
