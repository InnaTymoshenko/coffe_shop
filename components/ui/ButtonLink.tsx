import React, { forwardRef } from 'react'
import Link, { LinkProps } from 'next/link'
import { ButtonProps } from './Button'
import { Button } from './Button'

type ButtonLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & ButtonProps & LinkProps

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(function ButtonLink({ href, ...props }, ref) {
	return (
		<Link ref={ref} href={href} passHref tabIndex={-1}>
			<Button {...props}>{props.children}</Button>
		</Link>
	)
})
