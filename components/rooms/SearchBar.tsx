"use client"

import { Search } from "lucide-react"

type Props = {
  value: string
  onChange: (value: string) => void
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div style={wrapper}>
      <div style={inputWrapper}>
        {/* Icon */}
        <Search size={18} style={icon} />

        {/* Input */}
        <input
          type="text"
          placeholder="Search: location, budget (<10000), 1BHK, family…"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={input}
        />
      </div>

      {/* Helper text */}
      <p style={hint}>
        Try: <span style={hintStrong}>“1 BHK”</span>,{" "}
        <span style={hintStrong}>“family”</span>,{" "}
        <span style={hintStrong}>“under 10k”</span>
      </p>
    </div>
  )
}

/* ================== Styles ================== */

const wrapper = {
  marginBottom: 24,
  maxWidth: 520,
}

const inputWrapper = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "10px 14px",
  borderRadius: 10,
  border: "1px solid #d1d5db",
  background: "#ffffff",
  boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
}

const icon = {
  color: "#64748b",
  flexShrink: 0,
}

const input = {
  width: "100%",
  border: "none",
  outline: "none",
  color:"black",
  fontSize: 14,
  background: "transparent",
}

const hint = {
  marginTop: 8,
  fontSize: 12,
  color: "#64748b",
}

const hintStrong = {
  color: "#4f46e5",
  fontWeight: 500,
}
