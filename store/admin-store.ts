import { create } from 'zustand'
import { ProductData, Size } from '@/types/item-type'
import fakeCoffeeData from '@/fakedata/coffeeData.json'
import fakeCupcakeData from '@/fakedata/cupcakeData.json'

interface IAdminStore {
	isAdmin: boolean
	coffeeData: ProductData[]
	cupcakeData: ProductData[]
	addProduct: (item: ProductData) => void
	editCardProduct: (item: ProductData) => void
	deleteProduct: (id: number) => void
}

export const useAdminStore = create<IAdminStore>()((set, get) => ({
	isAdmin: true,
	coffeeData: fakeCoffeeData as ProductData[],
	cupcakeData: fakeCupcakeData as ProductData[],
	addProduct: item => {
		const { coffeeData, cupcakeData } = get()

		if (item.category === 'Coffee') {
			set({ coffeeData: [...coffeeData, item] })
		} else if (item.category === 'Cupcake') {
			set({ cupcakeData: [...cupcakeData, item] })
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
	}
}))
