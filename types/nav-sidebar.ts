export interface NavSidebarItem {
	icon?: React.ReactNode
	title: string
	href: string
	action?: 'openCart'
}

export interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
	items: NavSidebarItem[]
	variant?: 'admin' | 'user' | 'default'
	setOpenCart?: (value: boolean) => void
}
