import React from 'react'
import { Mosk_User } from '@/utils/moskUser'
import Shell from '@/components/ui/shell'

// type Props = {}

const AccountMainPage = () => {
	return (
		<Shell className="container flex flex-col gap-8 ">
			<h1 className="text-2xl font-bold mb-4">Привіт, {Mosk_User.firstName}!</h1>
			<p>Ваш email: {Mosk_User.email}</p>
		</Shell>
	)
}

export default AccountMainPage
