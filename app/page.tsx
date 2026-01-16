import Link from "next/link"

export default function LandingPage() {
  return (
    <main style={page}>
      {/* ---------------- Hero ---------------- */}
      <section style={hero}>
        <h1 style={heroTitle}>
          Find the right room.
          <br />
          <span style={{ color: "#4f46e5" }}>Without the chaos.</span>
        </h1>

        <p style={heroSubtitle}>
          RoomFinder helps you discover verified room listings based on location,
          budget, and preferences — faster, cleaner, and smarter.
        </p>

        <div style={ctaRow}>
          <Link href="/dashboard">
            <button style={primaryBtn}>Explore Rooms</button>
          </Link>
          <Link href="/signup">
            <button style={secondaryBtn}>Get Started</button>
          </Link>
        </div>
      </section>

      {/* ---------------- What is this ---------------- */}
      <section style={section}>
        <h2 style={sectionTitle}>What is RoomFinder?</h2>
        <p style={sectionText}>
          RoomFinder is a room discovery platform designed for students,
          professionals, and families who want a simple way to find rooms
          without scrolling through unverified listings or endless messages.
        </p>
      </section>

      {/* ---------------- Features ---------------- */}
      <section style={sectionAlt}>
        <h2 style={sectionTitle}>Core Features</h2>

        <div style={featureGrid}>
          <Feature
            title="Smart Search"
            text="Search using natural terms like “1 BHK”, “family”, or “under 10,000” — no filters or dropdowns required."
          />
          <Feature
            title="Verified Listings"
            text="All rooms are posted by registered owners, ensuring better authenticity and trust."
          />
          <Feature
            title="Save & Revisit"
            text="Save rooms you like and quickly access recently viewed listings anytime."
          />
          <Feature
            title="Direct Owner Contact"
            text="View owner contact details and connect without middlemen."
          />
        </div>
      </section>

      {/* ---------------- User Flow ---------------- */}
      <section style={section}>
        <h2 style={sectionTitle}>How It Works</h2>

        <div style={flowGrid}>
          <Flow
            title="For Users"
            points={[
              "Sign up and explore room listings",
              "Search by location, budget, or preferences",
              "Save rooms and view recently visited ones",
              "Contact owners directly",
            ]}
          />
          <Flow
            title="For Owners"
            points={[
              "Log in as an owner",
              "Add and manage room listings",
              "Track engagement and views",
            ]}
          />
          <Flow
            title="For Admins"
            points={[
              "Moderate all listings",
              "Remove invalid or duplicate rooms",
              "Maintain platform quality",
            ]}
          />
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section style={ctaSection}>
        <h2 style={{ marginBottom: 12 }}>
          Ready to find your next place?
        </h2>
        <p style={{ marginBottom: 20, color: "#475569" }}>
          Get started in minutes. No clutter. No confusion.
        </p>

        <div style={ctaRow}>
          <Link href="/signup">
            <button style={primaryBtn}>Create an Account</button>
          </Link>
          <Link href="/dashboard">
            <button style={secondaryBtn}>Browse Rooms</button>
          </Link>
        </div>
      </section>
    </main>
  )
}

/* ---------------- Small Components ---------------- */

function Feature({ title, text }: { title: string; text: string }) {
  return (
    <div style={card}>
      <h3 style={cardTitle}>{title}</h3>
      <p style={cardText}>{text}</p>
    </div>
  )
}

function Flow({
  title,
  points,
}: {
  title: string
  points: string[]
}) {
  return (
    <div style={card}>
      <h3 style={cardTitle}>{title}</h3>
      <ul style={list}>
        {points.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
    </div>
  )
}

/* ---------------- Styles ---------------- */

const page = {
  display: "flex",
  flexDirection: "column" as const,
}

const hero = {
  minHeight: "70vh",
  padding: "80px 24px",
  textAlign: "center" as const,
  background: "#f8fafc",
}

const heroTitle = {
  fontSize: 42,
  fontWeight: 800,
  marginBottom: 16,
}

const heroSubtitle = {
  maxWidth: 640,
  margin: "0 auto 28px",
  fontSize: 16,
  color: "#475569",
}

const ctaRow = {
  display: "flex",
  gap: 16,
  justifyContent: "center",
  flexWrap: "wrap" as const,
}

const primaryBtn = {
  padding: "12px 20px",
  borderRadius: 8,
  background: "#4f46e5",
  color: "#fff",
  border: "none",
  fontWeight: 600,
  cursor: "pointer",
}

const secondaryBtn = {
  padding: "12px 20px",
  borderRadius: 8,
  background: "#e5e7eb",
  color: "#111",
  border: "none",
  fontWeight: 600,
  cursor: "pointer",
}

const section = {
  padding: "64px 24px",
  maxWidth: 1100,
  margin: "0 auto",
}

const sectionAlt = {
  ...section,
  background: "#f9fafb",
}

const sectionTitle = {
  fontSize: 28,
  fontWeight: 700,
  marginBottom: 16,
}

const sectionText = {
  maxWidth: 700,
  color: "#475569",
}

const featureGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 20,
  marginTop: 24,
}

const flowGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 20,
  marginTop: 24,
}

const card = {
  padding: 20,
  borderRadius: 12,
  border: "1px solid #e5e7eb",
  background: "#fff",
}

const cardTitle = {
  fontSize: 18,
  fontWeight: 600,
  marginBottom: 8,
}

const cardText = {
  fontSize: 14,
  color: "#475569",
}

const list = {
  paddingLeft: 18,
  lineHeight: 1.8,
  color: "#475569",
}

const ctaSection = {
  padding: "72px 24px",
  textAlign: "center" as const,
  background: "#f8fafc",
}
