"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/services/supabase/client"
import { createRoom } from "@/features/rooms/room.service"

export default function NewRoomPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")
  const [rent, setRent] = useState("")

  const handleSubmit = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) return

    await createRoom({
      owner_id: session.user.id,
      title,
      location,
      rent: Number(rent),
      property_type: "1BHK",
      tenant_preference: "Bachelor",
      description: null,
    })

    router.push("/dashboard")
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Add Room</h1>

      <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="Location" onChange={(e) => setLocation(e.target.value)} />
      <input placeholder="Rent" onChange={(e) => setRent(e.target.value)} />

      <button onClick={handleSubmit}>Create</button>
    </div>
  )
}
