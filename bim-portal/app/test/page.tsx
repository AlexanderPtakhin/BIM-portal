'use client'

import { trpc } from '@/trpc/client'

export default function TestPage() {
  const { data, isLoading, error } = trpc.auth.hello.useQuery({
    text: 'BIM Portal',
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">tRPC Test</h1>
      <div className="bg-gray-100 p-4 rounded">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  )
}
