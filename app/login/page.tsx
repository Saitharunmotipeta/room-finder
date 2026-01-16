"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/services/supabase/client"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()

  /* ---------------- Styles ---------------- */
  const container = {
    minHeight: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(180deg, #7b8dc74c 0%, #7694e6 0%, #fcfcfc 100%)",
  }

  const card = {
    width: 380,
    padding: 28,
    borderRadius: 12,
    background: "#ffffff",
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
  }

  const title = {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 6,
  }

  const subtitle = {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 20,
  }

  const label = {
    fontSize: 13,
    fontWeight: 500,
    marginBottom: 6,
    display: "block",
  }

  const input = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #cbd5e1",
    marginBottom: 14,
  }

  const button = {
    width: "100%",
    padding: 12,
    borderRadius: 8,
    background: "#4f46e5",
    color: "#fff",
    fontWeight: 600,
    border: "none",
    cursor: "pointer",
    opacity: 1,
  }

  const alert = {
    padding: 10,
    borderRadius: 8,
    background: "#f1f5f9",
    fontSize: 14,
    marginBottom: 14,
  }

  const footer = {
    marginTop: 16,
    fontSize: 14,
    textAlign: "center" as const,
  }

  const link = {
    color: "#4f46e5",
    fontWeight: 600,
  }

  /* ---------------- State ---------------- */
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  /* ---------------- AUTH LISTENER (KEY FIX) ---------------- */
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        const userEmail = session.user.email || ""

        // 🔥 STATIC ROLE ROUTING (AS DECIDED)
        if (userEmail === "admin@roomfinder.com") {
          router.replace("/admin")
        } else if (userEmail === "owner@roomfinder.com") {
          router.replace("/owner")
        } else {
          router.replace("/dashboard")
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  /* ---------------- Login Handler ---------------- */
  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("⚠️ Please enter email and password")
      return
    }

    setLoading(true)
    setMessage(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setMessage("❌ Invalid email or password")
      setLoading(false)
      return
    }

    setMessage("✅ Login successful, redirecting…")
    setLoading(false)
    // ❌ DO NOT redirect here
  }

  /* ---------------- UI ---------------- */
  return (
    <div style={container}>
      <div style={card}>
        <h1 style={{color:"black" , ...title}} >Welcome back</h1>
        <p style={subtitle}>Login to continue exploring rooms</p>

        {message && <div style={alert}>{message}</div>}

        <label style={{color:"black",...label}}>Email address</label>
        <input
          style={{color:"black",...input}}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />

        <label style={{color:"black",...label}}>Password</label>
        <input
          type="password"
          style={{color:"black",...input}}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />

        <button
          style={{ ...button, opacity: loading ? 0.7 : 1 }}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in…" : "Login"}
        </button>

        <p style={{color:"black",...footer}}>
          Don’t have an account?{" "}
          <Link href="/signup" style={link}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
