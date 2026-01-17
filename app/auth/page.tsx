"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseClient } from "@/services/supabase/client"

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const supabase = getSupabaseClient()
      if (!supabase) throw new Error("Supabase client not found") 
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.replace("/dashboard")
      } else {
        router.replace("/login")
      }
    })
  }, [router])

  return <p>Signing you in...</p>
}
