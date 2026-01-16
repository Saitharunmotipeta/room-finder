export const page = {
  display: "flex",
  flexDirection: "column" as const,
}

export const hero = {
  minHeight: "70vh",
  padding: "80px 24px",
  textAlign: "center" as const,
  background: "#f8fafc",
}

export const heroTitle = {
  fontSize: 42,
  fontWeight: 800,
  marginBottom: 16,
}

export const heroSubtitle = {
  maxWidth: 640,
  margin: "0 auto 28px",
  fontSize: 16,
  color: "#475569",
}

export const ctaRow = {
  display: "flex",
  gap: 16,
  justifyContent: "center",
  flexWrap: "wrap" as const,
}

export const primaryBtn = {
  padding: "12px 20px",
  borderRadius: 8,
  background: "#4f46e5",
  color: "#fff",
  border: "none",
  fontWeight: 600,
  cursor: "pointer",
}

export const secondaryBtn = {
  padding: "12px 20px",
  borderRadius: 8,
  background: "#e5e7eb",
  color: "#111",
  border: "none",
  fontWeight: 600,
  cursor: "pointer",
}

export const section = {
  padding: "64px 24px",
  maxWidth: 1100,
  margin: "0 auto",
}

export const sectionAlt = {
  padding: "64px 24px",
  maxWidth: 1100,
  margin: "0 auto",
  background: "#f9fafb",
}

export const sectionTitle = {
  fontSize: 28,
  fontWeight: 700,
  marginBottom: 16,
}

export const sectionText = {
  maxWidth: 700,
  color: "#475569",
}

export const featureGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 20,
  marginTop: 24,
}

export const flowGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 20,
  marginTop: 24,
}

export const card = {
  padding: 20,
  borderRadius: 12,
  border: "1px solid #e5e7eb",
  background: "#fff",
}

export const cardTitle = {
  fontSize: 18,
  fontWeight: 600,
  marginBottom: 8,
}

export const cardText = {
  fontSize: 14,
  color: "#475569",
}

export const list = {
  paddingLeft: 18,
  lineHeight: 1.8,
  color: "#475569",
}

export const ctaSection = {
  padding: "72px 24px",
  textAlign: "center" as const,
  background: "#f8fafc",
}
