import React from 'react'
import { Mosk_User } from '@/utils/moskUser'
import Shell from '@/components/ui/shell'

// type Props = {}

const AccountMainPage = () => {
	return (
		<Shell className="container flex flex-col gap-8">
			<div className="w-full flex flex-col gap-4 justify-start items-start text-gray-200">
				<h1 className="text-3xl font-bold my-8">Привіт, {Mosk_User.firstName}!</h1>
				<p>Ваш email: {Mosk_User.email}</p>
			</div>
		</Shell>
	)
}

export default AccountMainPage
