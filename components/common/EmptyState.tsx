type EmptyStateProps = {
  title: string
  description?: string
  action?: React.ReactNode
}

export default function EmptyState({
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div
      style={{
        padding: 40,
        textAlign: "center",
        border: "1px dashed #cbd5e1",
        borderRadius: 12,
        background: "#f8fafc",
      }}
    >
      <h3 style={{ marginBottom: 8 }}>{title}</h3>

      {description && (
        <p style={{ color: "#64748b", marginBottom: 16 }}>
          {description}
        </p>
      )}

      {action}
    </div>
  )
}
