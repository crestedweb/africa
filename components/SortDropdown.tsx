"use client"

import { useState } from 'react'

export default function SortDropdown({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false)
  const opts = ['Featured', 'Newest', 'Price: Low to High', 'Price: High to Low', 'Highest Rated']
  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setOpen(!open)} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #E5E0D7', background: '#fff', fontSize: '0.86rem' }}>
        Sort by: {value} ▾
      </button>
      {open && (
        <div style={{ position: 'absolute', right: 0, top: '110%', background: '#fff', border: '1px solid #E5E0D7', borderRadius: 8, padding: 8, zIndex: 60 }}>
          {opts.map((o) => (
            <div key={o} onClick={() => { onChange(o); setOpen(false) }} style={{ padding: '8px 12px', cursor: 'pointer' }}>{o}</div>
          ))}
        </div>
      )}
    </div>
  )
}
