import { Room } from "@/types/room"
import Link from "next/link"
import { Heart, MapPin, IndianRupee, Eye } from "lucide-react"

type Props = {
  room: Room
  isAuthenticated: boolean
  onRequireLogin: () => void
  onSave?: (roomId: string) => void
  isSaved?: boolean
}

export default function RoomCard({
  room,
  isAuthenticated,
  onRequireLogin,
  onSave,
  isSaved,
}: Props) {
  const images =
    room.room_images?.length > 0
      ? room.room_images
      : [
          {
            image_url:
              "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
          },
        ]

  return (
    <div style={card}>
      {/* -------- Images -------- */}
      <div style={imageWrapper}>
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img.image_url}
            alt={`${room.title} ${idx + 1}`}
            style={image}
            loading="lazy"
          />
        ))}
      </div>

      {/* -------- Content -------- */}
      <div style={content}>
        <h3 style={title}>{room.title}</h3>

        <p style={location}>
          <MapPin size={14} />
          {room.location}
        </p>

        <p style={rent}>
          <IndianRupee size={16} />
          {room.rent}
        </p>

        {/* -------- Actions -------- */}
        <div style={actions}>
          {isAuthenticated ? (
            <Link href={`/rooms/${room.id}`} style={viewBtn}>
              <Eye size={16} />
              View
            </Link>
          ) : (
            <button style={viewBtn} onClick={onRequireLogin}>
              <Eye size={16} />
              View
            </button>
          )}

          {isAuthenticated && onSave && (
            <button
              style={{
                ...saveBtn,
                color: isSaved ? "#ef4444" : "#374151",
              }}
              onClick={() => onSave(room.id)}
            >
              <Heart
                size={16}
                fill={isSaved ? "#ef4444" : "none"}
              />
              {isSaved ? "Saved" : "Save"}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

/* ---------------- Styles ---------------- */

const card = {
  borderRadius: 14,
  background: "#ffffff",
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  overflow: "hidden",
  transition: "transform 0.15s ease",
}

const imageWrapper = {
  display: "flex",
  gap: 12,
  padding: 12,
  overflowX: "auto" as const,
}

const image = {
  minWidth: 240,
  height: 160,
  objectFit: "cover" as const,
  borderRadius: 10,
  flexShrink: 0,
}

const content = {
  padding: "8px 16px 16px",
}

const title = {
  fontSize: 16,
  fontWeight: 600,
  color: "#111827",
  marginBottom: 6,
}

const location = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  fontSize: 14,
  color: "#6b7280",
  marginBottom: 8,
}

const rent = {
  display: "flex",
  alignItems: "center",
  gap: 4,
  fontSize: 16,
  fontWeight: 600,
  color: "#111827",
  marginBottom: 14,
}

const actions = {
  display: "flex",
  gap: 10,
}

const viewBtn = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  padding: "8px 12px",
  borderRadius: 8,
  border: "1px solid #d1d5db",
  background: "#f9fafb",
  fontSize: 14,
  cursor: "pointer",
  textDecoration: "none",
  color: "#111827",
}

const saveBtn = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  padding: "8px 12px",
  borderRadius: 8,
  border: "1px solid #d1d5db",
  background: "#ffffff",
  fontSize: 14,
  cursor: "pointer",
}
