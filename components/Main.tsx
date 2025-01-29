'use client'

import React, { useEffect, useState } from 'react'
import Card from './Card'
import { API_KEY } from '@/config/index'
import { DATA } from '@/types/item-type'

const Main = () => {
	// Замініть на свій ключ
	const query1 = 'coffee'
	const url1 = `https://api.pexels.com/v1/search?query=${query1}&per_page=10`
	const query2 = 'cupcake'
	const url2 = `https://api.pexels.com/v1/search?query=${query2}&per_page=10`

	const [coffees, setCoffees] = useState<DATA[]>()
	const [cupcakes, setCupcakes] = useState<DATA[]>()

	useEffect(() => {
		fetch(url1, {
			method: 'GET',
			headers: {
				Authorization: API_KEY
			}
		})
			.then(res => res.json())
			.then(data => {
				console.log(data)
				setCoffees(data.photos)
			})
			.catch(err => console.log(err))
	}, [url1])

	useEffect(() => {
		fetch(url2, {
			method: 'GET',
			headers: {
				Authorization: API_KEY
			}
		})
			.then(res => res.json())
			.then(data => {
				console.log(data)
				setCupcakes(data.photos)
			})
			.catch(err => console.log(err))
	}, [url2])

	return (
		<div className="w-full flex flex-col gap-8 justify-center">
			<div className="w-[80%] flex flex-col flex-wrap gap-4 justify-center items-center m-auto">
				<h2>Coffee</h2>
				{coffees && <Card items={coffees} />}
			</div>
			<div className="w-[80%] flex flex-col flex-wrap gap-4 justify-center items-center m-auto">
				<h2>Cupcake</h2>
				{cupcakes && <Card items={cupcakes} />}
			</div>
		</div>
	)
}

export default Main
