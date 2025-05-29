import React from 'react'
import Header from '@/components/header'
import NavSidebar from '@/components/layouts/dashboard/nav-sidebar'
import { dashboardConfig } from '@/root-config/dashboard'

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
				<aside className="top-20 hidden h-[calc(100vh-5rem)] w-full overflow-y-auto border-r border-r-gray-800 md:sticky md:block bg-gray-900/95">
					<NavSidebar items={dashboardConfig.accountSidebarNav} variant="user" />
				</aside>
				<main className="flex w-full flex-col max-h-[calc(100vh-5rem)] overflow-auto bg-gray-900/80">{children}</main>
			</div>
		</div>
	)
}

export default AccountLayout
