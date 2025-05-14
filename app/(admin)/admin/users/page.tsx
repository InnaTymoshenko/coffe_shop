'use client'

import React, { useState } from 'react'
import Shell from '@/components/ui/shell'
import UsersTable from '@/components/layouts/tables/users-table'
import { useAdminStore } from '@/store/admin-store'
import { Button } from '@/components/ui/button'

// type Props = {}

const UsersPage = () => {
	const { usersData } = useAdminStore()

	const [search, setSearch] = useState('')
	const [roleFilter, setRoleFilter] = useState('')

	const filteredUsers = usersData
		.filter(user => !roleFilter || user.role === roleFilter)
		.filter(user => {
			const query = search.toLowerCase()
			return (
				user.firstName.toLowerCase().includes(query) ||
				user.lastName.toLowerCase().includes(query) ||
				user.email.toLowerCase().includes(query)
			)
		})

	const clearFilters = () => {
		setSearch('')
		setRoleFilter('')
	}

	return (
		<>
			<Shell className="container flex flex-col gap-4">
				<div className="w-full py-4 flex justify-between items-center">
					<h1 className="text-2xl font-bold">Users</h1>
				</div>
				<div className="w-full flex justify-start items-end gap-4">
					{usersData.length > 0 && (
						<>
							<div className="w-1/4 flex flex-col">
								<label className="text-sm font-medium">Role</label>
								<select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="border p-2 rounded">
									<option value="">All</option>
									<option value="user">User</option>
									<option value="admin">Admin</option>
								</select>
							</div>
							<div className="w-1/4 flex flex-col">
								<label className="text-sm font-medium">Search</label>
								<input
									type="text"
									value={search}
									onChange={e => setSearch(e.target.value)}
									placeholder="Search by name or email"
									className="border p-2 rounded"
								/>
							</div>
							<Button
								text="Clear Filters"
								onClick={clearFilters}
								className="mr-auto bg-gray-200 hover:bg-gray-300 text-sm px-3 py-2 rounded"
							/>
						</>
					)}
				</div>
				{usersData.length === 0 && filteredUsers ? <p>No users found.</p> : <UsersTable data={filteredUsers} />}
			</Shell>
		</>
	)
}

export default UsersPage
