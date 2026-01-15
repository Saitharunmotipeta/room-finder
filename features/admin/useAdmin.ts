import { useEffect, useState } from "react"
import { getAllRooms, getOwners } from "./admin.service"

export function useAdminRooms() {
  const [rooms, setRooms] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllRooms().then(({ data }) => {
      if (data) setRooms(data)
      setLoading(false)
    })
  }, [])

  return { rooms, loading }
}

export function useOwners() {
  const [owners, setOwners] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getOwners().then(({ data }) => {
      if (data) setOwners(data)
      setLoading(false)
    })
  }, [])

  return { owners, loading }
}
