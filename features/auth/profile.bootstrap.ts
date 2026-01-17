import { getSupabaseClient } from "@/services/supabase/client"
import { User } from "@supabase/supabase-js"

export async function ensureProfileExists(user: User) {
  if (!user?.id) return

  const supabase = getSupabaseClient()
  if (!supabase) throw new Error("Supabase client not found")
  const { data } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .single()

  if (data) return

  await supabase.from("profiles").insert({
    id: user.id,
    email: user.email,
    role: "owner", // keep owner here if this function is owner-specific
  })
}
