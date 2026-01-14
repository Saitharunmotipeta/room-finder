"use client"

import { useState } from "react"
import { Room } from "@/types/room"
import {
  PROPERTY_TYPES,
  TENANT_PREFERENCES,
  PropertyType,
  TenantPreference,
} from "@/constants/roomOptions"
import { searchRooms } from "@/features/rooms/room.service"

export default function HomePage() {
  const [location, setLocation] = useState("")
  const [minRent, setMinRent] = useState("")
  const [maxRent, setMaxRent] = useState("")
  const [propertyType, setPropertyType] = useState<PropertyType | "">("")
  const [tenantPreference, setTenantPreference] =
    useState<TenantPreference | "">("")
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if (!location) {
      alert("Location is required")
      return
    }

    setLoading(true)

    const data = await searchRooms({
      location,
      minRent: minRent ? Number(minRent) : undefined,
      maxRent: maxRent ? Number(maxRent) : undefined,
      propertyType: propertyType || undefined,
      tenantPreference: tenantPreference || undefined,
    })

    setRooms(data)
    setLoading(false)
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Find Rooms</h1>

      <input
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <input
        type="number"
        placeholder="Min Rent"
        value={minRent}
        onChange={(e) => setMinRent(e.target.value)}
      />

      <input
        type="number"
        placeholder="Max Rent"
        value={maxRent}
        onChange={(e) => setMaxRent(e.target.value)}
      />

      <select
        value={propertyType}
        onChange={(e) =>
          setPropertyType(e.target.value as PropertyType)
        }
      >
        <option value="">Any Property Type</option>
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
        <option value="">Any Tenant</option>
        {TENANT_PREFERENCES.map((pref) => (
          <option key={pref} value={pref}>
            {pref}
          </option>
        ))}
      </select>

      <button onClick={handleSearch} disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>

      <hr />

      {rooms.length === 0 && !loading && <p>No rooms found.</p>}

      {rooms.map((room) => (
        <div key={room.id} style={{ border: "1px solid #ccc", padding: 12 }}>
          <h3>{room.title}</h3>
          <p>{room.location}</p>
          <p>₹{room.rent}</p>
          <p>{room.property_type}</p>
          <p>{room.tenant_preference}</p>
        </div>
      ))}
    </div>
  )
}
