'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function CreateEvent() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [organizerId, setOrganizerId] = useState<string | null>(null)
  const [checkingAuth, setCheckingAuth] = useState(true)

  const [form, setForm] = useState({
    seller_id: '',
    portfolio_item_id: '',
    event_name: '',
    event_type: 'wedding',
    event_date: '',
  })

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth/login')
        return
      }
      setOrganizerId(user.id)
      setCheckingAuth(false)
    }
    loadUser()
  }, [router])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function generateSlug(name: string) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Math.random().toString(36).slice(2, 7)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!organizerId) return
    setLoading(true)
    setError(null)

    const share_slug = generateSlug(form.event_name)

    const { data, error: insertError } = await supabase
      .from('events')
      .insert({
        organizer_id: organizerId,
        seller_id: form.seller_id || null,
        portfolio_item_id: form.portfolio_item_id || null,
        event_name: form.event_name,
        event_type: form.event_type,
        event_date: form.event_date || null,
        share_slug,
      })
      .select()
      .single()

    if (insertError) {
      setError(insertError.message)
      setLoading(false)
      return
    }

    setLoading(false)
    router.push(`/events/${data.share_slug}/created`)
  }

  if (checkingAuth) return <p style={{ padding: '2rem' }}>Loading...</p>

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', padding: '1rem' }}>
      <h1>Create an Event</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <input name="event_name" placeholder="Event name" value={form.event_name} onChange={handleChange} required />
        <select name="event_type" value={form.event_type} onChange={handleChange}>
          <option value="wedding">Wedding</option>
          <option value="owambe">Owambe</option>
          <option value="funeral">Funeral</option>
          <option value="graduation">Graduation</option>
        </select>
        <input type="date" name="event_date" value={form.event_date} onChange={handleChange} />
        <label>
          Seller ID (optional — copy from seller_profiles table for now)
          <input name="seller_id" value={form.seller_id} onChange={handleChange} />
        </label>
        <label>
          Portfolio item ID (optional — copy from portfolio_items table for now)
          <input name="portfolio_item_id" value={form.portfolio_item_id} onChange={handleChange} />
        </label>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Event'}
        </button>
      </form>
    </div>
  )
}