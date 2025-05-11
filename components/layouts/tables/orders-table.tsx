import { OrderData } from '@/types/order-type'
import React from 'react'

type OrdersProps = {
	data: OrderData[]
}

const OrdersTable = ({ data }: OrdersProps) => {
	return (
		<>
			<div className="overflow-x-auto mt-4">
				<table className="min-w-full border-collapse">
					<thead>
						<tr className="border-b border-gray-300 hover:bg-gray-100">
							<th className="p-2">№</th>
							<th className="p-2">Line</th>
							<th className="p-2">ID orders</th>
							<th className="p-2">Data/Time</th>
							<th className="p-2">Details</th>
							<th className="p-2">Cafe</th>
							<th className="p-2">Status</th>
							<th className="p-2">Ready</th>
						</tr>
					</thead>
					<tbody>
						{data.map((d, ind) => (
							<tr key={d.id} className={`text-center border-b border-gray-300 hover:bg-gray-100`}>
								<td className="p-4">{`#${ind + 1}`}</td>
								<td className="p-4">{d.numberInLine}</td>
								<td className="p-4 text-lg font-medium text-left">{d.id}</td>
								<td className="p-4 flex flex-col justify-center items-center gap-1">
									<span>{d.createdDateAt}/</span>
									<span>{d.createdTimeAt}</span>
								</td>
								<td className="p-4">{d.type}</td>
								<td className="p-4">{d.type === 'in-place' && 'placeName' in d.details ? d.details.placeName : ''}</td>
								<td className="p-4">{d.status}</td>
								<td className="p-4">
									<input type="checkbox" />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	)
}

export default OrdersTable
