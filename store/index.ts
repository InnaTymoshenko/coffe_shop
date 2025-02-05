import { create } from 'zustand'
import { generateRandomPrice, generateSpecialIngredient, getServerSideProps } from '@/method/fn'
import { ProductData, CupcakeData } from '@/types/item-type'

type CartItem = ProductData

interface ICartStore {
	coffeeData: ProductData[]
	cupcakeData: ProductData[]
	cartProducts: CartItem[]
	fetchCoffe: (url: string) => void
	fetchCupcake: (url: string) => void
	addToCart: (item: CartItem) => void
	updateQuantity: (item: ProductData, type: string, size: string) => void
}

export const useProductCart = create<ICartStore>()((set, get) => ({
	coffeeData: [],
	cartProducts: [],
	cupcakeData: [],
	fetchCoffe: url => {
		getServerSideProps(url)
			.then(data => {
				const updatedData: ProductData[] = data.map((coffee: ProductData) => ({
					id: coffee.id,
					alt: coffee.alt,
					src: {
						medium: coffee.src.medium,
						portrait: coffee.src.portrait,
						landscape: coffee.src.landscape,
						tiny: coffee.src.tiny
					},
					category: 'Coffee',
					ingridients: generateSpecialIngredient('Coffee'),
					title: 'Cappuccino',
					price: [
						{ size: 'small', price: generateRandomPrice('small', 'Coffee'), quantity: 1 },
						{ size: 'medium', price: generateRandomPrice('medium', 'Coffee'), quantity: 1 },
						{ size: 'large', price: generateRandomPrice('large', 'Coffee'), quantity: 1 }
					],
					rating: (Math.random() * 1 + 4).toFixed(1),
					totalPrice: 0
				}))
				set({
					coffeeData: updatedData
				})
			})
			.catch((err: string) => console.log(err))
	},
	fetchCupcake: url => {
		getServerSideProps(url)
			.then(data => {
				const updatedData: ProductData[] = data.map((cupcake: ProductData) => ({
					id: cupcake.id,
					alt: cupcake.alt,
					src: {
						medium: cupcake.src.medium,
						portrait: cupcake.src.portrait,
						landscape: cupcake.src.landscape,
						tiny: cupcake.src.tiny
					},
					category: 'Cupcake',
					ingridients: generateSpecialIngredient('Cupcake'),
					title: 'Cupcake',
					price: [{ size: 'medium', price: generateRandomPrice('medium', 'Cake'), quantity: 1 }],

					rating: (Math.random() * 1 + 4).toFixed(1),
					totalPrice: 0
				}))
				set({
					cupcakeData: updatedData
				})
			})
			.catch((err: string) => console.log(err))
	},
	addToCart: item => {
		console.log(item)
	},
	updateQuantity: (item, type, size) => {
		set(state => {
			const cart = state.cartProducts

			const isCoffee = (product: ProductData): product is ProductData => product.category === 'Coffee'

			// 🔹 Функція оновлення `quantity` та `totalPrice`
			const updateProductData = (products: ProductData[]) =>
				products.map(p => {
					if (p.id === item.id) {
						if (isCoffee(p) && size) {
							// Оновлюємо кількість у конкретному розмірі кави
							const updatedPrice = p.price.map(priceObj =>
								priceObj.size === size
									? {
											...priceObj,
											quantity: type === 'increment' ? priceObj.quantity + 1 : Math.max(1, priceObj.quantity - 1)
									  }
									: priceObj
							)

							// 🔹 Перераховуємо totalPrice для всіх розмірів кави
							const newTotalPrice = updatedPrice.reduce((sum, priceObj) => sum + priceObj.price * priceObj.quantity, 0)

							return {
								...p,
								price: updatedPrice,
								totalPrice: newTotalPrice // Оновлюємо totalPrice
							}
						} else {
							// 🔹 Оновлюємо кейки
							const newQuantity = type === 'increment' ? p.price[0].quantity + 1 : Math.max(1, p.price[0].quantity - 1)
							const newTotalPrice = newQuantity * p.price[0].price

							return {
								...p,
								price: [{ ...p.price[0], quantity: newQuantity }],
								totalPrice: newTotalPrice // Оновлюємо totalPrice
							}
						}
					}
					return p
				})

			// 🔹 Оновлюємо cartProducts
			const updatedCart = cart.map(p => {
				if (p.id === item.id) {
					if (isCoffee(p) && size) {
						const updatedPrice = p.price.map(priceObj =>
							priceObj.size === size
								? {
										...priceObj,
										quantity: type === 'increment' ? priceObj.quantity + 1 : Math.max(1, priceObj.quantity - 1)
								  }
								: priceObj
						)

						// 🔹 Перераховуємо totalPrice
						const newTotalPrice = updatedPrice.reduce((sum, priceObj) => sum + priceObj.price * priceObj.quantity, 0)

						return {
							...p,
							price: updatedPrice,
							totalPrice: newTotalPrice // Оновлюємо totalPrice
						}
					} else {
						// 🔹 Оновлюємо кейки
						const newQuantity = type === 'increment' ? p.price[0].quantity + 1 : Math.max(1, p.price[0].quantity - 1)
						const newTotalPrice = newQuantity * p.price[0].price

						return {
							...p,
							price: [{ ...p.price[0], quantity: newQuantity }],
							totalPrice: newTotalPrice // Оновлюємо totalPrice
						}
					}
				}
				return p
			})

			return {
				cartProducts: updatedCart,
				coffeeData: updateProductData(state.coffeeData),
				cupcakeData: updateProductData(state.cupcakeData)
			}
		})
	}
}))
