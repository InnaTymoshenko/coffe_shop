interface IPHOTO {
	medium: string
	portrait: string
	landscape: string
}

interface ISIZE {
	small: number
	medium: number
	large: number
}

export interface DATA {
	id: number
	alt: string
	src: IPHOTO
	category: string
	price: ISIZE
	title: string
	rating: number
}

// export interface CUPCAKE_DATA {
// 	id: number
// 	alt: string
// 	src: IPHOTO
// 	category: string
// 	price: number
// 	title: string
// 	rating: number
// }
