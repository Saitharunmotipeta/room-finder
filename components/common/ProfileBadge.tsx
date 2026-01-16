"use client"

import { useEffect, useRef, useState } from "react"
import { supabase } from "@/services/supabase/client"
import { useProfile } from "@/hooks/useProfile"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { User, Shield, Home, LogOut } from "lucide-react"

export default function ProfileBadge() {
  /* ---------------- Hooks ---------------- */
  const { user } = useAuth()
  const { profile } = useProfile()
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  /* ---------------- Close on outside click ---------------- */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  if (!user) return null

  const displayName =
    profile?.name || user.email?.split("@")[0] || "User"

  const role = profile?.role || "user"

  const RoleIcon =
    role === "admin" ? Shield :
    role === "owner" ? Home :
    User

  /* ---------------- UI ---------------- */
  return (
    <div ref={ref} style={wrapper}>
      {/* Small Avatar */}
      <div
        onClick={() => setOpen((v) => !v)}
        style={avatar}
        title={displayName}
      >
        <User size={18} />
      </div>

      {/* Dropdown */}
      <div
        style={{
          ...dropdown,
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(-8px)",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        {/* Profile Header */}
        <div style={header}>
          <div style={avatarLarge}>
            <User size={30} />
          </div>

          <div>
            <p style={name}>{displayName}</p>
            <p style={email}>{user.email}</p>
          </div>
        </div>

        {/* Role */}
        <div style={roleRow}>
          {/* <RoleIcon size={16} /> */}
          <hr style={divider} />
          <strong><h3 style={{fontSize:15}}>Role:</h3></strong>
          <span style={roleText}>
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </span>
        </div>

        <hr style={divider} />

        {/* Logout */}
        <button
          style={{...logoutBtn, color:"red" }}
          onClick={async () => {
            await supabase.auth.signOut()
            router.replace("/")
          }}
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

/* ================== Styles ================== */

const wrapper = {
  position: "relative" as const,
}

const avatar = {
  width: 38,
  height: 38,
  borderRadius: "50%",
  background: "#111827",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
}

const dropdown = {
  position: "absolute" as const,
  right: 0,
  top: 48,
  width: 260,
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  padding: 16,
  boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
  transition: "all 0.18s ease",
  zIndex: 50,
}

const header = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  marginBottom: 12,
}

const avatarLarge = {
  width: 44,
  height: 44,
  borderRadius: "50%",
  background: "#eef2ff",
  color: "#4f46e5",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

const name = {
  fontWeight: 600,
  fontSize: 14,
}

const email = {
  fontSize: 13,
  color: "#64748b",
}

const roleRow = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  fontSize: 13,
  color: "#334155",
  marginBottom: 12,
}

const roleText = {
  textTransform: "capitalize" as const,
  fontWeight: 500,
}

const divider = {
  margin: "12px 0",
  border: "none",
  borderTop: "1px solid #e5e7eb",
}

const logoutBtn = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: "10px 12px",
  borderRadius: 8,
  background: "#fcf8f9",
  border: "1px solid #e5e7eb",
  cursor: "pointer",
  fontWeight: 500,
  hover : {background: "#f1f5f9"}
}
