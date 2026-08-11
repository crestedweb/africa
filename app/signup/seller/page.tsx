'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function SellerSignup() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState({
    full_name: '',
    phone_number: '',
    email: '',
    seller_type: 'designer',
    business_name: '',
    bio: '',
    location_city: '',
    location_state: '',
    whatsapp_number: '',
    instagram_handle: '',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Step 1: create the base user record
    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert({
        full_name: form.full_name,
        phone_number: form.phone_number,
        email: form.email || null,
        role: 'seller',
      })
      .select()
      .single()

    if (userError) {
      setError(userError.message)
      setLoading(false)
      return
    }

    // Step 2: create the seller profile, linked to that user
    const { error: profileError } = await supabase
      .from('seller_profiles')
      .insert({
        user_id: userData.id,
        seller_type: form.seller_type,
        business_name: form.business_name,
        bio: form.bio,
        location_city: form.location_city,
        location_state: form.location_state,
        whatsapp_number: form.whatsapp_number,
        instagram_handle: form.instagram_handle,
      })

    if (profileError) {
      setError(profileError.message)
      setLoading(false)
      return
    }

    setLoading(false)
    router.push('/signup/success')
  }

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', padding: '1rem' }}>
      <h1>Seller Sign Up</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <input name="full_name" placeholder="Full name" value={form.full_name} onChange={handleChange} required />
        <input name="phone_number" placeholder="Phone number" value={form.phone_number} onChange={handleChange} required />
        <input name="email" placeholder="Email (optional)" value={form.email} onChange={handleChange} />

        <select name="seller_type" value={form.seller_type} onChange={handleChange}>
          <option value="designer">Fashion Designer</option>
          <option value="fabric_seller">Fabric Seller</option>
          <option value="both">Both</option>
        </select>

        <input name="business_name" placeholder="Business name" value={form.business_name} onChange={handleChange} />
        <textarea name="bio" placeholder="Tell buyers about yourself" value={form.bio} onChange={handleChange} />
        <input name="location_city" placeholder="City" value={form.location_city} onChange={handleChange} />
        <input name="location_state" placeholder="State" value={form.location_state} onChange={handleChange} />
        <input name="whatsapp_number" placeholder="WhatsApp number" value={form.whatsapp_number} onChange={handleChange} />
        <input name="instagram_handle" placeholder="Instagram handle" value={form.instagram_handle} onChange={handleChange} />

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Sign Up'}
        </button>
      </form>
    </div>
  )
}