'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { Menu, ShoppingCart, Search, X, Heart, User } from 'lucide-react'

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [checked, setChecked] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    async function checkSession() {
      const { data: { user } } = await supabase.auth.getUser()
      setLoggedIn(!!user)
      setChecked(true)
    }
    checkSession()
    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      setLoggedIn(!!session?.user)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  return (
    <>
      {/* ===== DESKTOP / TABLET NAV (>=768px) ===== */}
      <nav
        className="desktop-nav"
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 40px',
          height: '64px',
          borderBottom: '1px solid #E5E0D7',
          background: '#FFFFFF',
          whiteSpace: 'nowrap',
          gap: '1rem',
        }}
      >
        <Link href="/" style={{ textDecoration: 'none', color: '#171714', lineHeight: 1.1, flexShrink: 0 }}>
          <div style={{ fontFamily: 'var(--font-playfair)', fontWeight: 700, fontSize: '1.3rem' }}>AfriStyle</div>
          <div className="nav-tagline" style={{ fontFamily: 'var(--font-inter)', fontSize: '0.6rem', color: '#8A7F6A', letterSpacing: '0.03em' }}>
            Fashion. Culture. Connection.
          </div>
        </Link>

        <div className="nav-links" style={{ display: 'flex', gap: '1.75rem', alignItems: 'center', flexShrink: 1, minWidth: 0 }}>
          <Link href="/" style={navLink}>Home</Link>
          <Link href="/browse" style={navLink}>Shop</Link>
          <Link href="/designers" style={navLink}>Designers</Link>
          <Link href="/collections" style={navLink}>Collections</Link>
          <Link href="/about" style={navLink}>About Us</Link>
          <Link href="/blog" style={navLink}>Blog</Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.1rem', flexShrink: 0 }}>
          <div className="nav-search" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#F7F3ED', border: '1px solid #E5E0D7', borderRadius: '8px', padding: '0.5rem 0.8rem', width: '200px', minWidth: '110px' }}>
            <input type="text" placeholder="Search products, designers..." style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontSize: '0.78rem', color: '#171714', minWidth: 0 }} />
            <Search size={15} color="#8A7F6A" style={{ flexShrink: 0 }} />
          </div>

          <Link href="/cart" style={{ ...navLink, display: 'flex', alignItems: 'center', gap: '0.35rem', position: 'relative' }}>
            <ShoppingCart size={18} />
            <span className="nav-cart-label">Cart</span>
            <span style={{ position: 'absolute', top: '-8px', right: '-12px', background: '#171714', color: '#fff', fontSize: '0.58rem', fontWeight: 700, width: '14px', height: '14px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</span>
          </Link>

          <Link href="/wishlist" className="nav-wishlist" style={{ ...navLink, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Heart size={17} />
            Wishlist
          </Link>

          {checked && loggedIn ? (
            <Link href="/dashboard" style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#E8E2D6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#171714', flexShrink: 0 }}>
              <User size={16} />
            </Link>
          ) : (
            <Link href="/auth/login" style={{ padding: '0.5rem 1rem', background: '#14201A', color: '#F7F3ED', borderRadius: '5px', textDecoration: 'none', fontSize: '0.8rem', flexShrink: 0 }}>
              Log In
            </Link>
          )}
        </div>
      </nav>

      {/* ===== MOBILE NAV (<768px) ===== */}
      <div className="mobile-nav" style={{ background: '#FFFFFF' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', padding: '0 1.1rem', height: '58px' }}>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', padding: 0, display: 'flex', justifySelf: 'start' }} aria-label="Menu">
            {menuOpen ? <X size={22} color="#171714" /> : <Menu size={22} color="#171714" />}
          </button>

          <Link href="/" style={{ textDecoration: 'none', color: '#171714', textAlign: 'center', lineHeight: 1.1, justifySelf: 'center' }}>
            <div style={{ fontFamily: 'var(--font-playfair)', fontWeight: 700, fontSize: '1.05rem' }}>AfriStyle</div>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: '0.5rem', color: '#8A7F6A', letterSpacing: '0.02em' }}>
              African Fashion, Global Reach
            </div>
          </Link>

          <Link href="/cart" style={{ position: 'relative', color: '#171714', display: 'flex', justifySelf: 'end' }} aria-label="Cart">
            <ShoppingCart size={21} />
            <span style={{ position: 'absolute', top: '-6px', right: '-7px', background: '#171714', color: '#fff', fontSize: '0.6rem', fontWeight: 700, width: '15px', height: '15px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</span>
          </Link>
        </div>

        <div style={{ padding: '0 1rem 0.85rem', display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: '520px', background: '#F7F3ED', border: '1px solid #E5E0D7', borderRadius: '10px', padding: '0.65rem 0.9rem', minHeight: '42px' }}>
            <input type="text" placeholder="Search for products, designers..." style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontSize: '0.8rem', color: '#171714', minWidth: 0 }} />
            <Search size={17} color="#6B665D" style={{ flexShrink: 0, marginLeft: '0.4rem' }} />
          </div>
        </div>

        {menuOpen && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', padding: '0 1.1rem 1.1rem' }}>
            <Link href="/browse" style={mobileLinkStyle} onClick={() => setMenuOpen(false)}>Shop</Link>
            <Link href="/designers" style={mobileLinkStyle} onClick={() => setMenuOpen(false)}>Designers</Link>
            {checked && loggedIn && (
              <>
                <Link href="/dashboard" style={mobileLinkStyle} onClick={() => setMenuOpen(false)}>Dashboard</Link>
                <Link href="/portfolio/upload" style={mobileLinkStyle} onClick={() => setMenuOpen(false)}>Upload Item</Link>
                <Link href="/events/create" style={mobileLinkStyle} onClick={() => setMenuOpen(false)}>Create Event</Link>
                <Link href="/auth/logout" style={mobileLinkStyle} onClick={() => setMenuOpen(false)}>Log Out</Link>
              </>
            )}
            {checked && !loggedIn && (
              <>
                <Link href="/auth/login" style={mobileLinkStyle} onClick={() => setMenuOpen(false)}>Log In</Link>
                <Link href="/auth/signup" style={mobileLinkStyle} onClick={() => setMenuOpen(false)}>Sign Up</Link>
              </>
            )}
          </div>
        )}
      </div>

      <style>{`
        .mobile-nav { display: block; border-bottom: 1px solid #E5E0D7; }
        .desktop-nav { display: none; }

        @media (min-width: 768px) {
          .mobile-nav { display: none !important; }
          .desktop-nav { display: flex !important; }
        }

        /* Tablet: tighten before anything collides */
        @media (min-width: 768px) and (max-width: 1023px) {
          .desktop-nav { padding: 0 20px !important; gap: 0.75rem !important; }
          .nav-links { gap: 1rem !important; }
          .nav-links a { font-size: 0.8rem !important; }
          .nav-search { width: 130px !important; }
          .nav-tagline { display: none !important; }
          .nav-wishlist span, .nav-cart-label { display: none !important; }
        }

        @media (min-width: 1024px) and (max-width: 1180px) {
          .nav-links { gap: 1.3rem !important; }
          .nav-search { width: 160px !important; }
        }
      `}</style>
    </>
  )
}

const navLink = { color: '#171714', textDecoration: 'none', fontSize: '0.88rem', flexShrink: 0 }
const mobileLinkStyle = { color: '#171714', textDecoration: 'none', fontSize: '0.95rem', padding: '0.55rem 0', borderBottom: '1px solid #E5E0D7' }