export default function Loader({ text = "Loading..." }: { text?: string }) {
  return (
    <div
      style={{
        padding: 24,
        textAlign: "center",
        color: "#64748b",
        fontSize: 14,
      }}
    >
      <div style={{ marginBottom: 8 }}>⏳</div>
      {text}
    </div>
  )
}
