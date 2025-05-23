import { NavSidebarItem } from '@/types/nav-sidebar'

export interface DashboardConfig {
	adminSidebarNav: NavSidebarItem[]
	accountSidebarNav: NavSidebarItem[]
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
	accountSidebarNav: [
		{
			title: 'My favorites',
			href: '/cabinet/favorites'
		},
		{
			title: 'My orders',
			href: '/cabinet/orders'
		},
		{
			title: 'Personal information',
			href: '/cabinet/personal'
		}
	]
}
