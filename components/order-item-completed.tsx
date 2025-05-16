import { OrderData } from '@/types/order-type'
import React, { useState } from 'react'

type Props = {
	order: OrderData
}

const OrderItemCompleted = ({ order }: Props) => {
	const [isReady, setIsReady] = useState(false)

	return (
		<div>
			<input type="checkbox" checked={order.status === 'completed' || isReady} onChange={() => setIsReady(true)} />
		</div>
	)
}

export default OrderItemCompleted
