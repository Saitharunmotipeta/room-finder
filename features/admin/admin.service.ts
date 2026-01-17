import { getSupabaseClient } from "@/services/supabase/client"

export async function getAllRooms() {
  const supabase = getSupabaseClient()
      if (!supabase) throw new Error("Supabase client not found") 
  return supabase
    .from("rooms")
    .select("id, title, location, rent, owner_email")
    .order("created_at", { ascending: false })
}

export async function getOwners() {
  const supabase = getSupabaseClient()
      if (!supabase) throw new Error("Supabase client not found") 
  return supabase
    .from("profiles")
    .select("id, name, email")
    .eq("role", "owner")
}

export async function deleteRoomAsAdmin(roomId: string) {
  const supabase = getSupabaseClient()
      if (!supabase) throw new Error("Supabase client not found") 
  return supabase.from("rooms").delete().eq("id", roomId)
}
