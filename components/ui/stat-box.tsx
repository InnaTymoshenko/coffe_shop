import React from 'react'
import clsx from 'clsx'

export type DashboardStatBoxProps = {
	title: string
	value: number | string
	hint?: string
	addition?: string
	icon?: React.ReactNode
	color?: 'green' | 'blue' | 'orange' | 'gray' | 'red'
	children?: React.ReactNode
}

const colorClasses = {
	green: 'bg-green-100 text-green-800',
	blue: 'bg-blue-100 text-blue-800',
	orange: 'bg-orange-100 text-orange-800',
	gray: 'bg-gray-100 text-gray-800',
	red: 'bg-red-100 text-red-800'
}

export const DashboardStatBox = ({
	title,
	value,
	hint,
	addition,
	icon,
	color = 'gray',
	children
}: DashboardStatBoxProps) => {
	return (
		<div className={clsx('p-4 rounded-lg shadow flex flex-col gap-1', colorClasses[color])}>
			<div className="flex items-center justify-between">
				<span className="text-sm font-medium">{title}</span>
				{icon && <span className="text-xl">{icon}</span>}
			</div>
			<div className="text-2xl font-bold">{value}</div>
			{hint && <div className="text-xs text-gray-600 italic">{hint}</div>}
			{addition && <div className="text-2xl font-bold">{addition}</div>}
			{children}
		</div>
	)
}
