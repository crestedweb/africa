"use client"

import Link from 'next/link'
import { Home, Grid, Users, Heart, User } from 'lucide-react'

export default function MobileBottomNav({ active = 'categories' }: { active?: string }) {
  return (
    <div className="mobile-bottom-nav">
      <nav style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '720px', margin: '0 auto', padding: '0 12px' }}>
        <Link href="/" className={active === 'home' ? 'active' : ''} aria-label="Home">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <Home size={20} />
            <span style={{ fontSize: 10 }}>Home</span>
          </div>
        </Link>
        <Link href="/browse" className={active === 'categories' ? 'active' : ''} aria-label="Categories">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <Grid size={20} />
            <span style={{ fontSize: 10 }}>Categories</span>
          </div>
        </Link>
        <Link href="/designers" className={active === 'designers' ? 'active' : ''} aria-label="Designers">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <Users size={20} />
            <span style={{ fontSize: 10 }}>Designers</span>
          </div>
        </Link>
        <Link href="/wishlist" className={active === 'wishlist' ? 'active' : ''} aria-label="Wishlist">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <Heart size={20} />
            <span style={{ fontSize: 10 }}>Wishlist</span>
          </div>
        </Link>
        <Link href="/account" className={active === 'account' ? 'active' : ''} aria-label="Account">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <User size={20} />
            <span style={{ fontSize: 10 }}>Account</span>
          </div>
        </Link>
      </nav>

      <style>{`
        .mobile-bottom-nav { position: fixed; left: 0; right: 0; bottom: 0; background: #fff; border-top: 1px solid #E5E0D7; padding: 8px 0; z-index: 60; }
        .mobile-bottom-nav a { color: #6B665D; text-decoration: none; width: 20%; display: inline-flex; justify-content: center; }
        .mobile-bottom-nav a.active { color: #14201A; }
        @media (min-width: 768px) { .mobile-bottom-nav { display: none !important; } }
      `}</style>
    </div>
  )
}
