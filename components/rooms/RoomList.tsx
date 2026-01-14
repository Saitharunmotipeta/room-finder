import RoomCard from "./RoomCard"

type Props = {
  rooms: any[]
  savedRoomIds?: string[]
  onSave?: (roomId: string) => void
  isAuthenticated: boolean
  onRequireLogin: () => void
}

export default function RoomList({
  rooms,
  savedRoomIds = [],
  onSave,
  isAuthenticated,
  onRequireLogin,
}: Props) {
  if (rooms.length === 0) return <p>No rooms found.</p>

  return (
    <div>
      {rooms.map((room) => (
        <RoomCard
          key={room.id}
          room={room}
          isSaved={savedRoomIds.includes(room.id)}
          onSave={onSave}
          isAuthenticated={isAuthenticated}
          onRequireLogin={onRequireLogin}
        />
      ))}
    </div>
  )
}
