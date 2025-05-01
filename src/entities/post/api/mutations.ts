import { addPost, deletePost, updatePost } from "@entities/post/api/services.ts"
import { Post } from "@entities/post/model/types.ts"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useAddPostMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })
}

export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ post }: { post: Post }) => updatePost({ post }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })
}

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id }: { id: number }) => deletePost({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })
}
