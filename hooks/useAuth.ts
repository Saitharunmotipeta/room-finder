import { useEffect, useState } from "react"
import { getSupabaseClient } from "@/services/supabase/client"

export function useAuth() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const supabase = getSupabaseClient()
      if (!supabase) throw new Error("Supabase client not found") 

    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return
      setUser(data.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } =
      supabase.auth.onAuthStateChange((_event, session) => {
        if (!mounted) return
        setUser(session?.user ?? null)
      })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  return {
    user,
    isAuthenticated: !!user,
    loading,
  }
}
