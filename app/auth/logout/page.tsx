'use client'

import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Logout() {
  const router = useRouter()

  useEffect(() => {
    async function doLogout() {
      await supabase.auth.signOut()
      router.push('/auth/login')
    }
    doLogout()
  }, [router])

  return <p style={{ padding: '2rem' }}>Logging out...</p>
}