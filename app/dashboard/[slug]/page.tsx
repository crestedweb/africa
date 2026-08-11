'use client'

import { useState, useEffect, use } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function EventOrdersDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [event, setEvent] = useState<any>(null)
  const [orders, setOrders] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth/login')
        return
      }

      const { data: eventData, error: eventError } = await supabase
        .from('events')
        .select('id, event_name, event_type, event_date, organizer_id')
        .eq('share_slug', slug)
        .single()

      if (eventError || !eventData) {
        setError('Event not found.')
        setLoading(false)
        return
      }

      if (eventData.organizer_id !== user.id) {
        setError('You do not have access to this event.')
        setLoading(false)
        return
      }

      setEvent(eventData)

      const { data: ordersData } = await supabase
        .from('event_orders')
        .select('*')
        .eq('event_id', eventData.id)
        .order('created_at', { ascending: false })

      setOrders(ordersData || [])
      setLoading(false)
    }
    loadData()
  }, [slug, router])

  if (loading) return <p style={{ padding: '2rem' }}>Loading...</p>
  if (error) return <p style={{ padding: '2rem', color: 'red' }}>{error}</p>

  return (
    <div style={{ padding: '2rem', maxWidth: 800, margin: '0 auto' }}>
      <h1>{event.event_name} — Orders</h1>
      <p style={{ color: '#666' }}>{orders.length} submission{orders.length === 1 ? '' : 's'}</p>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1.5rem' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ddd', textAlign: 'left' }}>
            <th style={{ padding: '0.5rem' }}>Name</th>
            <th style={{ padding: '0.5rem' }}>Phone</th>
            <th style={{ padding: '0.5rem' }}>Size</th>
            <th style={{ padding: '0.5rem' }}>Color</th>
            <th style={{ padding: '0.5rem' }}>Qty</th>
            <th style={{ padding: '0.5rem' }}>Country</th>
            <th style={{ padding: '0.5rem' }}>Notes</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '0.5rem' }}>{order.guest_name}</td>
              <td style={{ padding: '0.5rem' }}>{order.guest_phone}</td>
              <td style={{ padding: '0.5rem' }}>{order.size}</td>
              <td style={{ padding: '0.5rem' }}>{order.color_variant}</td>
              <td style={{ padding: '0.5rem' }}>{order.quantity}</td>
              <td style={{ padding: '0.5rem' }}>{order.shipping_country}</td>
              <td style={{ padding: '0.5rem' }}>{order.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {orders.length === 0 && <p style={{ marginTop: '1rem' }}>No orders submitted yet.</p>}
    </div>
  )
}