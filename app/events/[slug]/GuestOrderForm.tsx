'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function GuestOrderForm({ eventId }: { eventId: string }) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState({
    guest_name: '',
    guest_phone: '',
    size: '',
    color_variant: '',
    quantity: 1,
    shipping_country: '',
    notes: '',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setForm({ ...form, [name]: name === 'quantity' ? Number(value) : value })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error: insertError } = await supabase.from('event_orders').insert({
      event_id: eventId,
      guest_name: form.guest_name,
      guest_phone: form.guest_phone,
      size: form.size,
      color_variant: form.color_variant,
      quantity: form.quantity,
      shipping_country: form.shipping_country,
      notes: form.notes,
    })

    if (insertError) {
      setError(insertError.message)
      setLoading(false)
      return
    }

    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>Thanks! Your order has been submitted. 🎉</p>
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
      <input name="guest_name" placeholder="Your name" value={form.guest_name} onChange={handleChange} required />
      <input name="guest_phone" placeholder="Your phone number" value={form.guest_phone} onChange={handleChange} required />
      <input name="size" placeholder="Size" value={form.size} onChange={handleChange} />
      <input name="color_variant" placeholder="Color / variant preference" value={form.color_variant} onChange={handleChange} />
      <input type="number" name="quantity" min={1} value={form.quantity} onChange={handleChange} />
      <input name="shipping_country" placeholder="Shipping country" value={form.shipping_country} onChange={handleChange} />
      <textarea name="notes" placeholder="Any notes" value={form.notes} onChange={handleChange} />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit My Order'}
      </button>
    </form>
  )
}