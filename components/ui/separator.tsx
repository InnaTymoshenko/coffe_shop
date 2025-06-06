import React, { forwardRef } from 'react'

const variantClasses = {
	horizontal: 'w-full h-[1px]',
	vertical: 'h-full w-[1px]'
}

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: 'horizontal' | 'vertical'
}

const Separator = forwardRef<HTMLDivElement, SeparatorProps>(function Separator(
	{ variant = 'horizontal', className = '', ...props },
	ref
) {
	const style = variantClasses[variant] || variantClasses.horizontal
	return <div ref={ref} className={`${className} ${style} `} {...props}></div>
})

Separator.displayName = 'Separator'

export { Separator }
