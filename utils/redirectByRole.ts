export function redirectByRole(role?: string | null) {
  if (role === "admin") return "/admin"
  if (role === "owner") return "/owner"
  return "/dashboard"
}
