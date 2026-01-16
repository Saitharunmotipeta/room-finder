"use client"

import { useEffect, useState } from "react"
import { redirect } from "next/navigation"
import { supabase } from "@/services/supabase/client"
import { useProfile } from "@/hooks/useProfile"
import { useAuth } from "@/hooks/useAuth"
import { Trash2 } from "lucide-react"

type Room = {
  id: string
  title: string
  location: string
  rent: number
  owner_email: string
}

export default function AdminPage() {
  const { user } = useAuth()
  const { profile } = useProfile()

  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)

  /* ---------- Guard ---------- */
  useEffect(() => {
    if (!user) return
    if (profile && profile.role !== "admin") {
      redirect("/dashboard")
    }
  }, [user, profile])

  /* ---------- Load Rooms ---------- */
  useEffect(() => {
    if (!user || profile?.role !== "admin") return

    const loadRooms = async () => {
      const { data } = await supabase
        .from("rooms")
        .select("id, title, location, rent, owner_email")
        .order("created_at", { ascending: false })

      setRooms(data || [])
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

  if (loading) {
    return <main style={page}><p>Loading admin dashboard…</p></main>
  }

  return (
    <main style={page}>
      {/* ---------- Header ---------- */}
      <section style={headerCard}>
        <h1 style={headerTitle}>Admin Dashboard</h1>
        <p style={headerSubtitle}>
          Manage all room listings published on the platform.
        </p>
      </section>

      {/* ---------- Table ---------- */}
      <section style={tableCard}>
        {rooms.length === 0 ? (
          <p style={empty}>No rooms available.</p>
        ) : (
          <table style={table}>
            <thead>
              <tr>
                <th style={th}>Title</th>
                <th style={th}>Location</th>
                <th style={th}>Rent</th>
                <th style={th}>Owner Email</th>
                <th style={{ ...th, textAlign: "center" }}>Action</th>
              </tr>
            </thead>

            <tbody>
              {rooms.map((room) => (
                <tr key={room.id} style={tr}>
                  <td style={td}>{room.title}</td>
                  <td style={td}>{room.location}</td>
                  <td style={td}>₹{room.rent}</td>
                  <td style={td}>{room.owner_email}</td>
                  <td style={{ ...td, textAlign: "center" }}>
                    <button
                      onClick={() => handleDelete(room.id)}
                      style={deleteBtn}
                      title="Delete room"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  )
}

/* ---------------- Styles ---------------- */

const page = {
  minHeight: "100vh",
  padding: 32,
  background: "#f8fafc",
}

const headerCard = {
  background: "#ffffff",
  padding: 24,
  borderRadius: 12,
  marginBottom: 24,
  border: "1px solid #e5e7eb",
}

const headerTitle = {
  fontSize: 26,
  fontWeight: 700,
  marginBottom: 6,
  color: "#0f172a",
}

const headerSubtitle = {
  fontSize: 14,
  color: "#475569",
}

const tableCard = {
  background: "#ffffff",
  borderRadius: 12,
  border: "1px solid #e5e7eb",
  overflowX: "auto" as const,
}

const table = {
  width: "100%",
  borderCollapse: "collapse" as const,
}

const th = {
  padding: "16px",
  fontSize: 13,
  fontWeight: 600,
  color: "#334155",
  background: "#f1f5f9",
  borderBottom: "2px solid #e5e7eb",
  textAlign: "left" as const,
}

const td = {
  padding: "16px",
  fontSize: 14,
  color: "#0f172a",
  borderBottom: "1px solid #e5e7eb",
}

const tr = {
  transition: "background 0.15s ease",
}

const deleteBtn = {
  background: "#fee2e2",
  color: "#b91c1c",
  border: "none",
  padding: 8,
  borderRadius: 8,
  cursor: "pointer",
}

const empty = {
  padding: 24,
  color: "#64748b",
}
