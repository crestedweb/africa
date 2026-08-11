'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, LayoutGrid, Users, Heart, User } from 'lucide-react'

const tabs = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Categories', href: '/browse', icon: LayoutGrid },
  { name: 'Designers', href: '/designers', icon: Users },
  { name: 'Wishlist', href: '/wishlist', icon: Heart },
  { name: 'Account', href: '/dashboard', icon: User },
]

export default function MobileTabBar() {
  const pathname = usePathname()

  return (
    <nav
      className="mobile-tabbar"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#FFFFFF',
        borderTop: '1px solid #E5E0D7',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.04)',
        display: 'none',
        justifyContent: 'space-around',
        padding: '0.5rem 0 calc(0.4rem + env(safe-area-inset-bottom))',
        zIndex: 50,
      }}
    >
      {tabs.map((tab) => {
        const active = pathname === tab.href
        const Icon = tab.icon
        return (
          <Link
            key={tab.name}
            href={tab.href}
            style={{
              flex: '1 1 0',
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
              textDecoration: 'none',
              color: active ? '#14201A' : '#8A7F6A',
              fontSize: '0.62rem',
            }}
          >
            <Icon size={20} strokeWidth={active ? 2.4 : 1.8} />
            {tab.name}
            {active && <span style={{ width: '16px', height: '2px', background: '#14201A', borderRadius: '2px', marginTop: '1px' }} />}
          </Link>
        )
      })}
      <style>{`
        @media (max-width: 767px) {
          .mobile-tabbar { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}