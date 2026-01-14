"use client"

import { useEffect, useState } from "react"
import { getPublicRooms } from "@/features/rooms/room.service"
import { Room } from "@/types/room"

export default function HomePage() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadRooms = async () => {
      const data = await getPublicRooms()
      setRooms(data)
      setLoading(false)
    }

    loadRooms()
  }, [])

  if (loading) return <div>Loading rooms...</div>

  return (
    <div style={{ padding: 40 }}>
      <h1>Available Rooms</h1>

      {rooms.length === 0 && <p>No rooms available.</p>}

      {rooms.map((room) => (
        <div
          key={room.id}
          style={{
            border: "1px solid #ccc",
            padding: 12,
            marginBottom: 12,
          }}
        >
          <h3>{room.title}</h3>
          <p>{room.location}</p>
          <p>₹{room.rent}</p>
          <p>{room.property_type}</p>
          <p>{room.tenant_preference}</p>
        </div>
      ))}
    </div>
  )
}
