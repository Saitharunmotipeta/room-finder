import { useEffect, useState } from "react"
import {
  getSavedRoomIds,
  getSavedRooms,
  saveRoom,
  unsaveRoom,
} from "@/services/roomService"

export function useSavedRooms() {
  const [savedIds, setSavedIds] = useState<string[]>([])
  const [savedRooms, setSavedRooms] = useState<any[]>([])

  useEffect(() => {
    refresh()
  }, [])

  const refresh = async () => {
    const ids = await getSavedRoomIds()
    const rooms = await getSavedRooms()

    setSavedIds(ids)
    setSavedRooms(rooms)
  }

  const toggleSave = async (roomId: string) => {
    if (savedIds.includes(roomId)) {
      await unsaveRoom(roomId)
    } else {
      await saveRoom(roomId)
    }

    await refresh()
  }

  return {
    savedIds,
    savedRooms,
    toggleSave,
  }
}
