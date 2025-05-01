import { fetchComments } from "@entities/comment/api/services.ts"
import { useQuery } from "@tanstack/react-query"

export const useCommentsQuery = ({ postId }: { postId: number | undefined }) => {
  return useQuery({
    queryKey: ["comments", { postId }],
    queryFn: () => fetchComments({ postId: postId! }),
    enabled: !!postId,
  })
}
