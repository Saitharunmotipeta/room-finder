import { useEffect, useState } from "react"
import { fetchRooms } from "./room.service"
import { Room } from "./room.types"
import { useDebounce } from "@/hooks/useDebounce"

export function useRooms(location: string) {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)

  const debouncedLocation = useDebounce(location, 400)

  useEffect(() => {
    setLoading(true)
    fetchRooms(debouncedLocation)
      .then(setRooms)
      .finally(() => setLoading(false))
  }, [debouncedLocation])

  return { rooms, loading }
}
