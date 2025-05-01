import { User } from "@entities/user/model/types.ts"

export const fetchUsers = async () => {
  const response = await fetch("/api/users?limit=0&select=username,image")
  const data = await response.json()
  return data
}

export const fetchUserById = async ({ id }: { id: number }) => {
  const response = await fetch(`/api/users/${id}`)
  const data = await response.json()
  return data
}
