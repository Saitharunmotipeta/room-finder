export type RoomSearchFilters = {
  location?: string
  property_type?: string
  tenant_preference?: string
  maxRent?: number
}

export function parseSearchQuery(query: string): RoomSearchFilters {
  const q = query.toLowerCase()

  const filters: RoomSearchFilters = {}

  // 🏠 BHK
  if (q.includes("1 bhk")) filters.property_type = "1 BHK"
  if (q.includes("2 bhk")) filters.property_type = "2 BHK"
  if (q.includes("3 bhk")) filters.property_type = "3 BHK"

  // 👨‍👩‍👧 Tenant
  if (q.includes("family")) filters.tenant_preference = "family"
  if (q.includes("bachelor")) filters.tenant_preference = "bachelor"

  // 💰 Rent
  const rentMatch =
    q.match(/under\s?(\d+)/) ||
    q.match(/below\s?(\d+)/) ||
    q.match(/less than\s?(\d+)/)

  if (rentMatch) {
    filters.maxRent = Number(rentMatch[1])
  }

  // 📍 Location (fallback)
  const blacklist = [
    "1",
    "2",
    "3",
    "bhk",
    "family",
    "bachelor",
    "under",
    "below",
    "less",
    "than",
  ]

  const location = q
    .split(" ")
    .filter(word => !blacklist.includes(word))
    .join(" ")
    .trim()

  if (location.length > 2) {
    filters.location = location
  }

  return filters
}
