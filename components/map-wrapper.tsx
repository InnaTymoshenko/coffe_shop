// components/MapWrapper.tsx
'use client'

import dynamic from 'next/dynamic'

const Map = dynamic(() => import('./location'), {
	ssr: false
})

export default Map
