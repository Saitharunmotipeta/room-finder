import { getSupabaseClient } from "@/services/supabase/client"

export function getOwnerRooms(ownerId: string) {
  const supabase = getSupabaseClient()
      if (!supabase) throw new Error("Supabase client not found") 
  return supabase
    .from("rooms")
    .select("*")
    .eq("owner_id", ownerId)
}

export function createRoom(payload: any) {
  const supabase = getSupabaseClient()
      if (!supabase) throw new Error("Supabase client not found") 
  return supabase.from("rooms").insert(payload)
}

export function getOwnerAnalytics(
  ownerId: string,
  filters?: { location?: string; minRent?: number; maxRent?: number }
) {
  const supabase = getSupabaseClient()
      if (!supabase) throw new Error("Supabase client not found") 
  let query = supabase
    .from("rooms")
    .select("id", { count: "exact", head: true })
    .eq("owner_id", ownerId)

  if (filters?.location) query = query.eq("location", filters.location)
  if (filters?.minRent) query = query.gte("rent", filters.minRent)
  if (filters?.maxRent) query = query.lte("rent", filters.maxRent)

  return query
}
