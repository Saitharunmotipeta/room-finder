"use client"

import { useEffect, useRef, useState } from "react"
import { supabase } from "@/services/supabase/client"
import { useProfile } from "@/hooks/useProfile"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"

export default function ProfileBadge() {
  // 🔹 ALL HOOKS FIRST (no early returns)
  const { user } = useAuth()
  const { profile } = useProfile()
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // 🔹 Close when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  // 🔹 NOW conditional render (safe)
  if (!user) return null

  const displayName =
    profile?.name ||
    user.email?.split("@")[0] ||
    "User"

  const initial = displayName[0].toUpperCase()

  return (
    <div ref={ref} style={{ position: "relative" }}>
      {/* Avatar */}
      <div
        onClick={() => setOpen(true)}
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "#111",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 600,
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        {initial}
      </div>

      {/* Dropdown */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 44,
          width: 240,
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: 8,
          padding: 16,
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          transform: open ? "translateY(0)" : "translateY(-8px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "all 0.18s ease",
          zIndex: 50,
        }}
      >
        <p style={{ fontWeight: 600 }}>{displayName}</p>
        <p style={{ fontSize: 14, color: "#555" }}>{user.email}</p>

        <p style={{ marginTop: 8, fontSize: 14 }}>
          Role:{" "}
          <strong style={{ textTransform: "capitalize" }}>
            {profile?.role || "user"}
          </strong>
        </p>

        <hr style={{ margin: "12px 0" }} />

        <button
          onClick={async () => {
            await supabase.auth.signOut()
            router.push("/")
          }}
          style={{ width: "100%" }}
        >
          Logout
        </button>
      </div>
    </div>
  )
}
