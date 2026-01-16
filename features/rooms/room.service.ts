import { supabase } from "@/services/supabase/client"
import { Room } from "./room.types"
import { parseSearchQuery } from "@/utils/parseSearchQuery"

export async function fetchRooms(search: string): Promise<Room[]> {
    let query = supabase.from("rooms").select("*")

    if (search.trim()) {
      const filters = parseSearchQuery(search)

      if (filters.location) {
        query = query.ilike("location", `%${filters.location}%`)
      }

      if (filters.property_type) {
        query = query.eq("property_type", filters.property_type)
      }

      if (filters.tenant_preference) {
        query = query.eq("tenant_preference", filters.tenant_preference)
      }

      if (filters.maxRent) {
        query = query.lte("rent", filters.maxRent)
      }
    }

    const { data, error } = await query.order("created_at", {
      ascending: false,
    })

    if (error) {
      console.error("fetchRooms error:", error.message)
      return []
    }

    return data || []
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
