'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function SellerProfileOnboarding() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)

  const [form, setForm] = useState({
    seller_type: 'designer',
    business_name: '',
    bio: '',
    location_city: '',
    location_state: '',
    whatsapp_number: '',
    instagram_handle: '',
  })

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth/login')
        return
      }
      setUserId(user.id)
    }
    getUser()
  }, [router])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!userId) return

    if (!form.business_name.trim() || !form.bio.trim() || !form.location_city.trim() || !form.location_state.trim()) {
      setError('Please complete your business name, bio, and location so buyers can discover you.')
      return
    }

    setLoading(true)
    setError(null)

    const { error: insertError } = await supabase.from('seller_profiles').insert({
      user_id: userId,
      seller_type: form.seller_type,
      business_name: form.business_name.trim(),
      bio: form.bio.trim(),
      location_city: form.location_city.trim(),
      location_state: form.location_state.trim(),
      whatsapp_number: form.whatsapp_number.trim(),
      instagram_handle: form.instagram_handle.trim(),
    })

    if (insertError) {
      setError(insertError.message)
      setLoading(false)
      return
    }

    setLoading(false)
    router.push('/browse')
  }

  if (!userId) {
    return (
      <main className="page-shell">
        <div className="loading-card">Loading your designer workspace…</div>
      </main>
    )
  }

  return (
    <main className="page-shell">
      <section className="hero-card">
        <div className="hero-copy">
          <p className="eyebrow">AfriStyle for designers</p>
          <h1>Tell your story and start connecting with buyers.</h1>
          <p>Create a polished profile that reflects your aesthetic, your reach, and the craftsmanship behind your work.</p>
        </div>
        <div className="hero-panel" />
      </section>

      <section className="form-card">
        <form onSubmit={handleSubmit} className="form-grid">
          <div className="field-group full-width">
            <label htmlFor="seller_type">How do you create?</label>
            <select id="seller_type" name="seller_type" value={form.seller_type} onChange={handleChange}>
              <option value="designer">Fashion Designer</option>
              <option value="fabric_seller">Fabric Seller</option>
              <option value="both">Both</option>
            </select>
          </div>

          <div className="field-group">
            <label htmlFor="business_name">Business name</label>
            <input id="business_name" name="business_name" placeholder="e.g. Zola Atelier" value={form.business_name} onChange={handleChange} />
          </div>

          <div className="field-group">
            <label htmlFor="location_city">City</label>
            <input id="location_city" name="location_city" placeholder="Lagos" value={form.location_city} onChange={handleChange} />
          </div>

          <div className="field-group">
            <label htmlFor="location_state">State or region</label>
            <input id="location_state" name="location_state" placeholder="Lagos State" value={form.location_state} onChange={handleChange} />
          </div>

          <div className="field-group">
            <label htmlFor="whatsapp_number">WhatsApp number</label>
            <input id="whatsapp_number" name="whatsapp_number" placeholder="+234 800 000 0000" value={form.whatsapp_number} onChange={handleChange} />
          </div>

          <div className="field-group">
            <label htmlFor="instagram_handle">Instagram handle</label>
            <input id="instagram_handle" name="instagram_handle" placeholder="@zolaatelier" value={form.instagram_handle} onChange={handleChange} />
          </div>

          <div className="field-group full-width">
            <label htmlFor="bio">Tell buyers about your craft</label>
            <textarea id="bio" name="bio" placeholder="Share your story, your inspirations, your signature style and what makes your work special." value={form.bio} onChange={handleChange} rows={5} />
          </div>

          {error && <div className="inline-error">{error}</div>}

          <button type="submit" className="primary-button" disabled={loading}>
            {loading ? 'Saving profile…' : 'Complete profile'}
          </button>
        </form>
      </section>

      <style jsx>{`
        .page-shell {
          min-height: calc(100vh - 80px);
          padding: 28px 20px 48px;
          background: #f7f3ed;
        }

        .hero-card {
          max-width: 1180px;
          margin: 0 auto 20px;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 20px;
          border: 1px solid rgba(40, 50, 31, 0.12);
          border-radius: 20px;
          overflow: hidden;
          background: linear-gradient(135deg, #ffffff 0%, #f8f5f1 100%);
          box-shadow: 0 16px 36px rgba(20, 32, 26, 0.06);
        }

        .hero-copy {
          padding: 34px 32px;
        }

        .eyebrow {
          margin: 0 0 10px;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: #8a7f6a;
          font-size: 0.74rem;
          font-weight: 700;
        }

        .hero-copy h1 {
          margin: 0 0 12px;
          font-family: var(--font-playfair), serif;
          font-size: clamp(1.9rem, 2.4vw, 2.7rem);
          line-height: 1.1;
          color: #171714;
        }

        .hero-copy p {
          margin: 0;
          color: #686258;
          line-height: 1.7;
          max-width: 560px;
        }

        .hero-panel {
          min-height: 240px;
          background-image: url('https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80');
          background-size: cover;
          background-position: center;
        }

        .form-card {
          max-width: 1180px;
          margin: 0 auto;
          border: 1px solid rgba(40, 50, 31, 0.12);
          border-radius: 20px;
          background: #ffffff;
          box-shadow: 0 16px 36px rgba(20, 32, 26, 0.06);
          padding: 28px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .full-width {
          grid-column: 1 / -1;
        }

        label {
          font-size: 0.92rem;
          font-weight: 600;
          color: #171714;
        }

        input,
        select,
        textarea {
          width: 100%;
          border: 1px solid #e5e0d7;
          border-radius: 8px;
          background: #fff;
          color: #171714;
          padding: 13px 14px;
          font-size: 0.95rem;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        input:focus,
        select:focus,
        textarea:focus {
          outline: none;
          border-color: #28321f;
          box-shadow: 0 0 0 4px rgba(40, 50, 31, 0.08);
        }

        textarea {
          resize: vertical;
          min-height: 120px;
        }

        .inline-error {
          grid-column: 1 / -1;
          border: 1px solid rgba(182, 74, 58, 0.2);
          background: rgba(182, 74, 58, 0.06);
          color: #9d3d2e;
          border-radius: 8px;
          padding: 10px 12px;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .primary-button {
          grid-column: 1 / -1;
          width: 100%;
          height: 52px;
          border: none;
          border-radius: 8px;
          background: #151a16;
          color: #ffffff;
          font-size: 0.98rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .primary-button:hover:not(:disabled) {
          background: #28321f;
        }

        .primary-button:disabled {
          opacity: 0.8;
          cursor: wait;
        }

        .loading-card {
          max-width: 680px;
          margin: 60px auto 0;
          padding: 28px;
          text-align: center;
          border-radius: 16px;
          background: #ffffff;
          color: #171714;
          box-shadow: 0 12px 30px rgba(20, 32, 26, 0.06);
        }

        @media (max-width: 768px) {
          .page-shell {
            padding: 16px 16px 32px;
          }

          .hero-card {
            grid-template-columns: 1fr;
          }

          .hero-copy {
            padding: 24px 20px 12px;
          }

          .hero-panel {
            min-height: 180px;
          }

          .form-card {
            padding: 20px;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  )
}