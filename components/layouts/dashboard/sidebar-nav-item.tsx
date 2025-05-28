'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MouseEvent } from 'react'

type SidebarNavItemProps = {
	title: string
	href: string
	variant: 'admin' | 'user' | 'default'
	action?: 'openCart'
	setOpenCart?: (value: boolean) => void
}

const variantClasses = {
	default: 'bg-gray-900 text-gray-200',
	admin: 'text-green-900 hover:bg-gray-300',
	user: 'text-gray-200 hover:bg-gray-700'
}

export const SidebarNavItem = ({ title, href, variant, action, setOpenCart }: SidebarNavItemProps) => {
	const pathname = usePathname()
	const isActionOnly = action === 'openCart'
	const isMain = href === '/cabinet' || href === '/admin'
	const isActive = !isActionOnly && (isMain ? pathname === href : pathname.startsWith(href))
	const style = isActive ? 'bg-gray-800 text-gray-200' : variantClasses[variant]

	const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
		if (action === 'openCart') {
			e.preventDefault()
			setOpenCart?.(true)
		}
	}

	return (
		<Link href={href} onClick={handleClick} className={`rounded-sm px-4 py-2 text-lg block ${style}`}>
			{title}
		</Link>
	)
}
