import { API_KEY } from '@/config'

export async function getServerSideProps(url: string) {
	const res = await fetch(url, {
		method: 'GET',
		headers: {
			Authorization: API_KEY
		}
	})
	const data = await res.json()

	return data.photos
}

export const randonPrice = () => {
	const basePrice = Math.floor(Math.random() * 6) + 5
	const price = {
		small: basePrice, // Найменша ціна
		medium: basePrice + Math.floor(Math.random() * 3) + 2,
		large: basePrice + Math.floor(Math.random() * 5) + 6
	}

	return price
}
