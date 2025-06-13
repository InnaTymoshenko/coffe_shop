'use client'

import { SidebarNavProps } from '@/types/nav-sidebar'
import { SidebarNavItem } from './sidebar-nav-item'
import { useProductCart } from '@/store'

export default function NavSidebar({ items, variant = 'default', className, ...props }: SidebarNavProps) {
	const { setOpenCart } = useProductCart()

	const handleOpenCart = () => {
		if (setOpenCart) {
			setOpenCart(true)
		}
	}

	return (
		<div className={className} {...props}>
			<div className="flex flex-col gap-1 pb-8 pt-6 md:py-8 xl:px-6 sm:px-0">
				{items.map((item, index) => (
					<SidebarNavItem
						key={index}
						title={item.title}
						href={item.href}
						variant={variant}
						action={item.action}
						setOpenCart={handleOpenCart}
					/>
				))}
			</div>
		</div>
	)
}
