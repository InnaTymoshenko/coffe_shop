/* eslint-disable @next/next/no-img-element */
'use client'

import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import Shell from './ui/Shell'

const customIcon = L.icon({
	iconUrl: '/marker-icon.png',
	shadowUrl: '/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34]
})

// Список кафе
const cafes = [
	{
		id: 1,
		name: 'Coffee Town - Хрещатик',
		address: 'Хрещатик, 22, Київ, Україна',
		lat: 50.4471,
		lng: 30.5225,
		img: '/assets/cafe1.jpg'
	},
	{
		id: 2,
		name: 'Coffee Town - Поділ',
		address: 'Сагайдачного, 25, Київ, Україна',
		lat: 50.4637,
		lng: 30.5166,
		img: '/assets/cafe2.jpg'
	},
	{
		id: 3,
		name: 'Coffee Town - Оболонь',
		address: 'Оболонський проспект, 20, Київ, Україна',
		lat: 50.507,
		lng: 30.4982,
		img: '/assets/cafe3.jpg'
	}
]

const ChangeMapCenter = ({ lat, lng }: { lat: number; lng: number }) => {
	const map = useMap()
	useEffect(() => {
		map.setView([lat, lng], 13, { animate: true })
	}, [lat, lng, map])
	return null
}

const Location = () => {
	const [selectedCafe, setSelectedCafe] = useState(cafes[0])

	const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const cafe = cafes.find(c => c.id === Number(event.target.value))
		if (cafe) setSelectedCafe(cafe)
	}

	return (
		<>
			<div className="w-full  flex bg-gray-900 flex-col gap-8 justify-start py-8">
				<Shell className="container flex flex-col gap-4 justify-between items-start">
					<h2 className="text-2xl text-white">Choose a Location</h2>
					<div className="w-full flex justify-between items-center gap-4">
						<div className="w-[45%] h-full flex flex-col justify-between items-center gap-4">
							<select
								className="p-2 border border-gray-400 rounded-md focus:outline-none"
								onChange={handleLocationChange}
								value={selectedCafe.id}
							>
								{cafes.map(cafe => (
									<option key={cafe.id} value={cafe.id}>
										{cafe.name} - {cafe.address}
									</option>
								))}
							</select>
							<MapContainer
								center={[selectedCafe.lat, selectedCafe.lng] as [number, number]}
								zoom={13}
								className="w-[500px] h-[400px] rounded-md mt-12"
							>
								<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
								<Marker position={[selectedCafe.lat, selectedCafe.lng]} icon={customIcon}>
									<Popup>{selectedCafe.name}</Popup>
								</Marker>
								<ChangeMapCenter lat={selectedCafe.lat} lng={selectedCafe.lng} />
							</MapContainer>
						</div>

						<div className="w-[45%] h-[600px] overflow-hidden">
							<img
								src={selectedCafe.img}
								alt={selectedCafe.name}
								className="w-full h-full rounded-sm object-center object-cover"
							/>
						</div>
					</div>
				</Shell>
			</div>
		</>
	)
}

export default Location
