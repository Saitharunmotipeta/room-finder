import { supabase } from "@/services/supabase/client"

export async function ensureProfileExists(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", userId)
    .single()

  if (data) return

  await supabase.from("profiles").insert({
    id: userId,
    role: "owner",
  })
}
