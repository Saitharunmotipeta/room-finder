import { Room } from "@/types/room"
import Link from "next/link"

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
  const image = room.room_images?.[0]?.image_url

  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        maxWidth: 420,
      }}
    >
      {image && (
        <img
          src={image}
          alt={room.title}
          style={{
            width: "100%",
            height: 200,
            objectFit: "cover",
            borderRadius: 6,
            marginBottom: 12,
          }}
        />
      )}

      <h3 style={{ margin: "8px 0" }}>{room.title}</h3>
      <p style={{ color: "#555" }}>{room.location}</p>
      <p style={{ fontWeight: 600 }}>₹{room.rent}</p>

      <div style={{ marginTop: 12, display: "flex", gap: 12 }}>
        {/* View Details */}
        {isAuthenticated ? (
          <Link href={`/rooms/${room.id}`} prefetch={false}>View Details</Link>
        ) : (
          <button onClick={onRequireLogin}>View Details</button>
        )}

        {/* Save button only for logged-in users */}
        {isAuthenticated && onSave && (
          <button onClick={() => onSave(room.id)}>
            {isSaved ? "❤️ Saved" : "🤍 Save"}
          </button>
        )}
      </div>
    </div>
  )
}
