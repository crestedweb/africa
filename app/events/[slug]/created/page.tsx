'use client'

import { use } from 'react'

export default function EventCreated({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/events/${slug}`

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Event Created! 🎉</h1>
      <p>Share this link with your guests:</p>
      <input
        readOnly
        value={shareUrl}
        style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
        onClick={(e) => (e.target as HTMLInputElement).select()}
      />
    </div>
  )
}