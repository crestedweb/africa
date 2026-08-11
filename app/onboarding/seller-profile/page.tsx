'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function SellerProfileOnboarding() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)

  const [form, setForm] = useState({
    seller_type: 'designer',
    business_name: '',
    bio: '',
    location_city: '',
    location_state: '',
    whatsapp_number: '',
    instagram_handle: '',
  })

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth/login')
        return
      }
      setUserId(user.id)
    }
    getUser()
  }, [router])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!userId) return
    setLoading(true)
    setError(null)

    const { error: insertError } = await supabase.from('seller_profiles').insert({
      user_id: userId,
      seller_type: form.seller_type,
      business_name: form.business_name,
      bio: form.bio,
      location_city: form.location_city,
      location_state: form.location_state,
      whatsapp_number: form.whatsapp_number,
      instagram_handle: form.instagram_handle,
    })

    if (insertError) {
      setError(insertError.message)
      setLoading(false)
      return
    }

    setLoading(false)
    router.push('/browse')
  }

  if (!userId) return <p style={{ padding: '2rem' }}>Loading...</p>

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', padding: '1rem' }}>
      <h1>Complete Your Seller Profile</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
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
          {loading ? 'Saving...' : 'Complete Profile'}
        </button>
      </form>
    </div>
  )
}