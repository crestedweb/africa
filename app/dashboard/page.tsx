'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Dashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [events, setEvents] = useState<any[]>([])

  useEffect(() => {
    async function loadEvents() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth/login')
        return
      }

      const { data, error } = await supabase
        .from('events')
        .select(`
          id,
          event_name,
          event_type,
          event_date,
          share_slug,
          status,
          event_orders ( id )
        `)
        .eq('organizer_id', user.id)
        .order('created_at', { ascending: false })

      if (!error && data) {
        setEvents(data)
      }
      setLoading(false)
    }
    loadEvents()
  }, [router])

  if (loading) return <p style={{ padding: '2rem' }}>Loading...</p>

  return (
    <div style={{ padding: '2rem', maxWidth: 700, margin: '0 auto' }}>
      <h1>My Events</h1>

      {events.length === 0 && (
        <p>
          You haven't created any events yet. <Link href="/events/create">Create one</Link>.
        </p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
        {events.map((event) => (
          <div key={event.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1rem' }}>
            <h3 style={{ margin: '0 0 0.25rem' }}>{event.event_name}</h3>
            <p style={{ margin: '0 0 0.5rem', color: '#666', fontSize: '0.9rem' }}>
              {event.event_type} {event.event_date ? `· ${event.event_date}` : ''} · {event.status}
            </p>
            <p style={{ margin: '0 0 0.5rem' }}>
              {event.event_orders?.length || 0} order{event.event_orders?.length === 1 ? '' : 's'} submitted
            </p>
            <Link href={`/dashboard/${event.share_slug}`}>View orders →</Link>
          </div>
        ))}
      </div>
    </div>
  )
}