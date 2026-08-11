'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function UploadPortfolioItem() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [sellerId, setSellerId] = useState<string | null>(null)
  const [checkingAuth, setCheckingAuth] = useState(true)

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    occasion_tags: '',
    price_estimate: '',
    currency: 'NGN',
  })

  useEffect(() => {
    async function loadSeller() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth/login')
        return
      }

      // find this user's seller_profile row
      const { data: profile, error: profileError } = await supabase
        .from('seller_profiles')
        .select('id')
        .eq('user_id', user.id)
        .single()

      if (profileError || !profile) {
        setError('No seller profile found. Please complete seller onboarding first.')
        setCheckingAuth(false)
        return
      }

      setSellerId(profile.id)
      setCheckingAuth(false)
    }
    loadSeller()
  }, [router])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!file || !sellerId) {
      setError('Please choose an image file.')
      return
    }
    setLoading(true)
    setError(null)

    const fileExt = file.name.split('.').pop()
    const fileName = `${crypto.randomUUID()}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('portfolio-images')
      .upload(fileName, file)

    if (uploadError) {
      setError(uploadError.message)
      setLoading(false)
      return
    }

    const { data: publicUrlData } = supabase.storage
      .from('portfolio-images')
      .getPublicUrl(fileName)

    const { error: insertError } = await supabase.from('portfolio_items').insert({
      seller_id: sellerId,
      title: form.title,
      description: form.description,
      image_url: publicUrlData.publicUrl,
      category: form.category,
      occasion_tags: form.occasion_tags
        ? form.occasion_tags.split(',').map((tag) => tag.trim())
        : [],
      price_estimate: form.price_estimate ? Number(form.price_estimate) : null,
      currency: form.currency,
    })

    if (insertError) {
      setError(insertError.message)
      setLoading(false)
      return
    }

    setLoading(false)
    router.push('/portfolio/upload/success')
  }

  if (checkingAuth) return <p style={{ padding: '2rem' }}>Loading...</p>

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', padding: '1rem' }}>
      <h1>Upload Portfolio Item</h1>
      {!sellerId && error && <p style={{ color: 'red' }}>{error}</p>}
      {sellerId && (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
          <input name="category" placeholder="Category (e.g. ankara, lace, adire)" value={form.category} onChange={handleChange} />
          <input name="occasion_tags" placeholder="Occasion tags, comma separated" value={form.occasion_tags} onChange={handleChange} />
          <input name="price_estimate" placeholder="Price estimate" value={form.price_estimate} onChange={handleChange} />
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} required />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </form>
      )}
    </div>
  )
}