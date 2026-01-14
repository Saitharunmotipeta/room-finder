import { supabase } from "@/services/supabase/client"
import { Room } from "./room.types"

export async function fetchRooms(location?: string): Promise<Room[]> {
  let query = supabase
    .from("rooms")
    .select(`*, room_images ( image_url )`)
    .order("created_at", { ascending: false })

  if (location) {
    query = query.ilike("location", `%${location}%`)
  }

  const { data, error } = await query

  if (error) throw error
  return data ?? []
}

export async function fetchRoomById(id: string): Promise<Room | null> {
  const { data, error } = await supabase
    .from("rooms")
    .select(`*, room_images ( image_url )`)
    .eq("id", id)
    .single()

  if (error) return null
  return data
}
