'use client'

import { UserButton } from '@clerk/nextjs'
import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'

export function AuthHeader() {
  const { isSignedIn } = useAuth()

  return (
    <header className="flex justify-end items-center p-4 gap-4 h-16 border-b">
      {!isSignedIn ? (
        <>
          <Link
            href="/sign-in"
            className="text-sm font-medium hover:text-blue-600"
          >
            Войти
          </Link>
          <Link
            href="/sign-up"
            className="bg-blue-600 text-white rounded-full font-medium text-sm h-10 px-4 hover:bg-blue-700"
          >
            Регистрация
          </Link>
        </>
      ) : (
        <Link
          href="/dashboard"
          className="text-sm font-medium hover:text-blue-600 mr-4"
        >
          Dashboard
        </Link>
      )}
      <UserButton />
    </header>
  )
}
