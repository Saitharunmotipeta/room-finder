import { ReactNode } from "react"

export default function PageContainer({ children }: { children: ReactNode }) {
  return (
    <main
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "24px",
      }}
    >
      {children}
    </main>
  )
}
