"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/services/supabase/client"
import { createRoom } from "@/features/rooms/room.service"
import { ensureProfileExists } from "@/features/auth/profile.bootstrap"
import {
  PROPERTY_TYPES,
  TENANT_PREFERENCES,
  PropertyType,
  TenantPreference,
} from "@/constants/roomOptions"


export default function NewRoomPage() {
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")
  const [rent, setRent] = useState("")
  const [propertyType, setPropertyType] = useState<PropertyType>(PROPERTY_TYPES[0])
  const [tenantPreference, setTenantPreference] = useState<TenantPreference>(
    TENANT_PREFERENCES[0]
  )
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    // Basic validation
    if (!title || !location || !rent) {
      alert("Please fill all required fields")
      return
    }

    const rentValue = Number(rent)
    if (isNaN(rentValue) || rentValue <= 0) {
      alert("Rent must be a valid number greater than 0")
      return
    }

    setLoading(true)

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      alert("Authentication required")
      setLoading(false)
      return
    }

    // Ensure profile exists before FK insert
    await ensureProfileExists(session.user.id)

    await createRoom({
      owner_id: session.user.id,
      title,
      location,
      rent: rentValue,
      property_type: propertyType,
      tenant_preference: tenantPreference,
      description: null,
    })

    setLoading(false)
    router.push("/dashboard")
  }

  return (
    <div style={{ padding: 40, maxWidth: 500 }}>
      <h1>Add New Room</h1>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <input
        type="number"
        placeholder="Rent"
        value={rent}
        onChange={(e) => setRent(e.target.value)}
      />

      <select
        value={propertyType}
        onChange={(e) =>
            setPropertyType(e.target.value as PropertyType)
        }
        >
        {PROPERTY_TYPES.map((type) => (
            <option key={type} value={type}>
            {type}
            </option>
        ))}
        </select>

        <select
        value={tenantPreference}
        onChange={(e) =>
            setTenantPreference(e.target.value as TenantPreference)
        }
        >
        {TENANT_PREFERENCES.map((pref) => (
            <option key={pref} value={pref}>
            {pref}
            </option>
        ))}
        </select>

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Creating..." : "Create Room"}
      </button>
    </div>
  )
}
