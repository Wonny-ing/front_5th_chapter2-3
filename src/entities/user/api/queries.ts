import { fetchUserById, fetchUsers } from "@entities/user/api/services.ts"
import { useQuery } from "@tanstack/react-query"

export const useUsersQuery = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
  })
}

export const useUserByIdQuery = ({ id }: { id: number }) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUserById({ id }),
  })
}
