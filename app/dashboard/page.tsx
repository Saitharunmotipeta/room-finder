"use client"

import { useEffect, useState } from "react"
import RoomList from "@/components/rooms/RoomList"
import { useRooms } from "@/features/rooms/useRooms"
import { useSavedRooms } from "@/hooks/useSavedRooms"
import { getRecentlyViewed } from "@/utils/recentlyViewed"
import { supabase } from "@/services/supabase/client"
import LoginPromptModal from "@/components/common/LoginPromptModal"
import { useAuth } from "@/hooks/useAuth"

type ViewMode = "explore" | "saved" | "recent"

export default function DashboardPage() {
  const [view, setView] = useState<ViewMode>("explore")
  const [recentRooms, setRecentRooms] = useState<any[]>([])
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)

  const { rooms, loading } = useRooms("")
  const { savedIds, savedRooms, toggleSave } = useSavedRooms()
  const { isAuthenticated } = useAuth()

  // 🔹 Load recently viewed rooms
  useEffect(() => {
    const loadRecentRooms = async () => {
      const ids = getRecentlyViewed()
      if (ids.length === 0) return

      const { data, error } = await supabase
        .from("rooms")
        .select("*")
        .in("id", ids)

      if (!error && data) {
        const ordered = ids
          .map((id) => data.find((r) => r.id === id))
          .filter(Boolean)

        setRecentRooms(ordered)
      }
    }

    loadRecentRooms()
  }, [])

  const showSavedTab = isAuthenticated && savedRooms.length > 0
  const showRecentTab = recentRooms.length > 0

  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ marginBottom: 16 }}>Rooms</h1>

      {/* Mode Switch */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <button
          onClick={() => setView("explore")}
          style={{ fontWeight: view === "explore" ? "bold" : "normal" }}
        >
          Explore
        </button>

        {showSavedTab && (
          <button
            onClick={() => setView("saved")}
            style={{ fontWeight: view === "saved" ? "bold" : "normal" }}
          >
            Saved ❤️
          </button>
        )}

        {showRecentTab && (
          <button
            onClick={() => setView("recent")}
            style={{ fontWeight: view === "recent" ? "bold" : "normal" }}
          >
            Recent 👀
          </button>
        )}
      </div>

      {/* Content */}
      {loading ? (
        <p>Loading...</p>
      ) : view === "explore" ? (
        <RoomList
          rooms={rooms}
          savedRoomIds={savedIds}
          onSave={toggleSave}
          isAuthenticated={isAuthenticated}
          onRequireLogin={() => setShowLoginPrompt(true)}
        />
      ) : view === "saved" ? (
        <RoomList
          rooms={savedRooms}
          savedRoomIds={savedIds}
          onSave={toggleSave}
          isAuthenticated={isAuthenticated}
          onRequireLogin={() => setShowLoginPrompt(true)}
        />
      ) : (
        <RoomList
          rooms={recentRooms}
          savedRoomIds={savedIds}
          onSave={toggleSave}
          isAuthenticated={isAuthenticated}
          onRequireLogin={() => setShowLoginPrompt(true)}
        />
      )}

      {/* Login Modal */}
      <LoginPromptModal
        open={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
      />
    </main>
  )
}
