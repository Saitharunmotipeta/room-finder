"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { supabase } from "@/services/supabase/client"
import Link from "next/link"
import { redirectByRole } from "@/utils/redirectByRole"

export default function SignupPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // 🔹 role intent from query (?role=owner | admin | user)
  const role =
    searchParams.get("role") === "admin"
      ? "admin"
      : searchParams.get("role") === "owner"
      ? "owner"
      : "user"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignup = async () => {
    setLoading(true)
    setError(null)

    // 1️⃣ Create auth user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error || !data.user) {
      setLoading(false)
      setError(error?.message || "Signup failed")
      return
    }

    // 2️⃣ Create profile with role
    const { error: profileError } = await supabase.from("profiles").insert({
      id: data.user.id,
      email,
      role,
    })

    setLoading(false)

    if (profileError) {
      setError(profileError.message)
      return
    }

    // 3️⃣ Redirect based on role
    router.replace(redirectByRole(role))
  }

  return (
    <div>
      <h1>Sign Up</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSignup} disabled={loading}>
        Create Account
      </button>

      <p>
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </div>
  )
}
