'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Truck, ShieldCheck, Lock, Heart, Star, Search, Users, ShoppingBag, Package, Scissors } from 'lucide-react'

const categories = [
  { name: 'Women', count: '120+ Items', img: 'https://picsum.photos/seed/afristyle-women/300/300' },
  { name: 'Men', count: '85+ Items', img: 'https://picsum.photos/seed/afristyle-men/300/300' },
  { name: 'Kids', count: '60+ Items', img: 'https://picsum.photos/seed/afristyle-kids/300/300' },
  { name: 'Accessories', count: '150+ Items', img: 'https://picsum.photos/seed/afristyle-acc/300/300' },
  { name: 'Shoes', count: '40+ Items', img: 'https://picsum.photos/seed/afristyle-shoes/300/300' },
  { name: 'Bags', count: '70+ Items', img: 'https://picsum.photos/seed/afristyle-bags/300/300' },
]

const products = [
  { title: 'Ankara Maxi Dress', by: 'Zola Designs', price: '$89.99', rating: '4.8', count: '24', img: 'https://picsum.photos/seed/prod1/400/500' },
  { title: "Men's Agbada Set", by: 'Tunde Crafts', price: '$129.99', rating: '4.9', count: '18', img: 'https://picsum.photos/seed/prod2/400/500' },
  { title: 'Kente Peplum Top', by: 'Akosua Collections', price: '$59.99', rating: '4.7', count: '15', img: 'https://picsum.photos/seed/prod3/400/500' },
  { title: 'Leather Ankara Bag', by: 'Baokye Bags', price: '$74.99', rating: '4.8', count: '25', img: 'https://picsum.photos/seed/prod4/400/500' },
  { title: 'Beaded Jewelry Set', by: 'Zuri Accessories', price: '$45.99', rating: '4.8', count: '33', img: 'https://picsum.photos/seed/prod5/400/500' },
  { title: 'Afrocentric Loafers', by: 'Step in Style', price: '$45.99', rating: '4.7', count: '12', img: 'https://picsum.photos/seed/prod6/400/500' },
]

const designers = [
  { name: 'Zola Designs', country: 'Nigeria', rating: '4.9', count: '126', followers: '2.3K', img: 'https://picsum.photos/seed/designer1/200/200' },
  { name: 'Tunde Crafts', country: 'Nigeria', rating: '4.8', count: '98', followers: '1.8K', img: 'https://picsum.photos/seed/designer2/200/200' },
  { name: 'Akosua Couture', country: 'Ghana', rating: '5.0', count: '74', followers: '1.2K', img: 'https://picsum.photos/seed/designer3/200/200' },
]

