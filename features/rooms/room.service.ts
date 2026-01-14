import { supabase } from "@/services/supabase/client"
import { Room } from "@/types/room"

export async function createRoom(payload: Omit<Room, "id" | "created_at">) {
  const { data, error } = await supabase
    .from("rooms")
    .insert(payload)
    .select()
    .single()

  if (error) throw error
  return data as Room
}

export async function getMyRooms(ownerId: string) {
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("owner_id", ownerId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as Room[]
}

export async function getPublicRooms() {
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as Room[]
}

export async function deleteRoom(roomId: string) {
  const { error } = await supabase
    .from("rooms")
    .delete()
    .eq("id", roomId)

  if (error) throw error
}
