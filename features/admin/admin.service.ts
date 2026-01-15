import { supabase } from "@/services/supabase/client"

export async function getAllRooms() {
  return supabase
    .from("rooms")
    .select("id, title, location, rent, owner_email")
    .order("created_at", { ascending: false })
}

export async function getOwners() {
  return supabase
    .from("profiles")
    .select("id, name, email")
    .eq("role", "owner")
}

export async function deleteRoomAsAdmin(roomId: string) {
  return supabase.from("rooms").delete().eq("id", roomId)
}
