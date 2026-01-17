import { getSupabaseClient } from "@/services/supabase/client"

/**
 * Get all room IDs saved by the currently logged-in user
 */
export async function getSavedRoomIds(): Promise<string[]> {
  const supabase = getSupabaseClient()
  if (!supabase) throw new Error("Supabase client not found")
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return []

  const { data, error } = await supabase
    .from("saved_rooms")
    .select("room_id")
    .eq("user_id", user.id)

  if (error) {
    console.error("Error fetching saved rooms:", error)
    return []
  }

  return data.map((row) => row.room_id)
}

/**
 * Save a room for the logged-in user
 */
export async function saveRoom(roomId: string): Promise<void> {
  const supabase = getSupabaseClient()
      if (!supabase) throw new Error("Supabase client not found") 
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("NOT_AUTHENTICATED")
  }

  const { error } = await supabase.from("saved_rooms").insert({
    room_id: roomId,
    user_id: user.id,
  })

  if (error) {
    console.error("Error saving room:", error)
    throw error
  }
}

/**
 * Remove a saved room for the logged-in user
 */
export async function unsaveRoom(roomId: string): Promise<void> {
  const supabase = getSupabaseClient()
      if (!supabase) throw new Error("Supabase client not found") 
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("NOT_AUTHENTICATED")
  }

  const { error } = await supabase
    .from("saved_rooms")
    .delete()
    .eq("room_id", roomId)
    .eq("user_id", user.id)

  if (error) {
    console.error("Error unsaving room:", error)
    throw error
  }
}

export async function getSavedRooms() {
  const supabase = getSupabaseClient()
      if (!supabase) throw new Error("Supabase client not found") 
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return []

  const { data, error } = await supabase
    .from("saved_rooms")
    .select(`
      room:rooms (
        id,
        title,
        location,
        rent,
        property_type,
        tenant_preference,
        owner_email,
        room_images ( image_url )
      )
    `)
    .eq("user_id", user.id)

  if (error) {
    console.error("Error fetching saved rooms:", error)
    return []
  }

  return data.map((row) => row.room)
}
