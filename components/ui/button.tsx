'use client'

import React, { forwardRef } from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children?: React.ReactNode
	className?: string
	text?: string
	href?: string
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button({ ...props }, ref) {
	return (
		<button ref={ref} className={props.className} {...props}>
			{props.children}
			{props.text}
		</button>
	)
})
Button.displayName = 'Button'

export { Button }
