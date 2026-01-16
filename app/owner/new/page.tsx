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
      <h1 style={{ color:"black" }}>Add Room</h1>

      <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} style={{color:"black"}}/>
      <input placeholder="Location" onChange={(e) => setLocation(e.target.value)} style={{color:"black"}}/>
      <input placeholder="Rent" onChange={(e) => setRent(e.target.value)} style={{color:"black"}} />

      <button onClick={submit}style={{color:"black", border:"1px solid #d1d5db"}}>Create</button>
    </main>
  )
}
