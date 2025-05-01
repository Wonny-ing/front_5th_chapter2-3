import { fetchComments } from "@entities/comment/api/services.ts"
import { useQuery } from "@tanstack/react-query"

export const useCommentsQuery = ({ postId }: { postId: number }) => {
  return useQuery({
    queryKey: ["comments", { postId }],
    queryFn: () => fetchComments({ postId }),
    enabled: !!postId,
  })
}
