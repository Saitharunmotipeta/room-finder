"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/services/supabase/client"
import Link from "next/link"

export default function SignupPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignup = async () => {
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    router.replace("/dashboard")
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
