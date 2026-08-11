'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const editorialImage =
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80'

export default function SignUpPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const [form, setForm] = useState({
    full_name: '',
    phone_number: '',
    email: '',
    password: '',
    role: 'buyer',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!form.full_name.trim() || !form.phone_number.trim() || !form.email.trim() || !form.password.trim()) {
      setError('Please complete all fields to create your account.')
      return
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters long.')
      return
    }

    setLoading(true)
    setError(null)

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: form.email.trim(),
      password: form.password,
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    if (!authData.user) {
      setError('Sign up failed — no user returned.')
      setLoading(false)
      return
    }

    const { error: profileError } = await supabase.from('users').insert({
      id: authData.user.id,
      full_name: form.full_name.trim(),
      phone_number: form.phone_number.trim(),
      email: form.email.trim(),
      role: form.role,
    })

    if (profileError) {
      setError(profileError.message)
      setLoading(false)
      return
    }

    setLoading(false)

    if (form.role === 'seller') {
      router.push('/onboarding/seller-profile')
    } else {
      router.push('/browse')
    }
  }

  return (
    <main className="auth-shell">
      <div className="auth-panel">
        <div className="auth-visual" aria-label="African fashion editorial image">
          <div className="auth-visual-overlay" />
          <div className="auth-visual-copy">
            <p className="auth-visual-kicker">Fashion without borders.</p>
            <p className="auth-visual-subtext">Discover African creativity, crafted for the world.</p>
          </div>
        </div>

        <section className="auth-form-area">
          <div className="auth-brand" aria-label="AfriStyle home">
            AfriStyle
          </div>

          <div className="auth-header">
            <h1>Create your account</h1>
            <p>Join a marketplace for exceptional African fashion and independent designers.</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="field-group">
              <label htmlFor="full_name">Full Name</label>
              <input
                id="full_name"
                name="full_name"
                type="text"
                value={form.full_name}
                onChange={handleChange}
                placeholder="Enter your full name"
                autoComplete="name"
                required
              />
            </div>

            <div className="field-group">
              <label htmlFor="phone_number">Phone Number</label>
              <input
                id="phone_number"
                name="phone_number"
                type="tel"
                value={form.phone_number}
                onChange={handleChange}
                placeholder="Enter your phone number"
                autoComplete="tel"
                required
              />
            </div>

            <div className="field-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                autoComplete="email"
                required
              />
            </div>

            <div className="field-group">
              <label htmlFor="password">Password</label>
              <div className="password-field">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="new-password"
                  minLength={6}
                  required
                />
                <button type="button" className="eye-button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((value) => !value)}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="field-group">
              <label htmlFor="role">I am joining as</label>
              <select id="role" name="role" value={form.role} onChange={handleChange} className="role-select">
                <option value="buyer">A shopper</option>
                <option value="seller">A designer / fabric seller</option>
              </select>
            </div>

            {error && (
              <div className="inline-error" role="alert">
                {error}
              </div>
            )}

            <button type="submit" className="primary-button" disabled={loading}>
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <div className="divider">
            <span>Or continue with</span>
          </div>

          <button type="button" className="google-button">
            <span className="google-mark">G</span>
            Continue with Google
          </button>

          <p className="signup-copy">
            Already have an account? <Link href="/auth/login">Log in</Link>
          </p>

          <p className="reassurance-copy">
            Your account gives you access to your orders, wishlist, designers and personalized recommendations.
          </p>
        </section>
      </div>

      <style jsx>{`
        .auth-shell {
          min-height: calc(100vh - 80px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px 20px 48px;
          background: #f7f3ed;
        }

        .auth-panel {
          width: min(1240px, 100%);
          display: grid;
          grid-template-columns: minmax(0, 1.06fr) minmax(0, 1.2fr);
          border: 1px solid rgba(40, 50, 31, 0.12);
          border-radius: 20px;
          overflow: hidden;
          background: #fff;
          box-shadow: 0 20px 40px rgba(20, 32, 26, 0.06);
        }

        .auth-visual {
          position: relative;
          min-height: 760px;
          background-image: url('${editorialImage}');
          background-size: cover;
          background-position: center;
        }

        .auth-visual-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(21, 26, 22, 0.12) 0%, rgba(21, 26, 22, 0.48) 100%);
        }

        .auth-visual-copy {
          position: absolute;
          left: 38px;
          right: 38px;
          bottom: 34px;
          z-index: 1;
          color: #f7f3ed;
        }

        .auth-visual-kicker {
          margin: 0 0 6px;
          font-family: var(--font-playfair), serif;
          font-size: clamp(2rem, 2vw, 3rem);
          line-height: 1.05;
          letter-spacing: -0.03em;
          font-weight: 600;
          max-width: 420px;
        }

        .auth-visual-subtext {
          margin: 0;
          font-size: 0.96rem;
          line-height: 1.6;
          color: rgba(247, 243, 237, 0.9);
          max-width: 360px;
        }

        .auth-form-area {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 40px 28px 36px;
          background: #f8f5f1;
        }

        .auth-brand {
          width: 100%;
          max-width: 420px;
          margin-bottom: 18px;
          font-family: var(--font-playfair), serif;
          font-size: clamp(2rem, 2vw, 2.4rem);
          font-weight: 700;
          color: #171714;
          letter-spacing: -0.04em;
        }

        .auth-header {
          width: 100%;
          max-width: 420px;
          margin-bottom: 18px;
        }

        .auth-header h1 {
          margin: 0 0 8px;
          font-family: var(--font-playfair), serif;
          font-size: clamp(2.35rem, 2.6vw, 3.2rem);
          line-height: 1.08;
          letter-spacing: -0.04em;
          color: #171714;
        }

        .auth-header p {
          margin: 0;
          font-size: 1rem;
          line-height: 1.6;
          color: #686258;
          max-width: 420px;
        }

        .auth-form {
          width: 100%;
          max-width: 420px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .field-group label {
          font-size: 0.92rem;
          font-weight: 600;
          color: #171714;
        }

        .field-group input,
        .password-field input,
        .role-select {
          width: 100%;
          height: 52px;
          border: 1px solid #e5e0d7;
          border-radius: 8px;
          background: #fff;
          color: #171714;
          padding: 0 16px;
          font-size: 0.96rem;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .field-group input::placeholder,
        .password-field input::placeholder {
          color: #8d877d;
        }

        .field-group input:focus,
        .password-field input:focus,
        .role-select:focus {
          outline: none;
          border-color: #28321f;
          box-shadow: 0 0 0 4px rgba(40, 50, 31, 0.08);
        }

        .password-field {
          position: relative;
        }

        .password-field input {
          padding-right: 46px;
        }

        .eye-button {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border: 0;
          background: transparent;
          color: #686258;
          cursor: pointer;
        }

        .inline-error {
          width: 100%;
          border: 1px solid rgba(182, 74, 58, 0.2);
          background: rgba(182, 74, 58, 0.06);
          color: #9d3d2e;
          border-radius: 8px;
          padding: 10px 12px;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .primary-button {
          width: 100%;
          height: 52px;
          border: none;
          border-radius: 8px;
          background: #151a16;
          color: #ffffff;
          font-size: 0.98rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.2s ease;
        }

        .primary-button:hover:not(:disabled) {
          background: #28321f;
        }

        .primary-button:disabled {
          opacity: 0.78;
          cursor: wait;
        }

        .divider {
          width: 100%;
          max-width: 420px;
          display: flex;
          align-items: center;
          gap: 14px;
          color: #686258;
          margin: 10px 0 12px;
          font-size: 0.86rem;
        }

        .divider::before,
        .divider::after {
          content: '';
          flex: 1;
          border-top: 1px solid rgba(104, 98, 88, 0.35);
        }

        .google-button {
          width: 100%;
          max-width: 420px;
          height: 50px;
          border: 1px solid #e5e0d7;
          border-radius: 8px;
          background: #fff;
          color: #171714;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: 0.96rem;
          font-weight: 600;
          cursor: pointer;
          transition: border-color 0.2s ease, background 0.2s ease;
        }

        .google-button:hover {
          background: #faf8f5;
          border-color: #d9d0c6;
        }

        .google-mark {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #f0f0f0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 700;
          color: #28321f;
          border: 1px solid rgba(40, 50, 31, 0.1);
        }

        .signup-copy {
          width: 100%;
          max-width: 420px;
          margin: 18px 0 0;
          text-align: center;
          color: #686258;
          font-size: 0.94rem;
        }

        .signup-copy a {
          color: #28321f;
          font-weight: 600;
          text-decoration: none;
        }

        .reassurance-copy {
          width: 100%;
          max-width: 420px;
          margin: 20px 0 0;
          text-align: center;
          color: #686258;
          font-size: 0.85rem;
          line-height: 1.6;
        }

        @media (max-width: 980px) {
          .auth-panel {
            grid-template-columns: minmax(0, 0.8fr) minmax(0, 1fr);
          }
        }

        @media (max-width: 768px) {
          .auth-shell {
            padding: 16px 16px 32px;
          }

          .auth-panel {
            grid-template-columns: 1fr;
            width: 100%;
          }

          .auth-visual {
            min-height: 220px;
            background-position: center top;
          }

          .auth-visual-copy {
            left: 22px;
            right: 22px;
            bottom: 18px;
          }

          .auth-visual-kicker {
            font-size: 2rem;
          }

          .auth-form-area {
            padding: 24px 18px 28px;
          }

          .auth-brand,
          .auth-header,
          .auth-form,
          .divider,
          .google-button,
          .signup-copy,
          .reassurance-copy {
            max-width: 100%;
          }
        }
      `}</style>
    </main>
  )
}