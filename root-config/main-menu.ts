import { NavSidebarItem } from '@/types/nav-sidebar'

interface MainMenuConfig {
	[key: string]: NavSidebarItem[]
}

export const mainMenuConfig: MainMenuConfig = {
	mainMenu: [
		{ href: '/', title: 'Home' },
		{ href: '/menu', title: 'Menu' },
		{ href: '/#features', title: 'Features' },
		{ href: '/traditional', title: 'Traditional' },
		{ href: '/#booking', title: 'Booking' },
		{ href: '/#location', title: 'Location' }
	]
}
