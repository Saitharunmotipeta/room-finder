import { supabase } from "@/services/supabase/client"

export async function getAdminOverview() {
  const [{ count: users }, { count: rooms }] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("rooms").select("*", { count: "exact", head: true }),
  ])

  return {
    users: users ?? 0,
    rooms: rooms ?? 0,
  }
}
