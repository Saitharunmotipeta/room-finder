"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "@/services/supabase/client"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      setUser(user)
      setLoading(false)
    }

    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/dashboard")
  }

  if (loading) return null

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "12px 24px",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <Link href="/dashboard" style={{ fontWeight: 600 }}>
        RoomFinder
      </Link>

      <div style={{ display: "flex", gap: 16 }}>
        {!user ? (
          <>
            <Link href="/dashboard">Find Rooms</Link>
            <Link href="/login">Login</Link>
          </>
        ) : (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  )
}
