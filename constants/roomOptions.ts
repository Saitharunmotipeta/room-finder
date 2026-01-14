export const PROPERTY_TYPES = [
  "1BHK",
  "2BHK",
  "3BHK",
  "1Bed",
  "2Bed",
  "3Bed",
] as const

export const TENANT_PREFERENCES = [
  "Bachelor",
  "Family",
  "Girls",
  "Working",
] as const

export type PropertyType = (typeof PROPERTY_TYPES)[number]
export type TenantPreference = (typeof TENANT_PREFERENCES)[number]
