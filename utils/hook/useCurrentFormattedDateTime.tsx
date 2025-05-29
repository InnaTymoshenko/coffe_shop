import { useEffect, useState } from 'react'
import { formatDateTime } from '../fn'

export function useCurrentFormattedDateTime(): string {
	const [formattedNow, setFormattedNow] = useState('')

	useEffect(() => {
		const updateDateTime = () => {
			const now = new Date()
			const dateStr = now.toLocaleDateString('uk-UA')
			const timeStr = now.toTimeString().slice(0, 8)
			setFormattedNow(formatDateTime(dateStr, timeStr))
		}

		updateDateTime()

		const interval = setInterval(updateDateTime, 60_000)
		return () => clearInterval(interval)
	}, [])

	return formattedNow
}
