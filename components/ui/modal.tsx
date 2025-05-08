import React from 'react'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	children: React.ReactNode
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
	if (!isOpen) return null

	return (
		<div
			className="w-full h-screen fixed top-0 left-0 z-50 flex justify-center items-center bg-gray-900/60"
			onClick={onClose}
		>
			<div onClick={e => e.stopPropagation()} className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
				{children}
			</div>
		</div>
	)
}
