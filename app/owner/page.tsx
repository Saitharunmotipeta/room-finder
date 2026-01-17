"use client"

import { useEffect, useState } from "react"
import { getSupabaseClient } from "@/services/supabase/client"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { Plus, Trash2, MapPin, IndianRupee } from "lucide-react"

type Room = {
  id: string
  title: string
  location: string
  rent: number
}

export default function OwnerPage() {
  const { user } = useAuth()
  const router = useRouter()

  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    const loadRooms = async () => {
      const supabase = getSupabaseClient()
      if (!supabase) throw new Error("Supabase client not found") 
      const { data } = await supabase
        .from("rooms")
        .select("id, title, location, rent")
        .eq("owner_id", user.id)
        .order("created_at", { ascending: false })

      setRooms(data || [])
      setLoading(false)
    }

    loadRooms()
  }, [user])

  const deleteRoom = async (id: string) => {
    const confirmed = confirm("Delete this room permanently?")
    if (!confirmed) return
    const supabase = getSupabaseClient()
      if (!supabase) throw new Error("Supabase client not found") 

    await supabase.from("rooms").delete().eq("id", id)
    setRooms((prev) => prev.filter((r) => r.id !== id))
  }

  if (loading) {
    return <main style={page}><p>Loading owner dashboard…</p></main>
  }

  return (
    <main style={page}>
      {/* ---------- Header ---------- */}
      <section style={headerCard}>
        <div>
          <h1 style={headerTitle}>Owner Dashboard</h1>
          <p style={headerSubtitle}>
            Manage your room listings and availability.
          </p>
        </div>

        <button
          onClick={() => router.push("/owner/new")}
          style={addButton}
        >
          <Plus size={18} />
          Add New Room
        </button>
      </section>

      {/* ---------- Content ---------- */}
      {rooms.length === 0 ? (
        <div style={emptyState}>
          <p>You haven’t listed any rooms yet.</p>
        </div>
      ) : (
        <section style={grid}>
          {rooms.map((room) => (
            <div key={room.id} style={card}>
              <h3 style={cardTitle}>{room.title}</h3>

              <p style={cardMeta}>
                <MapPin size={14} />
                {room.location}
              </p>

              <p style={cardMeta}>
                <IndianRupee size={14} />
                {room.rent}
              </p>

              <button
                onClick={() => deleteRoom(room.id)}
                style={deleteBtn}
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          ))}
        </section>
      )}
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
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "#ffffff",
  padding: 24,
  borderRadius: 12,
  marginBottom: 28,
  border: "1px solid #e5e7eb",
}

const headerTitle = {
  fontSize: 26,
  fontWeight: 700,
  color: "#0f172a",
}

const headerSubtitle = {
  fontSize: 14,
  color: "#475569",
  marginTop: 4,
}

const addButton = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: "10px 16px",
  background: "#4f46e5",
  color: "#ffffff",
  border: "none",
  borderRadius: 10,
  fontWeight: 600,
  cursor: "pointer",
}

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
  gap: 20,
}

const card = {
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  padding: 18,
  display: "flex",
  flexDirection: "column" as const,
  gap: 10,
}

const cardTitle = {
  fontSize: 16,
  fontWeight: 600,
  color: "#0f172a",
}

const cardMeta = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  fontSize: 14,
  color: "#475569",
}

const deleteBtn = {
  marginTop: 8,
  display: "flex",
  alignItems: "center",
  gap: 6,
  alignSelf: "flex-start",
  padding: "6px 10px",
  background: "#fee2e2",
  color: "#b91c1c",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
}

const emptyState = {
  padding: 40,
  background: "#ffffff",
  borderRadius: 12,
  border: "1px dashed #cbd5e1",
  color: "#64748b",
  textAlign: "center" as const,
}
