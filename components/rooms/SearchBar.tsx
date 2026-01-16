type Props = {
  value: string
  onChange: (value: string) => void
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div style={{ marginBottom: 20 }}>
      <input
        type="text"
        placeholder="Search by location (city, area)…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          padding: 10,
          width: 320,
          border: "1px solid #d1d5db",
          borderRadius: 6,
        }}
      />
    </div>
  )
}
