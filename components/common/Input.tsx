"use client"

type InputProps = {
  label?: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  error?: string
}

export default function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
}: InputProps) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && (
        <label style={{ fontSize: 13, fontWeight: 500 }}>
          {label}
        </label>
      )}

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: 8,
          border: error ? "1px solid #ef4444" : "1px solid #cbd5e1",
          marginTop: 6,
        }}
      />

      {error && (
        <p style={{ fontSize: 12, color: "#ef4444", marginTop: 4 }}>
          {error}
        </p>
      )}
    </div>
  )
}
