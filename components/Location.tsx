/* eslint-disable @next/next/no-img-element */
'use client'

import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import Shell from './ui/shell'
import fakeLocation from '@/fakedata/location.json'
import { LocationData } from '@/types/location-type'
import Select from './ui/select'

const customIcon = L.icon({
	iconUrl: '/marker-icon.png',
	shadowUrl: '/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34]
})

const ChangeMapCenter = ({ lat, lng }: { lat: number; lng: number }) => {
	const map = useMap()
	useEffect(() => {
		map.setView([lat, lng], 13, { animate: true })
	}, [lat, lng, map])
	return null
}

const Location = () => {
	const [cafes, setCafes] = useState<LocationData[]>([])
	const [selectedCafe, setSelectedCafe] = useState(cafes[0])

	const cafeOptions = cafes.map(cafe => ({
		value: cafe.id,
		label: `${cafe.name} - ${cafe.address}`
	}))

	useEffect(() => {
		const cafes = fakeLocation as LocationData[]
		setCafes(cafes)
		setSelectedCafe(cafes[0])
	}, [])

	const handleLocationChange = (value: string) => {
		const cafe = cafes.find(c => c.id === value)
		if (cafe) setSelectedCafe(cafe)
	}

	return (
		<div id="location" className="w-full  flex bg-gray-900 flex-col gap-8 justify-start py-8 mb-4">
			<Shell className="container flex flex-col gap-4 justify-between items-start">
				<h2 className="text-2xl text-white">Choose a Location</h2>
				<div className="w-full flex lg:flex-row sm:flex-col justify-between items-center gap-4">
					<div className="lg:w-[45%] sm:w-full lg:h-full sm:h-[400px] flex flex-col justify-between items-start gap-4 pl-8">
						{cafes.length > 0 && (
							<Select
								options={cafeOptions}
								value={selectedCafe.id}
								onChange={handleLocationChange}
								className="p-2 border border-gray-400 rounded-sm focus:outline-none"
							/>
						)}
						{cafes.length > 0 && (
							<MapContainer
								center={[selectedCafe.lat, selectedCafe.lng] as [number, number]}
								zoom={13}
								className="w-[500px] h-[400px] rounded-lg mt-12"
							>
								<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
								<Marker position={[selectedCafe.lat, selectedCafe.lng]} icon={customIcon}>
									<Popup>{selectedCafe.name}</Popup>
								</Marker>
								<ChangeMapCenter lat={selectedCafe.lat} lng={selectedCafe.lng} />
							</MapContainer>
						)}
					</div>
					<div className="lg:w-[45%] sm:w-full h-[600px] overflow-hidden">
						{cafes.length > 0 && (
							<img
								src={selectedCafe.img}
								alt={selectedCafe.name}
								className="w-full h-full rounded-sm object-center object-cover"
							/>
						)}
					</div>
				</div>
			</Shell>
		</div>
	)
}

export default Location
