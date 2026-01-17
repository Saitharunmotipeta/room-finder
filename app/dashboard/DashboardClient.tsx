"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import RoomList from "@/components/rooms/RoomList"
import SearchBar from "@/components/rooms/SearchBar"
import { useRooms } from "@/features/rooms/useRooms"
import { useSavedRooms } from "@/hooks/useSavedRooms"
import { getRecentlyViewed } from "@/utils/recentlyViewed"
import { getSupabaseClient } from "@/services/supabase/client"
import { useAuth } from "@/hooks/useAuth"
import { useProfile } from "@/hooks/useProfile"
import LoginPromptModal from "@/components/common/LoginPromptModal"
import { redirectByRole } from "@/utils/redirectByRole"

type ViewMode = "all" | "explore" | "saved" | "recent"

export default function DashboardClient() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const view = (searchParams.get("view") as ViewMode) || "all"

  const { isAuthenticated } = useAuth()
  const { profile } = useProfile()

  // 🔹 NEW: role guard (dashboard = user only)
  useEffect(() => {
    if (!profile) return

    if (profile.role !== "user") {
      router.replace(redirectByRole(profile.role))
    }
  }, [profile, router])

  const [location, setLocation] = useState("")
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)

  // 🔹 Search applies mainly to explore (safe to keep as-is)
  const { rooms, loading } = useRooms(location)
  const { savedIds, savedRooms, toggleSave } = useSavedRooms()

  const [recentRooms, setRecentRooms] = useState<any[]>([])

  /* ---------------- Recent Rooms (Viewed) ---------------- */
  useEffect(() => {
    if (view !== "recent") return

    const loadRecentRooms = async () => {
        const supabase = getSupabaseClient()
      if (!supabase) throw new Error("Supabase client not found") 
      const ids = getRecentlyViewed()
      if (ids.length === 0) return

      if (!supabase) {
        console.warn("Supabase not initialized")
        return
        }

      const { data } = await supabase
        .from("rooms")
        .select("*")
        .in("id", ids)

      if (data) {
        const ordered = ids
          .map((id) => data.find((r) => r.id === id))
          .filter(Boolean)

        setRecentRooms(ordered)
      }
    }

    loadRecentRooms()
  }, [view])

  /* ---------------- View Flags ---------------- */
  const isExplore = view === "explore"
  const isSaved = view === "saved"
  const isRecent = view === "recent"

  return (
    <main style={{ padding: 24 }}>
      {/* ---------------- Header ---------------- */}
      <header style={{ color : "#111827", marginBottom: 20 }}>
        <h1 style={{ marginBottom: 6 , fontSize: 28 , fontWeight: 600}}>
          {isExplore
            ? "Explore Rooms"
            : isSaved
            ? "Saved Rooms"
            : isRecent
            ? "Recently Viewed"
            : "Available Rooms"}
        </h1>

        <p style={{ color: "#555" }}>
          {isExplore
            ? "Search rooms by location and preferences"
            : isSaved
            ? "Rooms you have saved for later"
            : isRecent
            ? "Rooms you recently viewed"
            : "Browse all available rooms"}
        </p>
      </header>

      {/* ---------------- Search (Explore only) ---------------- */}
      {isExplore && (
        <div style={{ marginBottom: 20 }}>
          <SearchBar value={location} onChange={setLocation} />
        </div>
      )}

      {/* ---------------- Content ---------------- */}
      {loading ? (
        <p>Loading rooms...</p>
      ) : isSaved ? (
        savedRooms.length === 0 ? (
          <p>No saved rooms yet.</p>
        ) : (
          <RoomList
            rooms={savedRooms}
            savedRoomIds={savedIds}
            onSave={toggleSave}
            isAuthenticated={isAuthenticated}
            onRequireLogin={() => setShowLoginPrompt(true)}
          />
        )
      ) : isRecent ? (
        recentRooms.length === 0 ? (
          <p>No recently viewed rooms.</p>
        ) : (
          <RoomList
            rooms={recentRooms}
            savedRoomIds={savedIds}
            onSave={toggleSave}
            isAuthenticated={isAuthenticated}
            onRequireLogin={() => setShowLoginPrompt(true)}
          />
        )
      ) : (
        // all + explore
        <RoomList
          rooms={rooms}
          savedRoomIds={savedIds}
          onSave={toggleSave}
          isAuthenticated={isAuthenticated}
          onRequireLogin={() => setShowLoginPrompt(true)}
        />
      )}

      {/* ---------------- Login Prompt ---------------- */}
      <LoginPromptModal
        open={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
      />
    </main>
  )
}
