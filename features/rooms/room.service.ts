import { getSupabaseClient } from "@/services/supabase/client"
import { Room } from "./room.types"
import { parseSearchQuery } from "@/utils/parseSearchQuery"

export async function fetchRooms(query: string) {
  const supabase = getSupabaseClient()
  if (!supabase) throw new Error("Supabase client not found")

  let q = supabase
    .from("rooms")
    .select(`
      id,
      title,
      location,
      rent,
      property_type,
      tenant_preference,
      owner_email,
      room_images (
        image_url
      )
    `)
    .order("created_at", { ascending: false })

  if (query) {
    q = q.or(`
      title.ilike.%${query}%,
      location.ilike.%${query}%,
      property_type.ilike.%${query}%,
      tenant_preference.ilike.%${query}%
    `)
  }

  const { data, error } = await q

  if (error) {
    console.error("Explore fetch error:", error)
    return []
  }

  return data || []
}


export async function fetchRoomById(id: string): Promise<Room | null> {
  const supabase = getSupabaseClient()
      if (!supabase) throw new Error("Supabase client not found") 
  const { data, error } = await supabase
    .from("rooms")
    .select(`*, room_images ( image_url )`)
    .eq("id", id)
    .single()

  if (error) return null
  return data
}
