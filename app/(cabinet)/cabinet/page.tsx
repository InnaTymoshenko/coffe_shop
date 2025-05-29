'use client'

import React from 'react'
import Shell from '@/components/ui/shell'
import { useAdminStore } from '@/store/admin-store'
import { useCurrentFormattedDateTime } from '@/utils/hook/useCurrentFormattedDateTime'

const AccountMainPage = () => {
	const { moskUser } = useAdminStore()
	const currentDateTime = useCurrentFormattedDateTime()

	return (
		<Shell className="container flex flex-col gap-8">
			<div className="w-full flex flex-col gap-4 justify-start items-start text-gray-200">
				<h1 className="text-3xl font-bold my-8">{`Hello, ${moskUser.firstName}!`}</h1>
				<p>{`Today is ${currentDateTime}`}</p>
			</div>
		</Shell>
	)
}

export default AccountMainPage
