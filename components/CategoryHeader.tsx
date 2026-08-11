"use client"

import Link from 'next/link'
import { ArrowLeft, Search, Sliders } from 'lucide-react'

export default function CategoryHeader({ title = 'Women', onFilter }: { title?: string; onFilter?: () => void }) {
  return (
    <div style={{ padding: '10px 12px 6px', borderBottom: '1px solid #F0ECE5', background: '#fff' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '48px 1fr 48px', alignItems: 'center', gap: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Link href="/" aria-label="Back" style={{ display: 'inline-flex', alignItems: 'center' }}>
            <ArrowLeft size={20} />
          </Link>
        </div>

        <div style={{ textAlign: 'center', fontFamily: 'var(--font-playfair)', fontSize: '1.05rem', fontWeight: 700 }}>
          {title}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <button aria-label="Search" style={{ background: 'none', border: 'none' }}>
            <Search size={18} />
          </button>
          <button aria-label="Filter" onClick={onFilter} style={{ background: 'none', border: 'none' }}>
            <Sliders size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