export default function Home() {
  const [heroIndex, setHeroIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setHeroIndex((p) => (p + 1) % 3), 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      {/* ================= DESKTOP/TABLET HERO ================= */}
      <section className="hero-desktop">
        <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 40px' }}>
          <div className="hero-desktop-card" style={{ position: 'relative', background: '#EFE7D8', borderRadius: '14px', overflow: 'hidden', minHeight: '460px', display: 'flex' }}>
            <div className="hero-desktop-text" style={{ flex: '0 0 46%', padding: '48px 0 48px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0 }}>
              <div>
                <p style={{ fontSize: '0.75rem', letterSpacing: '0.12em', color: '#8A7F6A', marginBottom: '1rem' }}>AFRICAN FASHION, GLOBAL REACH</p>
                <h1 className="hero-desktop-heading" style={{ fontFamily: 'var(--font-playfair)', fontWeight: 600, fontSize: '3rem', lineHeight: 1.08, letterSpacing: '-0.02em', color: '#171714', marginBottom: '1.2rem' }}>
                  Discover Unique<br />African Designs
                </h1>
                <p style={{ fontSize: '0.92rem', color: '#544D3F', maxWidth: '340px', lineHeight: 1.5, marginBottom: '1.75rem' }}>
                  A platform for African designers to showcase their creativity and for the world to wear it.
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <Link href="/browse" style={{ padding: '0.85rem 1.65rem', background: '#14201A', color: '#F7F3ED', borderRadius: '5px', textDecoration: 'none', fontSize: '0.88rem' }}>Shop Now</Link>
                  <Link href="/designers" style={{ padding: '0.85rem 1.65rem', border: '1px solid #14201A', color: '#14201A', borderRadius: '5px', textDecoration: 'none', fontSize: '0.88rem', background: '#F7F3ED' }}>Meet Designers</Link>
                </div>
              </div>

              <div className="hero-benefits-row" style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <HeroBenefit icon={<Scissors size={18} color="#171714" />} title="Authentic Designs" desc="Handmade by talented African designers" />
                <HeroBenefit icon={<Truck size={18} color="#171714" />} title="Global Shipping" desc="Delivering to your door from anywhere" />
                <HeroBenefit icon={<Lock size={18} color="#171714" />} title="Secure Payments" desc="Safe, easy and reliable payment options" />
              </div>
            </div>

            <div className="hero-desktop-image-wrap" style={{ position: 'relative', flex: '1', minWidth: 0 }}>
              <img src="https://picsum.photos/seed/afristyle-hero-desktop/900/900" alt="Featured African fashion" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
              <div className="hero-designer-card" style={{ position: 'absolute', bottom: '24px', right: '24px', background: 'rgba(20,32,26,0.85)', borderRadius: '10px', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.85rem', minWidth: '200px', maxWidth: '90%' }}>
                <img src="https://picsum.photos/seed/simi-osakwe/100/100" alt="Simi Osakwe" style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: '0.6rem', color: '#C9C2B0', margin: '0 0 0.15rem' }}>Featured Designer</p>
                  <p style={{ fontSize: '0.88rem', color: '#fff', fontWeight: 600, margin: '0 0 0.1rem' }}>Simi Osakwe</p>
                  <p style={{ fontSize: '0.66rem', color: '#C9C2B0', margin: '0 0 0.4rem' }}>Lagos, Nigeria</p>
                  <Link href="/designers/simi-osakwe" style={{ fontSize: '0.66rem', color: '#E7B96B', textDecoration: 'none' }}>View Profile →</Link>
                </div>
              </div>
              <div style={{ position: 'absolute', bottom: '18px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '5px' }}>
                {[0, 1, 2].map((i) => (
                  <button key={i} onClick={() => setHeroIndex(i)} style={{ width: '7px', height: '7px', borderRadius: '50%', border: 'none', background: i === heroIndex ? '#171714' : '#D8D2C4', cursor: 'pointer', padding: 0 }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MOBILE HERO ================= */}
      <div className="hero-mobile-wrap" style={{ padding: '0 16px', background: '#FFFFFF' }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '860px', margin: '0 auto' }}>
          <div className="hero-mobile-card" style={{ position: 'relative', background: '#EFE7D8', overflow: 'hidden', minHeight: '520px', width: '100%', borderRadius: '24px' }}>
            <div className="hero-mobile-content" style={{ position: 'relative', zIndex: 2, paddingTop: '45px', paddingLeft: '26px', paddingRight: '24px', paddingBottom: '45px', width: '100%', maxWidth: '380px' }}>
              <h1 style={{ fontFamily: 'var(--font-playfair)', fontWeight: 600, fontSize: 'clamp(30px, 9vw, 44px)', lineHeight: 1.02, letterSpacing: '-0.02em', color: '#171714', marginBottom: '1rem' }}>
                African<br />Fashion.<br />Global<br />Marketplace.
              </h1>
              <p style={{ color: '#544D3F', fontSize: '12.5px', lineHeight: 1.5, marginBottom: '1.4rem', maxWidth: '190px' }}>
                Shop unique designs from independent African designers around the world.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: 'min(148px, 40vw)' }}>
                <Link href="/browse" style={{ background: '#14201A', color: '#F7F3ED', borderRadius: '5px', textDecoration: 'none', textAlign: 'center', fontSize: '0.82rem', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Shop Now</Link>
                <Link href="/auth/signup" style={{ background: '#F7F3ED', border: '1px solid #14201A', color: '#14201A', borderRadius: '5px', textDecoration: 'none', textAlign: 'center', fontSize: '0.7rem', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'nowrap' }}>Become a Designer</Link>
              </div>
            </div>
            <div style={{ position: 'absolute', bottom: '14px', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '5px', zIndex: 2 }}>
              {[0, 1, 2].map((i) => (
                <button key={i} onClick={() => setHeroIndex(i)} style={{ width: '6px', height: '6px', borderRadius: '50%', border: 'none', background: i === heroIndex ? '#171714' : '#D8D2C4', cursor: 'pointer', padding: 0 }} />
              ))}
            </div>
            <div className="hero-mobile-image-wrap" style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '55%', overflow: 'hidden' }}>
              <img src="/hero-image.png" alt="Featured African fashion" style={{ position: 'absolute', top: 0, right: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'right center', pointerEvents: 'none' }} />
            </div>
          </div>

          <div style={{ position: 'relative', zIndex: 3, background: '#FFFFFF', borderRadius: '18px', boxShadow: '0 6px 24px rgba(23,23,20,0.08)', margin: '-44px 16px 0', padding: '1.25rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.85rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '0.85rem', width: '100%', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              <BenefitCol icon={<Truck size={19} color="#14201A" />} title="Global Shipping" desc="Worldwide delivery" />
              <BenefitCol icon={<Lock size={19} color="#14201A" />} title="Secure Payment" desc="Safe & trusted checkout" />
              <BenefitCol icon={<ShieldCheck size={19} color="#14201A" />} title="Buyer Protection" desc="Shop with confidence" />
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
        {/* SHOP BY CATEGORY */}
        <section className="section-pad">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.25rem' }}>
            <h2 className="section-heading">Shop by Category</h2>
            <Link href="/browse" style={{ fontSize: '0.85rem', color: '#544D3F', flexShrink: 0 }}>View all categories →</Link>
          </div>
          <div className="category-circles">
            {categories.map((cat) => (
              <Link key={cat.name} href={cat.name === 'Women' ? '/women' : `/browse?category=${encodeURIComponent(cat.name)}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ textAlign: 'center', flex: '0 0 auto', width: '68px' }}>
                  <img src={cat.img} alt={cat.name} style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', marginBottom: '0.35rem' }} />
                  <p style={{ fontSize: '0.72rem', margin: 0, color: '#171714' }}>{cat.name}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="category-cards">
            {categories.map((cat) => (
              <div key={cat.name} style={{ border: '1px solid #E5E0D7', borderRadius: '10px', overflow: 'hidden', background: '#fff', minWidth: 0 }}>
                <img src={cat.img} alt={cat.name} style={{ width: '100%', height: '150px', objectFit: 'cover', display: 'block' }} />
                <div style={{ padding: '0.9rem 1rem' }}>
                  <p style={{ fontWeight: 600, fontSize: '0.9rem', margin: '0 0 0.15rem', color: '#171714' }}>{cat.name}</p>
                  <p style={{ fontSize: '0.75rem', color: '#8A7F6A', margin: 0 }}>{cat.count}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PRODUCTS */}
        <section className="section-pad">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.25rem' }}>
            <h2 className="section-heading">Featured Designs</h2>
            <Link href="/browse" style={{ fontSize: '0.85rem', color: '#544D3F', flexShrink: 0 }}>View all products →</Link>
          </div>
          <div className="product-grid">
            {products.map((item) => (
              <div key={item.title} style={{ borderRadius: '10px', overflow: 'hidden', background: '#fff', border: '1px solid #E5E0D7', minWidth: 0 }}>
                <div style={{ position: 'relative' }}>
                  <img src={item.img} alt={item.title} style={{ width: '100%', aspectRatio: '4 / 5', objectFit: 'cover', display: 'block' }} />
                  <button style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: '#fff', border: 'none', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.15)' }} aria-label="Add to wishlist">
                    <Heart size={14} color="#171714" />
                  </button>
                </div>
                <div style={{ padding: '0.65rem 0.7rem' }}>
                  <p style={{ fontWeight: 600, fontSize: '0.82rem', margin: '0 0 0.15rem', color: '#171714', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</p>
                  <p style={{ fontSize: '0.72rem', color: '#6B665D', margin: '0 0 0.3rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>By {item.by}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.4rem' }}>
                    <p style={{ fontWeight: 700, fontSize: '0.82rem', margin: 0, color: '#171714' }}>{item.price}</p>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.66rem', color: '#6B665D', flexShrink: 0 }}>
                      <Star size={11} color="#D4A22C" fill="#D4A22C" /> {item.rating} ({item.count})
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURED DESIGNERS (mobile carousel + shared desktop grid) */}
        <section className="section-pad">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.25rem' }}>
            <h2 className="section-heading">Featured Designers</h2>
            <Link href="/designers" style={{ fontSize: '0.85rem', color: '#544D3F', flexShrink: 0 }}>View all</Link>
          </div>
          <div className="designers-row">
            {designers.map((d) => (
              <div key={d.name} className="designer-card" style={{ textAlign: 'center', border: '1px solid #E5E0D7', borderRadius: '10px', padding: '1rem 0.5rem', background: '#fff', minWidth: 0 }}>
  <img src={d.img} alt={d.name} style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', marginBottom: '0.6rem' }} />
  <p style={{ fontWeight: 600, fontSize: '0.78rem', margin: '0 0 0.15rem', color: '#171714' }}>{d.name}</p>
  <p style={{ fontSize: '0.7rem', color: '#8A7F6A', margin: '0 0 0.35rem' }}>{d.country}</p>
  <p style={{ fontSize: '0.7rem', color: '#6B665D', margin: '0 0 0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2px' }}>
    <Star size={11} color="#D4A22C" fill="#D4A22C" /> {d.rating} ({d.count})
  </p>
  <button style={{ border: '1px solid #14201A', background: 'transparent', color: '#14201A', borderRadius: '5px', padding: '0.45rem 0', fontSize: '0.7rem', width: '100%', cursor: 'pointer' }}>Follow</button>
</div>
            ))}
          </div>
        </section>

        {/* DESIGNER CTA — mobile/tablet only, hero card already covers this role on desktop */}
        <section className="section-pad designer-cta-section">
          <div style={{ position: 'relative', background: '#14201A', borderRadius: '14px', overflow: 'hidden', minHeight: '200px', display: 'flex', alignItems: 'flex-end' }}>
            <img src="https://picsum.photos/seed/afristyle-cta/500/500" alt="Join as a designer" style={{ position: 'absolute', right: 0, top: 0, height: '100%', width: '42%', objectFit: 'cover' }} />
            <div style={{ position: 'relative', zIndex: 2, padding: '1.5rem', maxWidth: '58%' }}>
              <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.3rem', color: '#F7F3ED', margin: '0 0 0.6rem', lineHeight: 1.15 }}>Are you a designer?</h2>
              <p style={{ fontSize: '0.76rem', color: '#C9C2B0', margin: '0 0 1.1rem', lineHeight: 1.4 }}>Join thousands of African designers selling to the world.</p>
              <Link href="/auth/signup" style={{ display: 'inline-block', background: '#E7B96B', color: '#14201A', fontWeight: 600, fontSize: '0.76rem', padding: '0.65rem 1.1rem', borderRadius: '5px', textDecoration: 'none' }}>Sell on AfriStyle</Link>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="section-pad">
          <div style={{ background: '#28321F', borderRadius: '16px', padding: '2.25rem 1.5rem' }}>
            <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.4rem', color: '#F7F3ED', textAlign: 'center', margin: '0 0 1.75rem' }}>How It Works</h2>
            <div className="how-it-works-grid">
              <HowStep icon={<Search size={20} color="#E7B96B" />} num="1" title="Discover" desc="Explore unique designs from African designers." />
              <HowStep icon={<Users size={20} color="#E7B96B" />} num="2" title="Connect" desc="Connect with designers and learn their stories." />
              <HowStep icon={<ShoppingBag size={20} color="#E7B96B" />} num="3" title="Order" desc="Place your order securely." />
              <HowStep icon={<Package size={20} color="#E7B96B" />} num="4" title="Receive" desc="Get your items delivered anywhere in the world." />
            </div>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="section-pad">
          <div className="newsletter-section" style={{ background: '#fff', border: '1px solid #E5E0D7', borderRadius: '14px', padding: '1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 260px', minWidth: 0 }}>
              <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.25rem', margin: '0 0 0.6rem', color: '#171714' }}>Join Our Community</h2>
              <p style={{ fontSize: '0.83rem', color: '#6B665D', margin: '0 0 1.1rem', maxWidth: '380px' }}>Subscribe to get updates on new arrivals, designer stories and exclusive offers.</p>
              <div style={{ display: 'flex', gap: '0.6rem', maxWidth: '380px', flexWrap: 'wrap' }}>
                <input type="email" placeholder="Enter your email" style={{ flex: '1 1 160px', minWidth: 0, padding: '0.7rem 0.9rem', border: '1px solid #E5E0D7', borderRadius: '5px', fontSize: '0.83rem', outline: 'none' }} />
                <button style={{ padding: '0.7rem 1.3rem', background: '#14201A', color: '#F7F3ED', border: 'none', borderRadius: '5px', fontSize: '0.83rem', cursor: 'pointer', flexShrink: 0 }}>Subscribe</button>
              </div>
            </div>
            <div className="newsletter-images" style={{ display: 'flex', gap: '0.6rem', flexShrink: 0 }}>
              {['nl1', 'nl2', 'nl3', 'nl4'].map((seed) => (
                <img key={seed} src={`https://picsum.photos/seed/afristyle-${seed}/150/150`} alt="" style={{ width: '85px', height: '85px', borderRadius: '8px', objectFit: 'cover' }} />
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="section-pad footer-section" style={{ paddingBottom: '2.75rem', marginTop: '1rem' }}>
          <div className="footer-content">
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--font-playfair)', fontWeight: 700, fontSize: '1.15rem', color: '#F7F3ED' }}>AfriStyle</div>
              <p style={{ fontSize: '0.78rem', color: '#C9C2B0', margin: '0.6rem 0 1rem', lineHeight: 1.7, maxWidth: '280px' }}>Empowering African designers. Connecting the world to African fashion.</p>
            </div>
            <div className="footer-links">
              <FooterCol title="Shop" links={['All Products', 'New Arrivals', 'Best Sellers', 'Gift Cards']} />
              <FooterCol title="Company" links={['About Us', 'Our Designers', 'Blog', 'Careers']} />
              <FooterCol title="Help" links={['FAQs', 'Shipping & Delivery', 'Returns', 'Contact Us']} />
              <FooterCol title="For Designers" links={['Join as Designer', 'Designer Resources', 'Sell on AfriStyle']} />
            </div>
          </div>
          <div style={{ textAlign: 'right', fontSize: '0.75rem', color: '#8A7F6A', marginTop: '1.5rem' }}>English (USD)</div>
        </footer>
      </div>

      <style>{`
        .hero-desktop { display: none; }
        .hero-mobile-wrap { display: block; }
        .section-pad { padding: 2.25rem 1rem 0; min-width: 0; }
        .section-heading { font-family: var(--font-playfair); font-size: 1.25rem; margin: 0; color: #171714; }

        .category-cards { display: none; }
        .category-circles { display: flex; gap: 0.75rem; overflow-x: auto; padding-bottom: 0.25rem; -webkit-overflow-scrolling: touch; }

        .product-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.85rem; }

        .designers-row { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0.6rem; }
        .designer-card { width: auto; min-width: 0; }

        .newsletter-images { display: none; }
        .how-it-works-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.4rem; }
        .footer-section { background: #14201A; border-top: 1px solid rgba(255,255,255,0.08); border-radius: 20px; }
        .footer-content { display: grid; grid-template-columns: 1fr; gap: 1.75rem; }
        .footer-links { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.5rem; }
        .hero-mobile-card { display: grid; grid-template-columns: 1fr; }
        .hero-mobile-content { width: 100%; max-width: 100%; }
        .hero-mobile-image-wrap { width: 55%; }

        @media (min-width: 640px) {
          .hero-mobile-card { grid-template-columns: 1fr 0.95fr; }
          .hero-mobile-content { padding-left: 32px; padding-right: 24px; max-width: 420px; }
          .hero-mobile-image-wrap { width: 55%; }
        }

        @media (min-width: 768px) {
          .hero-desktop { display: block !important; padding-top: 1.25rem; }
          .hero-mobile-wrap { display: none !important; }
          .designer-cta-section { display: none; } /* hero designer card covers this role on desktop+ */

          .section-pad { padding: 2.75rem 24px 0; }
          .section-heading { font-size: 1.5rem !important; }

          .category-circles { display: none !important; }
          .category-cards { display: grid !important; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }
          .product-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }

          .designers-row { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1.2rem; }

          .how-it-works-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1.5rem !important; }
          .footer-content { grid-template-columns: 1fr 2fr !important; gap: 2.75rem !important; }
          .footer-links { grid-template-columns: repeat(4, minmax(0, 1fr)) !important; gap: 1.75rem !important; }
        }

        @media (min-width: 1024px) {
          .section-pad { padding: 3.5rem 40px 0; }
          .category-cards { grid-template-columns: repeat(6, minmax(0, 1fr)); }
          .product-grid { grid-template-columns: repeat(6, minmax(0, 1fr)); }
          .newsletter-images { display: flex !important; }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .hero-desktop-card { min-height: 400px !important; }
          .hero-desktop-text { flex: 0 0 50% !important; padding: 32px 0 32px 28px !important; }
          .hero-desktop-heading { font-size: 2.1rem !important; }
          .hero-benefits-row { gap: 0.9rem !important; }
          .hero-desktop-image-wrap { min-width: 200px; }
          .hero-designer-card { padding: 0.7rem 0.9rem !important; right: 12px !important; bottom: 12px !important; }
        }
      `}</style>
    </div>
  )
}

function BenefitCol({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem', textAlign: 'center', flex: '1 1 0', minWidth: 0 }}>
      {icon}
      <p style={{ fontWeight: 600, fontSize: '0.66rem', margin: 0, color: '#171714' }}>{title}</p>
      <p style={{ fontSize: '0.6rem', color: '#6B665D', margin: 0, lineHeight: 1.3 }}>{desc}</p>
    </div>
  )
}

function HeroBenefit({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', maxWidth: '150px' }}>
      <div style={{ marginTop: '2px', flexShrink: 0 }}>{icon}</div>
      <div style={{ minWidth: 0 }}>
        <p style={{ fontWeight: 600, fontSize: '0.7rem', margin: '0 0 0.15rem', color: '#171714' }}>{title}</p>
        <p style={{ fontSize: '0.62rem', color: '#6B665D', margin: 0, lineHeight: 1.35 }}>{desc}</p>
      </div>
    </div>
  )
}

function HowStep({ icon, num, title, desc }: { icon: React.ReactNode; num: string; title: string; desc: string }) {
  return (
    <div style={{ flex: '1 1 0', textAlign: 'left', minWidth: 0 }}>
      <div style={{ marginBottom: '0.6rem' }}>{icon}</div>
      <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#F7F3ED', margin: '0 0 0.3rem' }}>{num}. {title}</p>
      <p style={{ fontSize: '0.78rem', color: '#C9C2B0', margin: 0, lineHeight: 1.5, maxWidth: '200px' }}>{desc}</p>
    </div>
  )
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div style={{ minWidth: 0 }}>
      <p style={{ fontWeight: 600, fontSize: '0.8rem', color: '#F7F3ED', marginBottom: '0.75rem' }}>{title}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {links.map((l) => <Link key={l} href="#" style={{ fontSize: '0.78rem', color: '#C9C2B0', textDecoration: 'none', lineHeight: 1.6 }}>{l}</Link>)}
      </div>
    </div>
  )
}