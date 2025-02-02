import { create } from 'zustand'
import { getServerSideProps, randonPrice } from '@/method/fn'
import { ICart } from '@/types/cart-type'
import { CoffeeData, CupcakeData } from '@/types/item-type'

interface ICartStore {
	coffeeData: CoffeeData[]
	cupcakeData: CupcakeData[]
	cartProducts: ICart[]
	fetchCoffe: (url: string) => void
	fetchCupcake: (url: string) => void
}

export const useProductCart = create<ICartStore>()((set, get) => ({
	coffeeData: [],
	cartProducts: [],
	cupcakeData: [],
	fetchCoffe: url => {
		getServerSideProps(url)
			.then(data => {
				const updatedData: CoffeeData[] = data.map((coffee: CoffeeData) => ({
					id: coffee.id,
					alt: coffee.alt,
					src: {
						medium: coffee.src.medium,
						portrait: coffee.src.portrait,
						landscape: coffee.src.landscape,
						tiny: coffee.src.tiny
					},
					category: 'Coffee',
					title: 'Cappuccino',
					size: ['small', 'medium', 'large'],
					quantity: {
						small: 0,
						medium: 1,
						large: 0
					},
					price: randonPrice(),
					rating: (Math.random() * 1 + 4).toFixed(1),
					totalPrice: 0
				}))
				set({
					coffeeData: updatedData
				})
			})
			.catch(err => console.log(err))
	},
	fetchCupcake: url => {
		getServerSideProps(url)
			.then(data => {
				const updatedData: CupcakeData[] = data.map((cupcake: CupcakeData) => ({
					id: cupcake.id,
					alt: cupcake.alt,
					src: {
						medium: cupcake.src.medium,
						portrait: cupcake.src.portrait,
						landscape: cupcake.src.landscape,
						tiny: cupcake.src.tiny
					},
					category: 'Cupcake',
					quantity: 1,
					title: 'Cupcake',
					price: Math.floor(Math.random() * 20) + 5,
					rating: (Math.random() * 1 + 4).toFixed(1),
					totalPrice: 0
				}))
				set({
					cupcakeData: updatedData
				})
			})
			.catch(err => console.log(err))
	}
}))
