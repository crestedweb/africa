import ProductCard from '@/components/ProductCard'
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
      <div className="product-grid" style={{ marginTop: '1.5rem' }}>
        {items?.map((item: any) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>

      {items?.length === 0 && <p>No items yet — check back soon!</p>}
      <style>{`
        .product-grid { display: grid; gap: 14px; grid-template-columns: repeat(2, minmax(0, 1fr)); }
        @media (min-width: 640px) { .product-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (min-width: 900px) { .product-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
        @media (min-width: 1200px) { .product-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
      `}</style>
    </div>
  )
}