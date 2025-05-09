import { create } from 'zustand'
import { ProductData } from '@/types/item-type'
import fakeCoffeeData from '@/fakedata/coffeeData.json'
import fakeCupcakeData from '@/fakedata/cupcakeData.json'
import fakePromotions from '@/fakedata/promotions.json'
import { PromotionData } from '@/types/promotion-type'

interface IAdminStore {
	isAdmin: boolean
	coffeeData: ProductData[]
	cupcakeData: ProductData[]
	promotionsData: PromotionData[]
	addProduct: (item: ProductData) => void
	editCardProduct: (item: ProductData) => void
	deleteProduct: (id: string) => void
	addPromotions: (item: PromotionData) => void
	editPromotions: (item: PromotionData) => void
	deletePromotions: (id: string) => void
}

export const useAdminStore = create<IAdminStore>()((set, get) => ({
	isAdmin: true,
	coffeeData: fakeCoffeeData as ProductData[],
	cupcakeData: fakeCupcakeData as ProductData[],
	promotionsData: fakePromotions as PromotionData[],
	addProduct: item => {
		const { coffeeData, cupcakeData } = get()

		if (item.category === 'Coffee') {
			set({ coffeeData: [item, ...coffeeData] })
		} else if (item.category === 'Cupcake') {
			set({ cupcakeData: [item, ...cupcakeData] })
		}
	},
	editCardProduct: (item: ProductData) => {
		const { coffeeData, cupcakeData } = get()

		const updateCoffeeData = coffeeData.map(coffee => (coffee.id === item.id ? { ...coffee, ...item } : coffee))

		const updateCupcakeData = cupcakeData.map(cupcake => (cupcake.id === item.id ? { ...cupcake, ...item } : cupcake))

		set({
			coffeeData: updateCoffeeData,
			cupcakeData: updateCupcakeData
		})
	},
	deleteProduct: id => {
		const { coffeeData, cupcakeData } = get()
		const updateCoffeeData = coffeeData.filter(item => item.id !== id)
		const updateCupcakeData = cupcakeData.filter(item => item.id !== id)
		set({
			coffeeData: updateCoffeeData,
			cupcakeData: updateCupcakeData
		})
	},
	addPromotions: item => {
		const { promotionsData } = get()
		set({
			promotionsData: [item, ...promotionsData]
		})
	},
	editPromotions: item => {
		const { promotionsData } = get()
		const updatePromotionData = promotionsData.map(promotion =>
			promotion.id === item.id ? { ...promotion, ...item } : promotion
		)
		set({
			promotionsData: updatePromotionData
		})
	},
	deletePromotions: id => {
		const { promotionsData } = get()
		const updatePromotionData = promotionsData.filter(item => item.id !== id)
		set({
			promotionsData: updatePromotionData
		})
	}
}))
