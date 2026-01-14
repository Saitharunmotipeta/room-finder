"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { supabase } from "@/services/supabase/client"
import { addRecentlyViewed } from "@/utils/recentlyViewed"

type Room = {
  id: string
  title: string
  location: string
  rent: number
  property_type: string
  tenant_preference: string
  owner_email: string
  room_images: {
    image_url: string
  }[]
}

export default function RoomDetailsPage() {
  const params = useParams<{ id: string }>()
  const roomId = params.id

  const [room, setRoom] = useState<Room | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!roomId) return

    // ⭐ Track recently viewed room
    addRecentlyViewed(roomId)

    const loadRoom = async () => {
      const { data, error } = await supabase
        .from("rooms")
        .select(
          `
          id,
          title,
          location,
          rent,
          property_type,
          tenant_preference,
          owner_email,
          room_images ( image_url )
        `
        )
        .eq("id", roomId)
        .single()

      if (!error) {
        setRoom(data)
      }

      setLoading(false)
    }

    loadRoom()
  }, [roomId])

  if (loading) return <p>Loading room...</p>
  if (!room) return <p>Room not found</p>

  return (
    <div style={{ padding: 24 }}>
      <h1>{room.title}</h1>

      {room.room_images?.[0] && (
        <img
          src={room.room_images[0].image_url}
          alt="Room"
          width={400}
          style={{ marginBottom: 16 }}
        />
      )}

      <p>
        <strong>Location:</strong> {room.location}
      </p>
      <p>
        <strong>Rent:</strong> ₹{room.rent}
      </p>
      <p>
        <strong>Property Type:</strong> {room.property_type}
      </p>
      <p>
        <strong>Tenant Preference:</strong> {room.tenant_preference}
      </p>

      <hr style={{ margin: "24px 0" }} />

      <h3>Owner Contact</h3>
      <p>Email: {room.owner_email}</p>
    </div>
  )
}
