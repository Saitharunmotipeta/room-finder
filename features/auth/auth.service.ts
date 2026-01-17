import { getSupabaseClient } from "@/services/supabase/client"
import { User } from "@supabase/supabase-js"

export async function ensureProfile(user: User | null) {
  if (!user || !user.id) return

  const supabase = getSupabaseClient()
  if (!supabase) throw new Error("Supabase client not found")
  // 🔹 Check if profile already exists
  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .single()

  // 🔹 If profile exists, do nothing
  if (data) return

  // 🔹 Create profile (allowed by RLS: id = auth.uid())
  const { error: insertError } = await supabase.from("profiles").insert({
    id: user.id,
    email: user.email,
    role: "user", // default role
  })

  if (insertError) {
    console.error("Failed to create profile:", insertError.message)
  }
}
