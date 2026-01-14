"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/services/supabase/client"
import { getMyRooms, deleteRoom } from "@/features/rooms/room.service"
import { Room } from "@/types/room"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [rooms, setRooms] = useState<Room[]>([])

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) return

      setUser(session.user)

      const myRooms = await getMyRooms(session.user.id)
      setRooms(myRooms)
    }

    init()
  }, [])

  const handleDelete = async (id: string) => {
    await deleteRoom(id)
    setRooms((prev) => prev.filter((r) => r.id !== id))
  }

  if (!user) return <div>Loading...</div>

  return (
    <div style={{ padding: 40 }}>
      <h1>My Rooms</h1>

      {rooms.length === 0 && <p>No rooms yet.</p>}

      {rooms.map((room) => (
        <div key={room.id} style={{ border: "1px solid #ccc", padding: 12 }}>
          <h3>{room.title}</h3>
          <p>{room.location}</p>
          <p>₹{room.rent}</p>
          <button onClick={() => handleDelete(room.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}
