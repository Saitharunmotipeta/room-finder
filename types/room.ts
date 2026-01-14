export type Room = {
  id: string
  owner_id: string
  title: string
  description: string | null
  location: string
  rent: number
  property_type: string
  tenant_preference: string
  created_at: string
}
