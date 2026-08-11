import { supabase } from '@/lib/supabase'
import GuestOrderForm from './GuestOrderForm'

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const { data: event, error } = await supabase
    .from('events')
    .select(`
      id,
      event_name,
      event_type,
      event_date,
      status,
      portfolio_items (
        title,
        image_url,
        description
      ),
      seller_profiles (
        business_name,
        location_city
      )
    `)
    .eq('share_slug', slug)
    .single()

  if (error || !event) {
    return <p style={{ padding: '2rem' }}>Event not found.</p>
  }

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', padding: '1rem' }}>
      <h1>{event.event_name}</h1>
      <p style={{ color: '#666' }}>
        {event.event_type} {event.event_date ? `· ${event.event_date}` : ''}
      </p>

      {event.portfolio_items && (
        <div style={{ margin: '1rem 0' }}>
          <img
            src={(event.portfolio_items as any).image_url}
            alt={(event.portfolio_items as any).title}
            style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '8px' }}
          />
          <p style={{ fontWeight: 'bold', marginTop: '0.5rem' }}>
            {(event.portfolio_items as any).title}
          </p>
        </div>
      )}

      {event.status === 'closed' ? (
        <p style={{ color: 'red' }}>This event is no longer accepting submissions.</p>
      ) : (
        <GuestOrderForm eventId={event.id} />
      )}
    </div>
  )
}