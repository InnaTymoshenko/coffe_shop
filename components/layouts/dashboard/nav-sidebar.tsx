'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { NavItem } from '@/components/ui/nav-item'
import { NavSidebarItem } from '@/types/nav-sidebar'

export interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
	items: NavSidebarItem[]
}

export default function NavSidebar({ items, className, ...props }: SidebarNavProps) {
	const [selectedPath, setSelectedPath] = useState('/admin/main')
	const pathname = usePathname()

	useEffect(() => {
		setSelectedPath(pathname)
	}, [pathname])

	return (
		<div className={className} {...props}>
			<div className="flex flex-col gap-1 pb-8 pt-6 md:py-8 px-6">
				{items.map((item, index) => {
					return (
						<NavItem
							key={index}
							href={item.href}
							className={`rounded-sm px-4 py-2 text-lg ${
								selectedPath === item.href ? 'bg-gray-900 text-gray-200' : 'text-green-900 hover:bg-gray-300'
							}`}
						>
							{item.title}
						</NavItem>
					)
				})}
			</div>
		</div>
	)
}
