'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/shadcn/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shadcn/ui/card'
import { getServerSideURL } from '@/utilities/getURL'

interface UserDetailsBlockProps {
  title?: string
  description?: string
}

export const UserDetailsBlock: React.FC<UserDetailsBlockProps> = ({ title, description }) => {
	const [userDetails, setUserDetails] = useState<any>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [userEmail, setUserEmail] = useState<string>('')
	const [userUsername, setUserUsername] = useState<string>('')
	const [userProfilePicture, setUserProfilePicture] = useState<string>('')

	useEffect(() => {
		getUserDetails()
	}, [])

	const getUserDetails = async () => {
		setIsLoading(true)
		try {
			const response = await fetch(`${getServerSideURL()}/api/page-users/me`, {
				method: 'GET',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
			})
			if (!response.ok) {
				throw new Error('Failed to get user details')
			}
			const data = await response.json()
			setUserDetails(data?.user || null)
			setUserEmail(data?.user?.email || '')
			setUserUsername(data?.user?.username || '')
			setUserProfilePicture(data?.user?.profilePicture || '')
		} catch (error) {
			console.error(error)
			setUserDetails(null)
		} finally {
			setIsLoading(false)
		}
	}

	const handleLogout = async () => {
		setIsLoading(true)
		try {
			const response = await fetch(`${getServerSideURL()}/api/page-users/logout`, {
				method: 'POST',
				credentials: 'include',
			})
			if (!response.ok) {
				throw new Error('Failed to logout user')
			}

			setUserDetails(null)
			setUserEmail('')
			setUserUsername('')
			setUserProfilePicture('')
		}
		catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="container my-16">
			<div className="max-w-4xl mx-auto">
				<div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
					<h3 className="text-lg font-semibold text-gray-900 mb-4">{title || 'User Details'}</h3>
					{description && <p className="text-gray-600 mb-6">{description}</p>}
					<div className="prose prose-gray max-w-none">
						{!isLoading ? <Card>
							<CardHeader>
								<CardTitle>User Details</CardTitle>
							</CardHeader>
							<CardContent>
								<CardTitle>User details content will be displayed here:</CardTitle>
								{userDetails ? <div>
									<p>Email:<br/>{userEmail}</p>
									<p>Username:<br/>{userUsername}</p>
									<p>Profile Picture:</p>
									{userProfilePicture ? (
										<div className="flex flex-col gap-2">
											<img 
												src={userProfilePicture?.url || ''} 
												alt={`${userUsername}'s profile picture`}
												className="w-32 h-32 rounded-full object-cover"
											/>
										</div>
									) : (
										<p>No profile picture uploaded</p>
									)}
								</div> : <p>No user details found</p>}								
							</CardContent>
						</Card> : <Card>
							<CardHeader>
								<CardTitle>User Details</CardTitle>
							</CardHeader>
							<CardContent>
								<CardTitle>Loading...</CardTitle>
							</CardContent>
						</Card>}
						<div className="flex flex-col gap-2 mt-2">
							<Button variant="secondary" onClick={() => getUserDetails()}>Get User Details</Button>
							<Button variant="destructive" onClick={() => handleLogout()}>Logout User</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
