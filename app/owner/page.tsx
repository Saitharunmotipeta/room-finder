"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/services/supabase/client"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"

export default function OwnerPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [rooms, setRooms] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    const loadRooms = async () => {
      const { data } = await supabase
        .from("rooms")
        .select("*")
        .eq("owner_id", user.id)
        .order("created_at", { ascending: false })

      setRooms(data || [])
      setLoading(false)
    }

    loadRooms()
  }, [user])

  const deleteRoom = async (id: string) => {
    await supabase.from("rooms").delete().eq("id", id)
    setRooms((prev) => prev.filter((r) => r.id !== id))
  }

  if (loading) return <p style={{ padding: 24 }}>Loading…</p>

  return (
    <main style={{ padding: 24 }}>
      <h1>Owner Dashboard</h1>

      <button
        onClick={() => router.push("/owner/new")}
        style={{ marginBottom: 20 }}
      >
        ➕ Add New Room
      </button>

      {rooms.length === 0 ? (
        <p>No rooms yet</p>
      ) : (
        rooms.map((room) => (
          <div key={room.id} style={{ borderBottom: "1px solid #ddd", padding: 12 }}>
            <h3>{room.title}</h3>
            <p>{room.location}</p>
            <button onClick={() => deleteRoom(room.id)} style={{ color: "red" }}>
              Delete
            </button>
          </div>
        ))
      )}
    </main>
  )
}
