'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const useAuth = () => {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [user, setUser] = useState<{ name: string, email: string, image: string } | null>(null)

  useEffect(() => {
    
    const checkAuth = async () => {
      const authState = localStorage.getItem('authState')
      if (authState) {
        setIsSignedIn(true)
        setUser(JSON.parse(authState))
      }
    }
    checkAuth()
  }, [])

  const signIn = () => {
    const user = { name: 'John Doe', email: 'john@example.com', image: '/placeholder.svg' }
    localStorage.setItem('authState', JSON.stringify(user))
    setIsSignedIn(true)
    setUser(user)
  }

  const signOut = () => {
    localStorage.removeItem('authState')
    setIsSignedIn(false)
    setUser(null)
  }

  return { isSignedIn, user, signIn, signOut }
}

export function Header() {
  const { isSignedIn, user, signIn, signOut } = useAuth()

  return (
    <header className="container mx-auto px-4 py-8">
      <nav className="flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">MediConnect</div>
        <div className="space-x-4">
          {isSignedIn && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                {/* <DropdownMenuItem onClick={signOut}>Sign out</DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              {/* <Button variant="outline" onClick={signIn}>Sign In</Button> */}
              <Link href="/patient/signup">
                {/* <Button>Sign Up</Button>  */}
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

