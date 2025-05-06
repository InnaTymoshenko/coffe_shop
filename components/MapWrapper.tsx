// components/MapWrapper.tsx
'use client'

import dynamic from 'next/dynamic'

const Map = dynamic(() => import('./Location'), {
	ssr: false
})

export default Map
