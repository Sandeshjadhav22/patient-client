'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

export default function PatientSignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
   
    console.log('Sign-in submitted:', { email, password })
    // API call here
  }

  return (
    <div className="container mx-auto p-4 mt-52">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Patient Sign In</CardTitle>
          <CardDescription>Welcome back! Please sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
           
            <Button type="submit" className="w-full">Sign In</Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/patient/signup" className="text-sm text-blue-600 hover:underline">
            Don't have an account? Sign up
          </Link>
          <Link href="/patient/forgot-password" className="text-sm text-blue-600 hover:underline">
            Forgot password?
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

