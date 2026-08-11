"use client"

import { useRef } from 'react'

export default function CategoryTabs({ tabs, active, onChange }: { tabs: string[]; active: string; onChange: (t: string) => void }) {
  const sc = useRef<HTMLDivElement | null>(null)
  return (
    <div style={{ overflowX: 'auto', padding: '10px 12px', WebkitOverflowScrolling: 'touch' }} ref={sc}>
      <div style={{ display: 'flex', gap: 8, minWidth: 0 }}>
        {tabs.map((t) => (
          <button key={t} onClick={() => onChange(t)} style={{ whiteSpace: 'nowrap', padding: '8px 12px', borderRadius: 999, border: t === active ? 'none' : '1px solid #E5E0D7', background: t === active ? '#14201A' : '#fff', color: t === active ? '#fff' : '#171714', fontWeight: 600, fontSize: '0.85rem' }}>
            {t}
          </button>
        ))}
      </div>
      <style>{`div::-webkit-scrollbar { display: none; }`}</style>
    </div>
  )
}
