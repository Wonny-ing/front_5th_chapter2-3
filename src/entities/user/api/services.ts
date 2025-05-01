import { User } from "@entities/user/model/types.ts"

export const fetchUsers = async () => {
  const response = await fetch("/api/users?limit=0&select=username,image")
  const data = await response.json()
  return data
}

export const fetchUserById = async ({ user }: { user: User }) => {
  const response = await fetch(`/api/users/${user.id}`)
  const data = await response.json()
  return data
}
