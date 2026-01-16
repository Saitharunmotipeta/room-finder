import { useEffect, useState } from "react"
import { fetchRooms } from "./room.service"
import { Room } from "./room.types"
import { useDebounce } from "@/hooks/useDebounce"

export function useRooms(search: string) {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)

  const debouncedSearch = useDebounce(search, 400)

  useEffect(() => {
    setLoading(true)
    fetchRooms(debouncedSearch)
      .then(setRooms)
      .finally(() => setLoading(false))
  }, [debouncedSearch])

  return { rooms, loading }
}
