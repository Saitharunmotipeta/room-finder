"use client"

import { useState } from "react"
import { supabase } from "@/services/supabase/client"

export default function AuthPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    setLoading(false)

    if (error) {
      alert(error.message)
    } else {
      alert("Check your email to complete login")
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Sending..." : "Send Login Link"}
      </button>
    </div>
  )
}
