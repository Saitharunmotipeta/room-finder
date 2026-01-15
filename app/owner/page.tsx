"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/services/supabase/client"
import { useProfile } from "@/hooks/useProfile"
import { useAuth } from "@/hooks/useAuth"

type Metric = {
  totalRooms: number
  totalViews: number
  totalSaved: number
}

export default function OwnerPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { profile } = useProfile()

  const [loading, setLoading] = useState(true)
  const [metrics, setMetrics] = useState<Metric>({
    totalRooms: 0,
    totalViews: 0,
    totalSaved: 0,
  })

  /* ---------- Guard: Only owners allowed ---------- */
  useEffect(() => {
    if (!user) return
    if (profile && profile.role !== "owner") {
      router.replace("/dashboard")
    }
  }, [user, profile, router])

  /* ---------- Load analytics ---------- */
  useEffect(() => {
    if (!user || profile?.role !== "owner") return

    const loadMetrics = async () => {
      // Total rooms owned
      const { count: roomCount } = await supabase
        .from("rooms")
        .select("id", { count: "exact", head: true })
        .eq("owner_id", user.id)

      // Total views (based on recently_viewed or fallback)
      const { count: viewCount } = await supabase
        .from("room_views")
        .select("id", { count: "exact", head: true })
        .eq("owner_id", user.id)

      // Total saved
      const { count: savedCount } = await supabase
        .from("saved_rooms")
        .select("id", { count: "exact", head: true })
        .eq("owner_id", user.id)

      setMetrics({
        totalRooms: roomCount || 0,
        totalViews: viewCount || 0,
        totalSaved: savedCount || 0,
      })

      setLoading(false)
    }

    loadMetrics()
  }, [user, profile])

  if (loading) return <p style={{ padding: 24 }}>Loading owner dashboard...</p>

  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ marginBottom: 6 }}>Owner Dashboard</h1>
      <p style={{ color: "#555", marginBottom: 24 }}>
        Analytics for your listed rooms
      </p>

      {/* Metrics */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
        }}
      >
        <MetricCard label="Total Rooms" value={metrics.totalRooms} />
        <MetricCard label="Total Views" value={metrics.totalViews} />
        <MetricCard label="Total Saved" value={metrics.totalSaved} />
      </div>
    </main>
  )
}

function MetricCard({ label, value }: { label: string; value: number }) {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        padding: 16,
        background: "#fafafa",
      }}
    >
      <p style={{ fontSize: 14, color: "#555" }}>{label}</p>
      <h2 style={{ marginTop: 4 }}>{value}</h2>
    </div>
  )
}
