const KEY = "recently_viewed_rooms"

export function addRecentlyViewed(roomId: string) {
  if (typeof window === "undefined") return

  const existing: string[] = JSON.parse(
    localStorage.getItem(KEY) || "[]"
  )

  const updated = [
    roomId,
    ...existing.filter((id) => id !== roomId),
  ].slice(0, 5)

  localStorage.setItem(KEY, JSON.stringify(updated))
}

export function getRecentlyViewed(): string[] {
  if (typeof window === "undefined") return []
  return JSON.parse(localStorage.getItem(KEY) || "[]")
}
