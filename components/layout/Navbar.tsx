"use client"

import Link from "next/link"
import ProfileBadge from "@/components/common/ProfileBadge"
import { useAuth } from "@/hooks/useAuth"
import { useProfile } from "@/hooks/useProfile"

export default function Navbar() {
  const { isAuthenticated, loading } = useAuth()
  const { profile } = useProfile()

  if (loading) return null

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 24px",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      {/* Brand */}
      <Link href="/" style={{ fontWeight: 600, fontSize: 18 }}>
        RoomFinder
      </Link>

      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        {/* ---------------- Guest ---------------- */}
        {!isAuthenticated && (
          <>
            <Link href="/dashboard">Find Rooms</Link>
            <Link href="/login">Login</Link>
          </>
        )}

        {/* ---------------- User ---------------- */}
        {isAuthenticated && profile?.role === "user" && (
          <>
            <Link href="/dashboard?view=explore">Explore</Link>
            <Link href="/dashboard?view=saved">Saved</Link>
            <Link href="/dashboard?view=recent">Recent</Link>
            <ProfileBadge />
          </>
        )}

        {/* ---------------- Owner ---------------- */}
        {isAuthenticated && profile?.role === "owner" && (
          <>
            <Link href="/owner">Owner</Link>
            <Link href="/owner/rooms">My Rooms</Link>
            <ProfileBadge />
          </>
        )}

        {/* ---------------- Admin ---------------- */}
        {isAuthenticated && profile?.role === "admin" && (
          <>
            <Link href="/admin">Admin</Link>
            <Link href="/admin/owners">Owners</Link>
            <ProfileBadge />
          </>
        )}
      </div>
    </nav>
  )
}
