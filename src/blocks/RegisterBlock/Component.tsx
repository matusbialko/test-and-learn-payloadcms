'use client'

import React, { useState } from 'react'
import { Button } from '@/components/shadcn/ui/button'
import { Input } from '@/components/shadcn/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn/ui/card'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface RegisterBlockProps {
  title?: string
  description?: string
}

export const RegisterBlock: React.FC<RegisterBlockProps> = ({ title, description }) => {
    const [profilePicture, setProfilePicture] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [registrationSuccess, setRegistrationSuccess] = useState<boolean>(false)
    const router = useRouter()

    const handleRegister = async () => {
        try {
            const response = await fetch('/api/page-users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    profilePicture: profilePicture,
                    username: username,
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword,
                }),
            })


            if (!response.ok) {
                throw new Error('Failed to register')
            }

            const data = await response.json()
            if (data.message == 'Page User successfully created.') {
                setRegistrationSuccess(true)
                setTimeout(() => {
                    router.push('/login')
                    setRegistrationSuccess(false)
                }, 5000)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="container my-16">
            {!registrationSuccess ? <div className="max-w-4xl mx-auto">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {title || 'Create your account'}
                </h3>
                {description && <p className="text-gray-600 mb-6">{description}</p>}
                <div className="prose prose-gray max-w-none">
                    <Card>
                        <CardHeader>
                            <CardTitle>Register</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-1 mb-2">
                                <label htmlFor="email">Email</label>
                                <Input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-1 mb-2">
                                <label htmlFor="password">Password</label>
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-1 mb-2">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <Input
                                    type="password"
                                    placeholder="Confirm
                                    Password"
                                    required
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-1 mb-2">
                                <label htmlFor="profilePicture">Profile Picture</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    placeholder="Profile Picture"
                                    onChange={(e) => setProfilePicture(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-1 mb-2">
                                <label htmlFor="username">Username</label>
                                <Input
                                    type="username"
                                    placeholder="Username"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <Button onClick={() => handleRegister()} variant="secondary" className="mt-2">Register</Button>
                    <p className="text-gray-700 leading-relaxed">
                        Already have an account? <Link href="/login">Login</Link>
                    </p>
                </div>
                </div>
            </div> : <div className="max-w-4xl mx-auto">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Registration successful!
                    </h3>
                </div>
            </div>}
        </div>
    )
}
