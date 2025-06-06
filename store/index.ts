import { create } from 'zustand'
import fakeCoffeeData from '@/fakedata/coffeeData.json'
import fakeCupcakeData from '@/fakedata/cupcakeData.json'
// import { generateRandomPrice, generateSpecialIngredient, getServerSideProps } from '@/utils/fn'
import { ProductData, QuantityType, Size } from '@/types/item-type'

type CartItem = ProductData

interface ICartStore {
	coffeeData: ProductData[]
	cupcakeData: ProductData[]
	cartProducts: CartItem[]
	activeTab: 'coffee' | 'cupcake'
	isShow: boolean
	openCart: boolean
	setOpenCart: (value: boolean) => void
	setIsShow: (value: boolean) => void
	setActiveTab: (value: 'coffee' | 'cupcake') => void
	// fetchCoffe: (url: string) => void
	// fetchCupcake: (url: string) => void
	addToCart: (item: ProductData, size: Size) => void
	updateQuantity: (item: ProductData, type: QuantityType, size: Size) => void
	updateCartQuantity: (itemId: string, size: Size, type: QuantityType) => void
}

export const useProductCart = create<ICartStore>()(set => ({
	coffeeData: fakeCoffeeData as ProductData[],
	cupcakeData: fakeCupcakeData as ProductData[],
	cartProducts: [],
	activeTab: 'coffee',
	isShow: false,
	openCart: false,
	setOpenCart: value => set({ openCart: value }),
	setIsShow: value => set({ isShow: value }),
	setActiveTab: value => set({ activeTab: value }),
	// fetchCoffe: url => {
	// 	getServerSideProps(url)
	// 		.then(data => {
	// 			const updatedData: ProductData[] = data.map((coffee: ProductData) => ({
	// 				id: coffee.id.toString(),
	// 				alt: coffee.alt,
	// 				src: {
	// 					medium: coffee.src.medium,
	// 					portrait: coffee.src.portrait,
	// 					landscape: coffee.src.landscape,
	// 					tiny: coffee.src.tiny
	// 				},
	// 				category: 'Coffee',
	// 				ingridients: [generateSpecialIngredient('Coffee')],
	// 				title: 'Cappuccino',
	// 				price: [
	// 					{ size: 'small', price: generateRandomPrice('small', 'Coffee'), quantity: 1, isChecked: false },
	// 					{ size: 'medium', price: generateRandomPrice('medium', 'Coffee'), quantity: 1, isChecked: false },
	// 					{ size: 'large', price: generateRandomPrice('large', 'Coffee'), quantity: 1, isChecked: false }
	// 				],
	// 				rating: (Math.random() * 1 + 4).toFixed(1),
	// 				totalPrice: 0
	// 			}))
	// 			set({
	// 				coffeeData: updatedData
	// 			})
	// 		})
	// 		.catch((err: string) => console.log(err))
	// },
	// fetchCupcake: url => {
	// 	getServerSideProps(url)
	// 		.then(data => {
	// 			const updatedData: ProductData[] = data.map((cupcake: ProductData) => ({
	// 				id: cupcake.id,
	// 				alt: cupcake.alt,
	// 				src: {
	// 					medium: cupcake.src.medium,
	// 					portrait: cupcake.src.portrait,
	// 					landscape: cupcake.src.landscape,
	// 					tiny: cupcake.src.tiny
	// 				},
	// 				category: 'Cupcake',
	// 				ingridients: [generateSpecialIngredient('Cupcake')],
	// 				title: 'Cupcake',
	// 				price: [{ size: 'medium', price: generateRandomPrice('medium', 'Cake'), quantity: 1, isChecked: false }],

	// 				rating: (Math.random() * 1 + 4).toFixed(1),
	// 				totalPrice: 0
	// 			}))
	// 			set({
	// 				cupcakeData: updatedData
	// 			})
	// 		})
	// 		.catch((err: string) => console.log(err))
	// },
	// addToCart: (item: ProductData, size: Size) => {
	// 	set(state => {
	// 		const cart = state.cartProducts
	// 		const isCoffee = item.category === 'Coffee'
	// 		const productData = isCoffee
	// 			? state.coffeeData.find(p => p.id === item.id)
	// 			: state.cupcakeData.find(p => p.id === item.id)
	// 		if (!productData) {
	// 			console.error('Product not found in data')
	// 			return state
	// 		}
	// 		const updatedPrice = productData.price.map(priceObj =>
	// 			priceObj.size === size ? { ...priceObj, isChecked: true } : priceObj
	// 		)
	// 		const selectedPrices = updatedPrice.filter(p => p.isChecked)
	// 		if (selectedPrices.length === 0) {
	// 			console.error('No selected size found')
	// 			return state
	// 		}
	// 		const newTotalPrice = selectedPrices.reduce((sum, priceObj) => sum + priceObj.price * priceObj.quantity, 0)
	// 		const existingProductIndex = cart.findIndex(p => p.id === item.id)
	// 		if (existingProductIndex !== -1) {
	// 			const updatedCart = cart.map((p, index) => {
	// 				if (index === existingProductIndex) {
	// 					const existingSize = p.price.find(pr => pr.size === size)
	// 					let updatedPriceArray
	// 					if (existingSize) {
	// 						updatedPriceArray = p.price.map(pr =>
	// 							pr.size === size ? { ...pr, quantity: pr.quantity + 1, isChecked: true } : pr
	// 						)
	// 					} else {
	// 						updatedPriceArray = [...p.price, ...selectedPrices]
	// 					}

	// 					const updatedTotalPrice = updatedPriceArray.reduce((sum, pr) => sum + pr.price * pr.quantity, 0)

	// 					return {
	// 						...p,
	// 						price: updatedPriceArray,
	// 						totalPrice: updatedTotalPrice
	// 					}
	// 				}
	// 				return p
	// 			})

	// 			return { cartProducts: updatedCart }
	// 		} else {
	// 			const newProduct: ProductData = {
	// 				...productData,
	// 				price: selectedPrices,
	// 				totalPrice: newTotalPrice
	// 			}

	// 			return { cartProducts: [...cart, newProduct] }
	// 		}
	// 	})
	// },
	addToCart: (item: ProductData, size: Size) => {
		set(state => {
			const cart = [...state.cartProducts]
			const isCoffee = item.category === 'Coffee'
			const sourceData = isCoffee ? state.coffeeData : state.cupcakeData
			const productData = sourceData.find(p => p.id === item.id)

			if (!productData) {
				console.error('Product not found in data')
				return state
			}

			// Підготовка ціни з встановленням isChecked і quantity
			const updatedPrice = productData.price.map(priceObj => ({
				...priceObj,
				isChecked: priceObj.size === size,
				quantity: priceObj.quantity ?? 1
			}))

			const selectedPrices = updatedPrice.filter(p => p.isChecked)
			if (selectedPrices.length === 0) {
				console.error('No selected size found')
				return state
			}

			const newTotalPrice = selectedPrices.reduce((sum, p) => sum + p.price * p.quantity, 0)
			const existingIndex = cart.findIndex(p => p.id === item.id)

			// Якщо товар вже є в кошику
			if (existingIndex !== -1) {
				const existingProduct = cart[existingIndex]

				// Оновлюємо ціну (або додаємо новий розмір)
				const updatedPriceArray = [...existingProduct.price]
				const existingSizeIndex = updatedPriceArray.findIndex(p => p.size === size)

				if (existingSizeIndex !== -1) {
					// Збільшуємо кількість для існуючого розміру
					updatedPriceArray[existingSizeIndex] = {
						...updatedPriceArray[existingSizeIndex],
						quantity: updatedPriceArray[existingSizeIndex].quantity + 1,
						isChecked: true
					}
				} else {
					// Додаємо новий розмір
					updatedPriceArray.push(...selectedPrices)
				}

				const updatedTotal = updatedPriceArray.reduce((sum, p) => sum + p.price * p.quantity, 0)

				cart[existingIndex] = {
					...existingProduct,
					price: updatedPriceArray,
					totalPrice: updatedTotal
				}
			} else {
				// Додаємо новий товар до кошика
				const newProduct: ProductData = {
					...productData,
					price: selectedPrices,
					totalPrice: newTotalPrice
				}
				cart.push(newProduct)
			}

			return { cartProducts: cart }
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
											quantity: type === 'increment' ? priceObj.quantity + 1 : Math.max(0, priceObj.quantity - 1)
									  }
									: priceObj
							)
							.filter(priceObj => priceObj.quantity > 0)
						if (updatedPrice.length > 0) {
							const newTotalPrice = updatedPrice.reduce((sum, priceObj) => sum + priceObj.price * priceObj.quantity, 0)
							return { ...item, price: updatedPrice, totalPrice: newTotalPrice }
						} else {
							return null
						}
					}
					return item
				})
				.filter((item): item is ProductData => item !== null)
			return { cartProducts: updatedCart }
		})
	},
	updateQuantity: (item, type, size) => {
		set(state => {
			const isCoffee = (product: ProductData): product is ProductData => product.category === 'Coffee'
			const updateProductData = (products: ProductData[]) =>
				products.map(p => {
					if (p.id === item.id) {
						if (isCoffee(p) && size) {
							const updatedPrice = p.price.map(priceObj =>
								priceObj.size === size
									? {
											...priceObj,
											quantity: type === 'increment' ? priceObj.quantity + 1 : Math.max(1, priceObj.quantity - 1),
											isChecked: true
									  }
									: priceObj
							)
							const newTotalPrice = updatedPrice.reduce(
								(sum, priceObj) => (priceObj.isChecked ? sum + priceObj.price * priceObj.quantity : sum),
								0
							)
							return {
								...p,
								price: updatedPrice,
								totalPrice: newTotalPrice
							}
						} else {
							const newQuantity = type === 'increment' ? p.price[0].quantity + 1 : Math.max(1, p.price[0].quantity - 1)
							const newTotalPrice = newQuantity * p.price[0].price

							return {
								...p,
								price: [{ ...p.price[0], quantity: newQuantity, isChecked: true }],
								totalPrice: newTotalPrice
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
