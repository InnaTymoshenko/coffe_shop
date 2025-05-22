import React from 'react'

type Props = {
	text: string
	className?: string
}

const AnimatedButton = ({ text, className }: Props) => {
	return (
		<div
			className={`${className} absolute top-0 left-0 z-10 flex h-[200%] flex-col items-center justify-start gap-4 transition-all duration-500`}
		>
			<span>{text}</span>
			<span>{text}</span>
		</div>
	)
}

export default AnimatedButton
