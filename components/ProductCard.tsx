"use client"

import Link from 'next/link'
import { Heart, Star } from 'lucide-react'
import { useState } from 'react'

export default function ProductCard({ product }: { product: any }) {
  const [wish, setWish] = useState(false)
  return (
    <div style={{ borderRadius: 10, overflow: 'hidden', background: '#fff', border: '1px solid #E5E0D7', minWidth: 0 }}>
      <div style={{ position: 'relative' }}>
        <Link href={`/product/${encodeURIComponent(product.name)}`}>
          <img src={product.image} alt={product.name} style={{ width: '100%', aspectRatio: '4 / 5', objectFit: 'cover', display: 'block' }} />
        </Link>
        <button onClick={() => setWish(!wish)} aria-label="Wishlist" style={{ position: 'absolute', top: 8, right: 8, background: '#fff', border: 'none', borderRadius: '50%', width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <Heart size={16} color={wish ? '#E74C3C' : '#171714'} />
        </button>
      </div>

      <div style={{ padding: '0.6rem 0.75rem' }}>
        <p style={{ fontWeight: 600, fontSize: '0.86rem', margin: '0 0 0.2rem', color: '#171714', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.name}</p>
        <p style={{ fontSize: '0.72rem', color: '#6B665D', margin: '0 0 0.4rem' }}>By {product.designer}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontWeight: 700, fontSize: '0.9rem', margin: 0, color: '#171714' }}>${product.price.toFixed(2)}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#6B665D', fontSize: '0.74rem' }}>
            <Star size={12} color="#D4A22C" />
            <span>{product.rating} ({product.reviews})</span>
          </div>
        </div>
      </div>
    </div>
  )
}
