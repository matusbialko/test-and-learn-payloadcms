'use client'

import React, { useState } from 'react'
import { Button } from '@/components/shadcn/ui/button'
import { Input } from '@/components/shadcn/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn/ui/card'
import Link from 'next/link'

interface LoginBlockProps {
    title?: string
    description?: string
}

export const LoginBlock: React.FC<LoginBlockProps> = ({ title, description }) => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

    const handleLogin = async () => {
        try {
            const response = await fetch('/api/page-users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })

            if (!response.ok) {
                throw new Error('Failed to login')
            }

            const data = await response.json()
            if (data.message == 'Page User successfully logged in.') {
                setIsLoggedIn(true)
                setTimeout(() => {
                    window.location.reload()
                }, 300)
            }
        }
        catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="container my-16">
            {!isLoggedIn ? <div className="max-w-4xl mx-auto">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        {title || 'Login to your account'}
                    </h3>
                    {description && <p className="text-gray-600 mb-6">{description}</p>}
                    <div className="prose prose-gray max-w-none">
                        <Card>
                            <CardHeader>
                                <CardTitle>Login</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-1 mb-2">
                                    <label htmlFor="email">Email</label>
                                    <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="flex flex-col gap-1 mb-2">
                                    <label htmlFor="password">Password</label>
                                    <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                </div>
                            </CardContent>
                        </Card>
                        <Button onClick={() => handleLogin()} variant="secondary" className="mt-2">Login</Button>
                        <p className="text-gray-700 leading-relaxed">
                            Don't have an account? <Link href="/registration">Register</Link>
                        </p>
                    </div>
                </div>
            </div> : <div className="max-w-4xl mx-auto">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        User is logged in
                    </h3>
                </div>
            </div>}
        </div>
    )
}
