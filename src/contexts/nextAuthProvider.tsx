'use client'

// Third-party Imports
import type { SessionProviderProps } from 'next-auth/react'

export const NextAuthProvider = ({ children }: SessionProviderProps) => {
  return <>{children}</>
}
