import React from 'react'

// type Props = {}

function MenuLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return <div className="w-full min-h-screen">{children}</div>
}

export default MenuLayout
