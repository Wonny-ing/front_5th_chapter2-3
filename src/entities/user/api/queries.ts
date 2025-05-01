import { fetchUserById, fetchUsers } from "@entities/user/api/services.ts"
import { User } from "@entities/user/model/types.ts"
import { useQuery } from "@tanstack/react-query"

export const useUsersQuery = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
  })
}

export const useUserByIdQuery = ({ user }: { user: User }) => {
  return useQuery({
    queryKey: ["user", user],
    queryFn: () => fetchUserById({ user }),
  })
}
