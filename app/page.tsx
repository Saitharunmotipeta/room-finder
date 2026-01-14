import Link from "next/link"

export default function LandingPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: 36, marginBottom: 12 }}>
        Find Rooms. Faster. Smarter.
      </h1>

      <p style={{ maxWidth: 500, marginBottom: 24, color: "#555" }}>
        Discover verified rooms based on location, budget, and preferences.
        Save listings and connect directly with owners.
      </p>

      <div style={{ display: "flex", gap: 16 }}>
        <Link href="/dashboard">
          <button>Explore Rooms</button>
        </Link>

        <Link href="/signup">
          <button>Get Started</button>
        </Link>
      </div>
    </main>
  )
}
