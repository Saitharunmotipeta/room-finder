"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { getSupabaseClient } from "@/services/supabase/client"
import Link from "next/link"

export default function SignupPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const role =
    searchParams.get("role") === "admin"
      ? "admin"
      : searchParams.get("role") === "owner"
      ? "owner"
      : "user"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null)

  const handleSignup = async () => {
    setLoading(true)
    setMessage(null)

    const supabase = getSupabaseClient()
      if (!supabase) throw new Error("Supabase client not found") 


    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setMessage({ type: "error", text: error.message })
      setLoading(false)
      return
    }

    setMessage({ type: "success", text: "Account created successfully. Redirecting…" })
    setTimeout(() => router.replace("/dashboard"), 800)
  }

  return (
    <main style={page}>
      <div style={card}>
        <h1 style={{color:"black",...title}}>Create your account</h1>
        <p style={subtitle}>Sign up to explore rooms effortlessly</p>

        {message && (
          <div
            style={{
              ...alert,
              background: message.type === "error" ? "#fee2e2" : "#e0f2fe",
              color: message.type === "error" ? "#991b1b" : "#075985",
            }}
          >
            {message.text}
          </div>
        )}

        <div style={{color:"black",...field}}>
          <label style={label}>Email address</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={input}
          />
        </div>

        <div style={{color:"black",...field}}>
          <label style={label}>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={input}
          />
        </div>

        <button onClick={handleSignup} disabled={loading} style={button}>
          {loading ? "Creating account…" : "Sign Up"}
        </button>

        <p style={{color:"black",...footerText}}>
          Already have an account?{" "}
          <Link href="/login" style={link}>
            Login
          </Link>
        </p>
      </div>
    </main>
  )
}

/* ---------- Styles ---------- */

const page = {
    minHeight: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(180deg, #7b8dc74c 0%, #7694e6 0%, #fcfcfc 100%)",
}

const card = {
  width: "100%",
  maxWidth: 420,
  background: "#fff",
  padding: 32,
  borderRadius: 12,
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
}

const title = { fontSize: 24, fontWeight: 700 }
const subtitle = { marginTop: 6, marginBottom: 24, color: "#555" }

const field = { marginBottom: 16 }
const label = { display: "block", marginBottom: 6, fontSize: 14, fontWeight: 500 }
const input = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #d1d5db",
  outline: "none",
}

const button = {
  width: "100%",
  marginTop: 12,
  padding: "12px",
  borderRadius: 8,
  background: "#4f46e5",
  color: "#fff",
  fontWeight: 600,
  border: "none",
  cursor: "pointer",
}

const footerText = { marginTop: 20, fontSize: 14, textAlign: "center" as const }
const link = { color: "#4f46e5", fontWeight: 500 }

const alert = {
  padding: 12,
  borderRadius: 8,
  marginBottom: 16,
  fontSize: 14,
}
