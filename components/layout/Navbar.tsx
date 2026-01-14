"use client"

import Link from "next/link"
import { supabase } from "@/services/supabase/client"
import { useEffect, useState } from "react"

export default function Navbar() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
    })
  }, [])

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 24px",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <Link href="/" style={{ fontWeight: 600 }}>
        RoomFinder
      </Link>

      <div style={{ display: "flex", gap: 16 }}>
        <Link href="/rooms">Find Rooms</Link>

        {user ? (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <button
              onClick={() => supabase.auth.signOut()}
              style={{ cursor: "pointer" }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link href="/auth">Login</Link>
        )}
      </div>
    </nav>
  )
}
