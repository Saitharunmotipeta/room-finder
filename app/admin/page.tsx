"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/services/supabase/client"

type Room = {
  id: string
  title: string
  location: string
  rent: number
  created_at: string
}

export default function AdminPage() {
  const router = useRouter()

  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [stats, setStats] = useState({
    users: 0,
    rooms: 0,
  })

  useEffect(() => {
    const init = async () => {
      /* ------------------ AUTH CHECK ------------------ */
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.replace("/auth")
        return
      }

      /* ------------------ ROLE CHECK ------------------ */
      const { data: profiles, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)

        if (profileError || !profiles || profiles.length === 0) {
        console.error("Profile fetch failed", profileError)
        router.replace("/")
        return
        }

        const role = profiles[0].role

        if (role !== "admin") {
        router.replace("/")
        return
        }


      /* ------------------ SYSTEM STATS ------------------ */
      const [{ count: users }, { count: roomsCount }] = await Promise.all([
        supabase.from("profiles").select("*", { count: "exact", head: true }),
        supabase.from("rooms").select("*", { count: "exact", head: true }),
      ])

      setStats({
        users: users ?? 0,
        rooms: roomsCount ?? 0,
      })

      /* ------------------ FETCH ALL ROOMS ------------------ */
      const { data: roomsData, error: roomsError } = await supabase
        .from("rooms")
        .select("id, title, location, rent, created_at")
        .order("created_at", { ascending: false })

      if (roomsError) {
        setError("Failed to load rooms")
      } else {
        setRooms(roomsData || [])
      }

      setLoading(false)
    }

    init()
  }, [router])

  const handleDeleteRoom = async (roomId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this room?"
    )

    if (!confirmed) return

    const { error } = await supabase.from("rooms").delete().eq("id", roomId)

    if (error) {
      alert("Failed to delete room")
      return
    }

    setRooms((prev) => prev.filter((room) => room.id !== roomId))
    setStats((prev) => ({ ...prev, rooms: prev.rooms - 1 }))
  }

  /* ------------------ RENDER STATES ------------------ */

  if (loading) {
    return <p>Loading admin panel…</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div>
      <h1>Admin Panel</h1>

      <p style={{ color: "red", marginBottom: 16 }}>
        ⚠️ You are logged in as an administrator. Actions here affect the entire
        system.
      </p>

      {/* -------- SYSTEM OVERVIEW -------- */}
      <section style={{ marginBottom: 32 }}>
        <h2>System Overview</h2>
        <ul>
          <li>Total Users: {stats.users}</li>
          <li>Total Rooms: {stats.rooms}</li>
        </ul>
      </section>

      {/* -------- ROOM MODERATION -------- */}
      <section>
        <h2>Room Moderation</h2>

        {rooms.length === 0 && <p>No rooms available.</p>}

        {rooms.map((room) => (
          <div
            key={room.id}
            style={{
              border: "1px solid #ddd",
              padding: 12,
              marginBottom: 8,
            }}
          >
            <strong>{room.title}</strong>
            <div>{room.location}</div>
            <div>₹{room.rent}</div>

            <button
              onClick={() => handleDeleteRoom(room.id)}
              style={{ marginTop: 8, color: "red" }}
            >
              Delete Room
            </button>
          </div>
        ))}
      </section>
    </div>
  )
}
