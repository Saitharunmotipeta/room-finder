import { supabase } from "@/services/supabase/client"
import { Room } from "@/types/room"
import { PropertyType, TenantPreference } from "@/constants/roomOptions"

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

export async function searchRooms(params: {
  location: string
  minRent?: number
  maxRent?: number
  propertyType?: PropertyType
  tenantPreference?: TenantPreference
}) {
  let query = supabase
    .from("rooms")
    .select("*")
    .ilike("location", `%${params.location}%`)
    .order("created_at", { ascending: false })

  if (params.minRent !== undefined) {
    query = query.gte("rent", params.minRent)
  }

  if (params.maxRent !== undefined) {
    query = query.lte("rent", params.maxRent)
  }

  if (params.propertyType) {
    query = query.eq("property_type", params.propertyType)
  }

  if (params.tenantPreference) {
    query = query.eq("tenant_preference", params.tenantPreference)
  }

  const { data, error } = await query

  if (error) throw error
  return data
}
