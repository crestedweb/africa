import { supabase } from '@/lib/supabase'

export default async function BrowsePage() {
  const { data: items, error } = await supabase
    .from('portfolio_items')
    .select(`
      id,
      title,
      description,
      image_url,
      category,
      occasion_tags,
      price_estimate,
      currency,
      seller_profiles (
        business_name,
        location_city,
        location_state,
        whatsapp_number,
        seller_type
      )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    return <p style={{ padding: '2rem', color: 'red' }}>Error loading items: {error.message}</p>
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Browse African Attire & Fabric</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginTop: '1.5rem',
        }}
      >
        {items?.map((item: any) => (
          <div
            key={item.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              overflow: 'hidden',
              paddingBottom: '1rem',
            }}
          >
            <img
              src={item.image_url}
              alt={item.title}
              style={{ width: '100%', height: '250px', objectFit: 'cover' }}
            />
            <div style={{ padding: '0.75rem' }}>
              <h3 style={{ margin: '0 0 0.25rem' }}>{item.title}</h3>
              <p style={{ margin: '0 0 0.25rem', color: '#555' }}>{item.description}</p>
              <p style={{ margin: '0 0 0.25rem', fontSize: '0.9rem' }}>
                {item.category} {item.occasion_tags?.length ? `· ${item.occasion_tags.join(', ')}` : ''}
              </p>
              {item.price_estimate && (
                <p style={{ margin: '0 0 0.25rem', fontWeight: 'bold' }}>
                  {item.currency} {item.price_estimate}
                </p>
              )}
              {item.seller_profiles && (
                <p style={{ margin: '0.5rem 0 0', fontSize: '0.85rem', color: '#777' }}>
                  By {item.seller_profiles.business_name || 'Seller'}
                  {item.seller_profiles.location_city ? ` — ${item.seller_profiles.location_city}` : ''}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {items?.length === 0 && <p>No items yet — check back soon!</p>}
    </div>
  )
}