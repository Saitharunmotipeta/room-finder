"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { supabase } from "@/services/supabase/client"
import { addRecentlyViewed } from "@/utils/recentlyViewed"
import { useAuth } from "@/hooks/useAuth"

type Room = {
  id: string
  title: string
  location: string
  rent: number
  property_type: string
  tenant_preference: string
  owner_email: string
  room_images: { image_url: string }[]
}

export default function RoomDetailsPage() {
  const { user, loading: authLoading } = useAuth()
  const params = useParams()
  const roomId = typeof params?.id === "string" ? params.id : null

  const [room, setRoom] = useState<Room | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // ⛔ wait for auth hydration
    if (authLoading) return

    if (!roomId) {
      setLoading(false)
      return
    }

    let mounted = true

    const loadRoom = async () => {
      const { data, error } = await supabase
        .from("rooms")
        .select(`
          id,
          title,
          location,
          rent,
          property_type,
          tenant_preference,
          owner_email,
          room_images ( image_url )
        `)
        .eq("id", roomId)
        .single()

      if (!mounted) return

      if (error) {
        console.error("Room fetch error:", error)
        setRoom(null)
      } else {
        setRoom(data)
        addRecentlyViewed(roomId)
      }

      setLoading(false)
    }

    loadRoom()

    return () => {
      mounted = false
    }
  }, [roomId, authLoading])

  /* ---------- UI STATES ---------- */

  if (authLoading || loading) {
    return (
      <main style={{ padding: 24 }}>
        <p style={{ color: "#64748b" }}>Loading room details…</p>
      </main>
    )
  }

  if (!room) {
    return (
      <main style={{ padding: 24 }}>
        <p style={{ color: "#ef4444" }}>Room not found</p>
      </main>
    )
  }

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h1>{room.title}</h1>

      {room.room_images?.length > 0 && (
        <img
          src={room.room_images[0].image_url}
          style={{ width: "100%", borderRadius: 8, marginBottom: 20 }}
        />
      )}

      <p><strong>Location:</strong> {room.location}</p>
      <p><strong>Rent:</strong> ₹{room.rent}</p>
      <p><strong>Type:</strong> {room.property_type}</p>
      <p><strong>Tenant:</strong> {room.tenant_preference}</p>

      <hr style={{ margin: "24px 0" }} />

      <h3>Owner Contact</h3>
      <p>{room.owner_email}</p>
    </main>
  )
}
