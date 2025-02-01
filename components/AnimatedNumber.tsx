'use client'

import React, { useEffect, useState, useRef } from 'react'

// type Props = {}

const AnimatedNumber = ({ targetValue }: { targetValue: number }) => {
	const [currentValue, setCurrentValue] = useState(0)
	const [isVisible, setIsVisible] = useState(false)
	const ref = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true)
					observer.disconnect()
				}
			},
			{ threshold: 0.5 }
		)

		if (ref.current) observer.observe(ref.current)

		return () => observer.disconnect()
	}, [])

	useEffect(() => {
		if (!isVisible) return

		let startValue = 0
		const duration = 2000
		const increment = targetValue / (duration / 50)
		const interval = setInterval(() => {
			startValue += increment
			if (startValue >= targetValue) {
				clearInterval(interval)
				setCurrentValue(targetValue)
			} else {
				setCurrentValue(Math.ceil(startValue))
			}
		}, 50)

		return () => clearInterval(interval)
	}, [isVisible, targetValue])

	return (
		<div ref={ref}>
			<span>{`${currentValue} +`}</span>
		</div>
	)
}

export default AnimatedNumber
