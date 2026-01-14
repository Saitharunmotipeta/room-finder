export type Room = {
  id: string
  title: string
  location: string
  rent: number
  property_type: string
  tenant_preference: string
  owner_email: string
  room_images: { image_url: string }[]
}
