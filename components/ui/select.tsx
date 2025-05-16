import React from 'react'

export type Option<T> = {
	value: T
	label: string
}

type SelectProps<T> = {
	label?: string
	options: Option<T>[]
	value: T
	onChange: (value: T) => void
	className?: string
	id?: string
	required?: boolean
	disabled?: boolean
	error?: string
}

function Select<T extends string | number>({
	label,
	options,
	value,
	onChange,
	className = '',
	id,
	required = false,
	disabled = false,
	error
}: SelectProps<T>) {
	return (
		<div className="w-full flex justify-start items-end gap-4">
			{label && (
				<label htmlFor={id} className="text-sm font-medium text-gray-900">
					{label} {required && <span className="text-red-500">*</span>}
				</label>
			)}
			<select
				id={id}
				value={value}
				onChange={e => onChange(e.target.value as T)}
				disabled={disabled}
				required={required}
				className={`p-2 border rounded-lg focus:outline-none cursor-pointer ${
					error ? 'border-red-500' : 'border-gray-900'
				} ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''} ${className}`}
			>
				{options.map(option => (
					<option key={option.value} value={option.value} className="">
						{option.label}
					</option>
				))}
			</select>
			{error && <p className="text-red-500 text-sm">{error}</p>}
		</div>
	)
}

export default Select
