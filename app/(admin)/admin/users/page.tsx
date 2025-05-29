'use client'

import React, { useState } from 'react'
import Shell from '@/components/ui/shell'
import UsersTable from '@/components/layouts/tables/users-table'
import { useAdminStore } from '@/store/admin-store'
import { Button } from '@/components/ui/button'
import Select from '@/components/ui/select'

const roleOptions = [
	{ value: '', label: 'All' },
	{ value: 'user', label: 'User' },
	{ value: 'admin', label: 'Admin' }
]

const userStatusOptions = [
	{ value: '', label: 'All' },
	{ value: 'active', label: 'Active' },
	{ value: 'inactive', label: 'Inactive' },
	{ value: 'banned', label: 'Banned' }
]

const UsersPage = () => {
	const { usersData } = useAdminStore()
	const [search, setSearch] = useState('')
	const [roleFilter, setRoleFilter] = useState('')
	const [statusFilter, setStatusFilter] = useState('')
	const [minOrders, setMinOrders] = useState('')
	const [createdAfter, setCreatedAfter] = useState('')

	const filteredUsers = usersData
		.filter(user => !roleFilter || user.role === roleFilter)
		.filter(user => !statusFilter || user.status === statusFilter)
		.filter(user => {
			const query = search.toLowerCase()
			return (
				user.firstName.toLowerCase().includes(query) ||
				user.lastName.toLowerCase().includes(query) ||
				user.email.toLowerCase().includes(query)
			)
		})
		.filter(user => {
			if (!minOrders) return true
			return user.orderCount >= Number(minOrders)
		})
		.filter(user => {
			if (!createdAfter) return true
			const userDate = new Date(user.createdAt.split('.').reverse().join('-'))
			const filterDate = new Date(createdAfter)
			return userDate >= filterDate
		})

	const clearFilters = () => {
		setSearch('')
		setRoleFilter('')
		setStatusFilter('')
		setMinOrders('')
		setCreatedAfter('')
	}

	return (
		<Shell className="container flex flex-col gap-4">
			<div className="w-full py-4 flex justify-between items-center">
				<h1 className="text-2xl font-bold">Users</h1>
			</div>
			{usersData.length > 0 && (
				<div className="w-full flex justify-start items-end gap-4">
					<div className="w-[200px] flex flex-col">
						<label className="text-sm font-medium">Search</label>
						<input
							type="text"
							value={search}
							onChange={e => setSearch(e.target.value)}
							placeholder="Search by name or email"
							className="border border-gray-400 p-2 rounded-lg"
						/>
					</div>
					<div className="w-[100px] flex flex-col">
						<label className="text-sm font-medium">Role</label>
						<Select options={roleOptions} value={roleFilter} onChange={value => setRoleFilter(value)} />
					</div>
					<div className="w-[100px] flex flex-col">
						<label className="text-sm font-medium">Status</label>
						<Select options={userStatusOptions} value={statusFilter} onChange={value => setStatusFilter(value)} />
					</div>
					<div className="w-[100px] flex flex-col">
						<label className="text-sm font-medium">Min Orders</label>
						<input
							type="number"
							value={minOrders}
							onChange={e => setMinOrders(e.target.value)}
							placeholder="0"
							className="border border-gray-400 p-2 rounded-lg"
						/>
					</div>
					<div className="w-[150px] flex flex-col">
						<label className="text-sm font-medium">Created After</label>
						<input
							type="date"
							value={createdAfter}
							onChange={e => setCreatedAfter(e.target.value)}
							className="border border-gray-400 p-2 rounded-lg"
						/>
					</div>
					<Button
						text="Clear Filters"
						onClick={clearFilters}
						className="mr-auto bg-gray-200 hover:bg-gray-300 text-sm px-3 py-2 rounded-lg"
					/>
				</div>
			)}

			{usersData.length === 0 && filteredUsers ? <p>No users found.</p> : <UsersTable data={filteredUsers} />}
		</Shell>
	)
}

export default UsersPage
