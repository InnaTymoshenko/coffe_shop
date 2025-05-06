import React from 'react'
import Link from 'next/link'
import type { LinkProps } from 'next/link'

interface NavItemProps extends LinkProps {
	children: React.ReactNode
	className?: string
}

export function NavItem({ href, children, className, ...props }: NavItemProps) {
	return (
		<Link href={href} className={className} {...props}>
			{children}
		</Link>
	)
}
