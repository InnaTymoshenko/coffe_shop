import { create } from 'zustand'
import { generateRandomPrice, generateSpecialIngredient, getServerSideProps } from '@/method/fn'
import { ProductData, QuantityType, Size } from '@/types/item-type'

type CartItem = ProductData

interface ICartStore {
	coffeeData: ProductData[]
	cupcakeData: ProductData[]
	cartProducts: CartItem[]
	activeTab: 'coffee' | 'cupcake'
	setActiveTab: (value: 'coffee' | 'cupcake') => void
	fetchCoffe: (url: string) => void
	fetchCupcake: (url: string) => void
	addToCart: (item: ProductData, size: Size) => void
	updateQuantity: (item: ProductData, type: QuantityType, size: Size) => void
	updateCartQuantity: (itemId: number, size: Size, type: QuantityType) => void
}

export const useProductCart = create<ICartStore>()((set, get) => ({
	coffeeData: [],
	cupcakeData: [],
	cartProducts: [],
	activeTab: 'coffee',
	setActiveTab: value => set({ activeTab: value }),
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
						{ size: 'small', price: generateRandomPrice('small', 'Coffee'), quantity: 1, isChecked: false },
						{ size: 'medium', price: generateRandomPrice('medium', 'Coffee'), quantity: 1, isChecked: false },
						{ size: 'large', price: generateRandomPrice('large', 'Coffee'), quantity: 1, isChecked: false }
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
					price: [{ size: 'medium', price: generateRandomPrice('medium', 'Cake'), quantity: 1, isChecked: false }],

					rating: (Math.random() * 1 + 4).toFixed(1),
					totalPrice: 0
				}))
				set({
					cupcakeData: updatedData
				})
			})
			.catch((err: string) => console.log(err))
	},
	addToCart: (item: ProductData, size: Size) => {
		set(state => {
			const cart = state.cartProducts
			const isCoffee = item.category === 'Coffee'

			// Знаходимо товар у coffeeData або cupcakeData
			const productData = isCoffee
				? state.coffeeData.find(p => p.id === item.id)
				: state.cupcakeData.find(p => p.id === item.id)

			if (!productData) {
				console.error('Product not found in data')
				return state
			}

			// 🔹 Оновлюємо isChecked для вибраного розміру
			const updatedPrice = productData.price.map(priceObj =>
				priceObj.size === size
					? { ...priceObj, isChecked: true } // Встановлюємо isChecked: true для вибраного розміру
					: priceObj
			)

			// 🔹 Вибираємо тільки isChecked: true
			const selectedPrices = updatedPrice.filter(p => p.isChecked)

			if (selectedPrices.length === 0) {
				console.error('No selected size found')
				return state
			}

			// 🔹 Оновлюємо totalPrice тільки для isChecked: true
			const newTotalPrice = selectedPrices.reduce((sum, priceObj) => sum + priceObj.price * priceObj.quantity, 0)

			// 🔹 Перевіряємо, чи товар вже є у кошику
			const existingProductIndex = cart.findIndex(
				p => p.id === item.id && (isCoffee ? p.price.some(s => s.size === size) : true)
			)

			if (existingProductIndex !== -1) {
				const updatedCart = cart.map((p, index) => {
					if (index === existingProductIndex) {
						return {
							...p,
							price: p.price.map(priceObj =>
								priceObj.size === size
									? {
											...priceObj,
											quantity: priceObj.quantity + 1, // Збільшуємо кількість
											isChecked: true
									  }
									: priceObj
							),
							totalPrice: newTotalPrice
						}
					}
					return p
				})

				return { cartProducts: updatedCart }
			} else {
				const newProduct: ProductData = {
					...productData,
					price: selectedPrices, // Додаємо тільки ті price, де isChecked: true
					totalPrice: newTotalPrice
				}

				return { cartProducts: [...cart, newProduct] }
			}
		})
	},
	updateCartQuantity: (itemId, size, type) => {
		set(state => {
			const updatedCart = state.cartProducts
				.map(item => {
					if (item.id === itemId) {
						const updatedPrice = item.price
							.map(priceObj =>
								priceObj.size === size
									? {
											...priceObj,
											quantity: type === 'increment' ? priceObj.quantity + 1 : Math.max(0, priceObj.quantity - 1) // Мінімальна кількість 0
									  }
									: priceObj
							)
							.filter(priceObj => priceObj.quantity > 0) // Видаляємо тільки розміри, де quantity = 0

						// Якщо залишилися інші розміри, оновлюємо totalPrice
						if (updatedPrice.length > 0) {
							const newTotalPrice = updatedPrice.reduce((sum, priceObj) => sum + priceObj.price * priceObj.quantity, 0)

							return { ...item, price: updatedPrice, totalPrice: newTotalPrice }
						} else {
							return null // Якщо всі розміри видалені, видаляємо товар повністю
						}
					}
					return item
				})
				.filter((item): item is ProductData => item !== null) // Видаляємо `null` значення

			return { cartProducts: updatedCart }
		})
	},
	updateQuantity: (item, type, size) => {
		set(state => {
			const isCoffee = (product: ProductData): product is ProductData => product.category === 'Coffee'

			// Функція для оновлення кількості та totalPrice
			const updateProductData = (products: ProductData[]) =>
				products.map(p => {
					if (p.id === item.id) {
						if (isCoffee(p) && size) {
							const updatedPrice = p.price.map(priceObj =>
								priceObj.size === size
									? {
											...priceObj,
											quantity: type === 'increment' ? priceObj.quantity + 1 : Math.max(1, priceObj.quantity - 1),
											isChecked: true // Позначаємо, що розмір активний
									  }
									: priceObj
							)

							// Перераховуємо totalPrice тільки для isChecked: true
							const newTotalPrice = updatedPrice.reduce(
								(sum, priceObj) => (priceObj.isChecked ? sum + priceObj.price * priceObj.quantity : sum),
								0
							)

							return {
								...p,
								price: updatedPrice,
								totalPrice: newTotalPrice // Оновлюємо totalPrice
							}
						} else {
							const newQuantity = type === 'increment' ? p.price[0].quantity + 1 : Math.max(1, p.price[0].quantity - 1)
							const newTotalPrice = newQuantity * p.price[0].price

							return {
								...p,
								price: [{ ...p.price[0], quantity: newQuantity, isChecked: true }],
								totalPrice: newTotalPrice // Оновлюємо totalPrice
							}
						}
					}
					return p
				})

			return {
				coffeeData: updateProductData(state.coffeeData),
				cupcakeData: updateProductData(state.cupcakeData)
			}
		})
	}
}))
