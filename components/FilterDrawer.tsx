"use client"

import { useState } from 'react'

export default function FilterDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null
  return (
    <div className="filter-drawer">
      <div className="backdrop" onClick={onClose} />
      <div className="sheet">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px' }}>
          <h3 style={{ margin: 0 }}>Filter</h3>
          <button onClick={onClose} style={{ border: 'none', background: 'none' }}>Close</button>
        </div>
        <div style={{ padding: '0 16px 24px' }}>
          <p style={{ margin: '8px 0' }}>Size</p>
          <p style={{ margin: '8px 0' }}>Color</p>
          <p style={{ margin: '8px 0' }}>Price</p>
          <p style={{ margin: '8px 0' }}>Designer</p>
        </div>
      </div>

      <style>{`
        .filter-drawer .backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.35); z-index: 80; }
        .filter-drawer .sheet { position: fixed; left: 0; right: 0; bottom: 0; background: #fff; border-top-left-radius: 12px; border-top-right-radius: 12px; z-index: 90; max-height: 70vh; overflow: auto; }
      `}</style>
    </div>
  )
}
