import * as React from 'react'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: 'default' | 'success' | 'warning' | 'danger' | 'outline' | 'primary'
}

const variantClasses = {
	default: 'bg-gray-100 text-gray-800',
	success: 'bg-green-500 text-gray-100',
	primary: 'bg-gray-900 text-gray-100',
	warning: 'bg-orange-500 text-gray-100',
	danger: 'bg-red-500 text-gray-100',
	outline: 'border border-gray-400 text-gray-700 bg-transparent'
}

export function Badge({ className = '', variant = 'default', ...props }: BadgeProps) {
	const style = variantClasses[variant] || variantClasses.default

	return (
		<div className={`flex items-center rounded-full font-medium px-2 py-0.5 gap-1 ${style} ${className}`} {...props} />
	)
}
