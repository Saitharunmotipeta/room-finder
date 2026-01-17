import { Suspense } from "react"
import SignupClient from "./SignupClient"

export default function SignupPage() {
  return (
    <Suspense fallback={<div style={{ padding: 24 }}>Loading signup…</div>}>
      <SignupClient />
    </Suspense>
  )
}
