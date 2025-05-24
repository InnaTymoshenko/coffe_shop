import Header from '@/components/header'
// import AdminHeader from '@/components/layouts/dashboard/Admin-header'
import NavSidebar from '@/components/layouts/dashboard/nav-sidebar'
import { dashboardConfig } from '@/root-config/dashboard'
import React from 'react'

function AdminLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className="flex min-h-screen flex-col bg-private basic">
			<div className="bg-primary flex items-center h-20 justify-between border-b border-gray-300 px-6 sticky top-0" />
			<Header />
			<div className="flex-1 md:grid md:grid-cols-[200px_minmax(0,1fr)]">
				<aside className="top-20 hidden h-[calc(100vh-5rem)] w-full overflow-y-auto border-r border-r-gray-300 md:sticky md:block">
					<NavSidebar items={dashboardConfig.accountSidebarNav} />
				</aside>
				<main className="flex w-full flex-col max-h-[calc(100vh-5rem)] overflow-auto">{children}</main>
			</div>
		</div>
	)
}

export default AdminLayout
