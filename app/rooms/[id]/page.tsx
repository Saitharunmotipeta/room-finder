"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { supabase } from "@/services/supabase/client"
import { addRecentlyViewed } from "@/utils/recentlyViewed"
import { useAuth } from "@/hooks/useAuth"
import {
  MapPin,
  IndianRupee,
  Home,
  Users,
  Mail,
  Image as ImageIcon,
} from "lucide-react"

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
  const { loading: authLoading } = useAuth()
  const params = useParams()
  const roomId = typeof params?.id === "string" ? params.id : null

  const [room, setRoom] = useState<Room | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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

      if (!error && data) {
        setRoom(data)
        addRecentlyViewed(roomId)
      } else {
        setRoom(null)
      }

      setLoading(false)
    }

    loadRoom()
    return () => {
      mounted = false
    }
  }, [roomId, authLoading])

  /* ---------------- States ---------------- */

  if (authLoading || loading) {
    return (
      <main style={page}>
        <p style={muted}>Loading room details…</p>
      </main>
    )
  }

  if (!room) {
    return (
      <main style={page}>
        <p style={error}>Room not found</p>
      </main>
    )
  }

  return (
    <main style={page}>
      {/* Title */}
      <h1 style={title}>{room.title}</h1>

      {/* Images */}
      {room.room_images?.length > 0 ? (
        <div style={imageGrid}>
          {room.room_images.map((img, idx) => (
            <img
              key={idx}
              src={img.image_url}
              alt={`Room ${idx + 1}`}
              style={image}
            />
          ))}
        </div>
      ) : (
        <div style={imagePlaceholder}>
          <ImageIcon size={28} />
          <span>No images available</span>
        </div>
      )}

      {/* Info Cards */}
      <div style={infoGrid}>
        <Info icon={<MapPin size={18} />} label="Location" value={room.location} />
        <Info
          icon={<IndianRupee size={18} />}
          label="Rent"
          value={`₹${room.rent}`}
        />
        <Info
          icon={<Home size={18} />}
          label="Property Type"
          value={room.property_type}
        />
        <Info
          icon={<Users size={18} />}
          label="Tenant Preference"
          value={room.tenant_preference}
        />
      </div>

      {/* Owner */}
      <section style={ownerCard}>
        <h3 style={sectionTitle}>Owner Contact</h3>
        <div style={ownerRow}>
          <Mail size={18} />
          <span>{room.owner_email}</span>
        </div>
      </section>
    </main>
  )
}

/* ---------------- Small UI Components ---------------- */

function Info({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div style={infoCard}>
      <div style={infoIcon}>{icon}</div>
      <div>
        <p style={infoLabel}>{label}</p>
        <p style={infoValue}>{value}</p>
      </div>
    </div>
  )
}

/* ---------------- Styles ---------------- */

const page = {
  maxWidth: 960,
  margin: "0 auto",
  padding: 24,
}

const title = {
  marginBottom: 16,
  color:"black",
}

const muted = {
  color: "#64748b",
}

const error = {
  color: "#ef4444",
}

const imageGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 12,
  marginBottom: 28,
}

const image = {
  width: "100%",
  height: 220,
  objectFit: "cover" as const,
  borderRadius: 10,
}

const imagePlaceholder = {
  height: 220,
  borderRadius: 10,
  background: "#f1f5f9",
  color: "#64748b",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  marginBottom: 28,
}

const infoGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 16,
  marginBottom: 32,
}

const infoCard = {
  display: "flex",
  gap: 12,
  padding: 16,
  color:"black",
  borderRadius: 12,
  border: "1px solid #e5e7eb",
  background: "#ffffff",
}

const infoIcon = {
  color: "#4f46e5",
  marginTop: 2,
}

const infoLabel = {
  fontSize: 13,
  color: "#black",
}

const infoValue = {
  fontWeight: 600,
}

const ownerCard = {
  borderTop: "1px solid black",
  paddingTop: 24,
  marginTop: 24,
  color:"black",
}

const sectionTitle = {
  marginBottom: 10,
}

const ownerRow = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  color: "#334155",
}
