"use client"

import { useState } from "react"
import { supabase } from "@/services/supabase/client"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"

export default function AddRoomPage() {
  const { user } = useAuth()
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")
  const [rent, setRent] = useState("")

  const submit = async () => {
    await supabase.from("rooms").insert({
      title,
      location,
      rent: Number(rent),
      owner_id: user?.id,
      owner_email: user?.email,
    })

    router.replace("/owner")
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Add Room</h1>

      <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="Location" onChange={(e) => setLocation(e.target.value)} />
      <input placeholder="Rent" onChange={(e) => setRent(e.target.value)} />

      <button onClick={submit}>Create</button>
    </main>
  )
}
