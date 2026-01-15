import { useEffect, useState } from "react"
import { getOwnerRooms } from "./owner.service"

export function useOwnerRooms(ownerId?: string) {
  const [rooms, setRooms] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!ownerId) return

    getOwnerRooms(ownerId).then(({ data }) => {
      if (data) setRooms(data)
      setLoading(false)
    })
  }, [ownerId])

  return { rooms, loading }
}
