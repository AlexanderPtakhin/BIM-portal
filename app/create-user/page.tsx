'use client'

import { useState } from 'react'

export default function CreateUserPage() {
  const [result, setResult] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const createUser = async () => {
    setLoading(true)
    setResult('')
    
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Тестовый фрилансер',
          email: 'freelancer@test.com',
          role: 'FREELANCER'
        })
      })
      
      const data = await response.json()
      setResult(JSON.stringify(data, null, 2))
    } catch (error) {
      setResult('Error: ' + error)
    }
    
    setLoading(false)
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Создать тестового пользователя</h1>
      
      <button
        onClick={createUser}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Создание...' : 'Создать пользователя'}
      </button>
      
      {result && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Результат:</h3>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {result}
          </pre>
        </div>
      )}
    </div>
  )
}
