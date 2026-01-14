"use client"

import { useRouter } from "next/navigation"

type Props = {
  open: boolean
  onClose: () => void
}

export default function LoginPromptModal({ open, onClose }: Props) {
  const router = useRouter()

  if (!open) return null

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: 24,
          borderRadius: 8,
          width: 320,
          textAlign: "center",
        }}
      >
        <h3 style={{ marginBottom: 8 }}>Login required</h3>
        <p style={{ marginBottom: 16 }}>
          Please login to explore room details.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={() => router.push("/login")}>Login</button>
        </div>
      </div>
    </div>
  )
}
