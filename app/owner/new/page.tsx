"use client"

import { useState } from "react"
import { getSupabaseClient } from "@/services/supabase/client"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { ImagePlus } from "lucide-react"

export default function AddRoomPage() {
  const { user } = useAuth()
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")
  const [rent, setRent] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    if (!user) return

    if (!title || !location || !rent) {
      alert("Please fill all required fields")
      return
    }

    setLoading(true)
    const supabase = getSupabaseClient()
      if (!supabase) throw new Error("Supabase client not found") 

    // 1️⃣ Insert room
    const { data: room, error } = await supabase
      .from("rooms")
      .insert({
        title,
        location,
        rent: Number(rent),
        owner_id: user.id,
        owner_email: user.email,
      })
      .select("id")
      .single()

    if (error || !room) {
      alert("Failed to create room")
      setLoading(false)
      return
    }

    // 2️⃣ Optional image
    if (imageUrl.trim()) {
      await supabase.from("room_images").insert({
        room_id: room.id,
        image_url: imageUrl,
      })
    }

    setLoading(false)
    router.replace("/owner")
  }

  return (
    <main style={page}>
      <h1 style={titleStyle}>Add New Room</h1>
      <p style={subtitle}>
        Provide accurate details to attract the right tenants.
      </p>

      <div style={form}>
        {/* Title */}
        <div>
          <label style={label}>Room Title *</label>
          <input
            style={input}
            placeholder="e.g. Spacious 1BHK near Metro"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Location */}
        <div>
          <label style={label}>Location *</label>
          <input
            style={input}
            placeholder="City / Area (e.g. Bangalore - Whitefield)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* Rent */}
        <div>
          <label style={label}>Monthly Rent (₹) *</label>
          <input
            type="number"
            style={input}
            placeholder="e.g. 12000"
            value={rent}
            onChange={(e) => setRent(e.target.value)}
          />
        </div>

        {/* Image URL */}
        <div>
          <label style={label}>Room Image URL (optional)</label>
          <div style={imageInputWrapper}>
            <ImagePlus size={18} />
            <input
              style={imageInput}
              placeholder="https://example.com/room.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
        </div>

        {/* Submit */}
        <button onClick={submit} style={button} disabled={loading}>
          {loading ? "Creating Room…" : "Create Room"}
        </button>
      </div>
    </main>
  )
}

/* ---------------- Styles ---------------- */

const page = {
  minHeight: "100vh",
  padding: 32,
  background: "#f8fafc",
}

const titleStyle = {
  fontSize: 26,
  fontWeight: 700,
  color: "#0f172a",
  marginBottom: 4,
}

const subtitle = {
  fontSize: 14,
  color: "#64748b",
  marginBottom: 24,
}

const form = {
  maxWidth: 460,
  background: "#ffffff",
  padding: 24,
  borderRadius: 12,
  border: "1px solid #e5e7eb",
  display: "flex",
  flexDirection: "column" as const,
  gap: 18,
}

const label = {
  fontSize: 13,
  fontWeight: 600,
  color: "#374151",
  marginBottom: 6,
  display: "block",
}

const input = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #cbd5e1",
  fontSize: 14,
}

const imageInputWrapper = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px dashed #cbd5e1",
  color: "#475569",
}

const imageInput = {
  border: "none",
  outline: "none",
  flex: 1,
  fontSize: 14,
}

const button = {
  marginTop: 8,
  padding: "12px",
  borderRadius: 10,
  background: "#4f46e5",
  color: "#ffffff",
  fontWeight: 600,
  border: "none",
  cursor: "pointer",
}
