import { create } from 'zustand'
import { ProductData } from '@/types/item-type'
import fakeCoffeeData from '@/fakedata/coffeeData.json'
import fakeCupcakeData from '@/fakedata/cupcakeData.json'
import fakeCafesDate from '@/fakedata/location.json'
import fakePromotions from '@/fakedata/promotions.json'
import fakeUsersData from '@/fakedata/users.json'
import fakeOrderData from '@/fakedata/orderData.json'
import { PromotionData } from '@/types/promotion-type'
import { LocationData } from '@/types/location-type'
import { UserProfile } from '@/types/users-type'
import { OrderData } from '@/types/order-type'
import { MockUser } from '@/utils/mockUser'
import { persist } from 'zustand/middleware'

interface IAdminStore {
	isAdmin: boolean
	isUser: boolean
	coffeeData: ProductData[]
	cupcakeData: ProductData[]
	promotionsData: PromotionData[]
	cafesData: LocationData[]
	usersData: UserProfile[]
	ordersData: OrderData[]
	mockUser: UserProfile
	discountedProduct: ProductData | null
	setDiscountedProduct: (product: ProductData) => void
	editMockUser: (item: UserProfile) => void
	editOrder: (item: OrderData) => void
	editUser: (item: UserProfile) => void
	editCafe: (item: LocationData) => void
	addNewCafe: (item: LocationData) => void
	addProduct: (item: ProductData) => void
	editCardProduct: (item: ProductData) => void
	deleteProduct: (id: string) => void
	addPromotions: (item: PromotionData) => void
	editPromotions: (item: PromotionData) => void
	deletePromotions: (id: string) => void
}

export const useAdminStore = create<IAdminStore>()(
	persist(
		(set, get) => ({
			isAdmin: true,
			isUser: true,
			coffeeData: fakeCoffeeData as ProductData[],
			cupcakeData: fakeCupcakeData as ProductData[],
			promotionsData: fakePromotions as PromotionData[],
			cafesData: fakeCafesDate as LocationData[],
			usersData: fakeUsersData as UserProfile[],
			ordersData: fakeOrderData as OrderData[],
			mockUser: MockUser,
			discountedProduct: null,
			setDiscountedProduct: product => set({ discountedProduct: product }),
			editMockUser: item => set({ mockUser: item }),
			editOrder: item => {
				const { ordersData } = get()
				const updatedOrder = ordersData.map(order => (order.id === item.id ? { ...order, ...item } : order))
				set({
					ordersData: updatedOrder
				})
			},
			editCafe: item => {
				const { cafesData } = get()
				const updatedCafes = cafesData.map(cafe => (cafe.id === item.id ? { ...cafe, ...item } : cafe))
				set({
					cafesData: updatedCafes
				})
			},
			editUser: item => {
				const { usersData } = get()
				const upratedUser = usersData.map(user => (user.id === item.id ? { ...user, ...item } : user))
				set({
					usersData: upratedUser
				})
			},
			addNewCafe: item => {
				const { cafesData } = get()
				set({
					cafesData: [item, ...cafesData]
				})
			},
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
				const updateCupcakeData = cupcakeData.map(cupcake =>
					cupcake.id === item.id ? { ...cupcake, ...item } : cupcake
				)
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
		}),
		{
			name: 'admin-store'
		}
	)
)
