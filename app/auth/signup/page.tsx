'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function SignUp() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState({
    full_name: '',
    phone_number: '',
    email: '',
    password: '',
    role: 'buyer', // 'buyer' or 'seller'
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Step 1: create the auth account
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    if (!authData.user) {
      setError('Sign up failed — no user returned.')
      setLoading(false)
      return
    }

    // Step 2: create the matching public.users row, using the SAME id as auth
    const { error: profileError } = await supabase.from('users').insert({
      id: authData.user.id, // same ID links auth.users to public.users
      full_name: form.full_name,
      phone_number: form.phone_number,
      email: form.email,
      role: form.role,
    })

    if (profileError) {
      setError(profileError.message)
      setLoading(false)
      return
    }

    setLoading(false)

    if (form.role === 'seller') {
      router.push('/onboarding/seller-profile')
    } else {
      router.push('/browse')
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: '1rem' }}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <input name="full_name" placeholder="Full name" value={form.full_name} onChange={handleChange} required />
        <input name="phone_number" placeholder="Phone number" value={form.phone_number} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required minLength={6} />

        <select name="role" value={form.role} onChange={handleChange}>
          <option value="buyer">I'm a buyer</option>
          <option value="seller">I'm a designer/fabric seller</option>
        </select>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>
      </form>
    </div>
  )
}