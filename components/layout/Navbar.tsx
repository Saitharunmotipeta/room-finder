"use client"

import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"
import { useProfile } from "@/hooks/useProfile"
import ProfileBadge from "@/components/common/ProfileBadge"

export default function Navbar() {
  const { isAuthenticated } = useAuth()
  const { profile } = useProfile()

  const role = profile?.role

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 24px",
        color : "#111827",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <Link href="/" style={{ fontWeight: 600 , fontSize: 25 ,fontFamily: 'Arial, sans-serif' }}>
        RoomFinder
      </Link>

      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        {!isAuthenticated && (
          <>
            <Link href="/dashboard">Find Rooms</Link>
            <Link href="/login">Login</Link>
          </>
        )}

        {isAuthenticated && role === "user" && (
          <>
            <Link href="/dashboard?view=explore">Explore</Link>
            <Link href="/dashboard?view=saved">Saved</Link>
            <Link href="/dashboard?view=recent">Recent</Link>
            <ProfileBadge />
          </>
        )}

        {isAuthenticated && role === "owner" && (
          <>
            <Link href="/owner">Owner</Link>
            <Link href="/owner/new">Add Room</Link>
            <ProfileBadge />
          </>
        )}

        {isAuthenticated && role === "admin" && (
          <>
            <Link href="/admin">Admin</Link>
            <ProfileBadge />
          </>
        )}
      </div>
    </nav>
  )
}
