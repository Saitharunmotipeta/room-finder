"use client"

import { useEffect, useState } from "react"
import { getPublicRooms } from "@/features/rooms/room.service"
import { Room } from "@/types/room"

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadRooms = async () => {
      try {
        const data = await getPublicRooms()
        setRooms(data)
      } finally {
        setLoading(false)
      }
    }

    loadRooms()
  }, [])

  if (loading) {
    return (
      <div style={{ padding: "40px 0" }}>
        <h2>Loading rooms…</h2>
        <p>Please wait while we fetch available listings.</p>
      </div>
    )
  }

  return (
    <section style={{ padding: "40px 0" }}>
      <header style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700 }}>
          Available Rooms
        </h1>
        <p style={{ color: "#555", marginTop: 8 }}>
          Browse rooms based on location, budget, and preferences.
        </p>
      </header>

      {rooms.length === 0 ? (
        <EmptyState />
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      )}
    </section>
  )
}

/* ---------- Sub Components (Clean & Reusable) ---------- */

function RoomCard({ room }: { room: Room }) {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        padding: 16,
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <h3 style={{ fontSize: 18, fontWeight: 600 }}>
        {room.title}
      </h3>

      <p style={{ color: "#555" }}>
        📍 {room.location}
      </p>

      <p style={{ fontWeight: 500 }}>
        ₹ {room.rent.toLocaleString()}
      </p>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Tag label={room.property_type} />
        <Tag label={room.tenant_preference} />
      </div>
    </div>
  )
}

function Tag({ label }: { label: string }) {
  return (
    <span
      style={{
        fontSize: 12,
        padding: "4px 8px",
        borderRadius: 12,
        backgroundColor: "#f3f4f6",
        color: "#374151",
      }}
    >
      {label}
    </span>
  )
}

function EmptyState() {
  return (
    <div
      style={{
        padding: 40,
        textAlign: "center",
        border: "1px dashed #d1d5db",
        borderRadius: 8,
      }}
    >
      <h3 style={{ fontSize: 20, marginBottom: 8 }}>
        No rooms found
      </h3>
      <p style={{ color: "#666" }}>
        Try searching in a different location or check back later.
      </p>
    </div>
  )
}
