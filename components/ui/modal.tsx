import React from 'react'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	children: React.ReactNode
	className: string
	variant?: 'default' | 'editing'
}

const variantClasses = {
	default: 'bg-gray-200 p-6 rounded-lg shadow-lg max-w-3xl w-full',
	editing: 'fixed top-0 right-0 w-[600px] h-full'
}

export const Modal = ({ isOpen, onClose, children, variant = 'default', className }: ModalProps) => {
	const style = variantClasses[variant] || variantClasses.default
	if (!isOpen) return null

	return (
		<div className={`w-full h-screen fixed top-0 left-0 z-50 flex ${className} bg-gray-900/60`} onClick={onClose}>
			<div onClick={e => e.stopPropagation()} className={`${style}`}>
				{children}
			</div>
		</div>
	)
}
