import { useEffect, useState } from "react"
import { getSupabaseClient } from "@/services/supabase/client"
import { useAuth } from "./useAuth"

type Profile = {
  email: string
  role: "user" | "owner" | "admin"
  name?: string
}

export function useProfile() {
  const { user, loading: authLoading } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }

    const loadProfile = async () => {
      const supabase = getSupabaseClient()
      if (!supabase) throw new Error("Supabase client not found") 
      const { data, error } = await supabase
        .from("profiles")
        .select("role, name")
        .eq("id", user.id)
        .single()
        console.log("PROFILE FETCH RESULT:", data, error)
      if (!error) {
        setProfile({
          email: user.email ?? "",
          role: data.role,
          name: data.name ?? undefined,
        })
      }

      setLoading(false)
    }

    loadProfile()
  }, [user])

  return { profile, loading: authLoading || loading }
}
