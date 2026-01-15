"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/services/supabase/client"
import { useProfile } from "@/hooks/useProfile"
import { useAuth } from "@/hooks/useAuth"

type Room = {
  id: string
  title: string
  location: string
  rent: number
  owner_email: string
}

export default function AdminPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { profile } = useProfile()

  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)

  /* ---------- Guard: Only admins allowed ---------- */
  useEffect(() => {
    if (!user) return
    if (profile && profile.role !== "admin") {
      router.replace("/dashboard")
    }
  }, [user, profile, router])

  /* ---------- Load all rooms ---------- */
  useEffect(() => {
    if (!user || profile?.role !== "admin") return

    const loadRooms = async () => {
      const { data } = await supabase
        .from("rooms")
        .select("id, title, location, rent, owner_email")
        .order("created_at", { ascending: false })

      if (data) setRooms(data)
      setLoading(false)
    }

    loadRooms()
  }, [user, profile])

  const handleDelete = async (roomId: string) => {
    const confirmed = confirm("Delete this room permanently?")
    if (!confirmed) return

    await supabase.from("rooms").delete().eq("id", roomId)
    setRooms((prev) => prev.filter((r) => r.id !== roomId))
  }

  if (loading) return <p style={{ padding: 24 }}>Loading admin panel...</p>

  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ marginBottom: 6 }}>Admin Panel</h1>
      <p style={{ color: "#555", marginBottom: 24 }}>
        Manage all room listings
      </p>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: "1px solid #e5e7eb",
        }}
      >
        <thead>
          <tr style={{ background: "#f9fafb" }}>
            <th style={th}>Title</th>
            <th style={th}>Location</th>
            <th style={th}>Rent</th>
            <th style={th}>Owner</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td style={td}>{room.title}</td>
              <td style={td}>{room.location}</td>
              <td style={td}>₹{room.rent}</td>
              <td style={td}>{room.owner_email}</td>
              <td style={td}>
                <button
                  onClick={() => handleDelete(room.id)}
                  style={{ color: "red" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}

const th = {
  padding: 12,
  textAlign: "left" as const,
  borderBottom: "1px solid #e5e7eb",
}

const td = {
  padding: 12,
  borderBottom: "1px solid #e5e7eb",
}
