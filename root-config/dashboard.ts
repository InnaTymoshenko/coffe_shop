import { NavSidebarItem } from '@/types/nav-sidebar'

export interface DashboardConfig {
	adminSidebarNav: NavSidebarItem[]
	userSidebarNav: NavSidebarItem[]
}

export const dashboardConfig: DashboardConfig = {
	adminSidebarNav: [
		{
			title: 'Main',
			href: '/admin/main'
		},
		{
			title: 'Products',
			href: '/admin/products'
		},
		{
			title: 'Orders',
			href: '/admin/orders'
		},
		{
			title: 'Reservation',
			href: '/admin/reservation'
		},
		{
			title: 'Users',
			href: '/admin/users'
		},
		{
			title: 'Promotions',
			href: '/admin/promotions'
		},
		{
			title: 'Cafes',
			href: '/admin/cafes'
		}
	],
	userSidebarNav: [
		{
			title: 'Головна',
			href: '/partner/main'
		},
		{
			title: 'Товари',
			href: '/partner/products'
		},
		{
			title: 'Замовлення',
			href: '/partner/orders'
		}
	]
}
