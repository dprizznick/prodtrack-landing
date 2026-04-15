const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export async function submitEarlyAccess(data: {
  email: string
  name?: string
  company?: string
}) {
  const res = await fetch(`${API_URL}/early-access`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, source: 'landing' }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || 'Signup failed')
  }

  return res.json()
}
