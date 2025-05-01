import {
  addComment,
  deleteComment,
  likeComment,
  updateComment,
} from "@entities/comment/api/services.ts"
import { Comment, CommentsByPostId } from "@entities/comment/model/types.ts"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useAddCommentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ newComment }: { newComment: any }) => addComment({ newComment }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] })
    },
  })
}

export const useUpdateCommentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ selectedComment }: { selectedComment: Comment }) =>
      updateComment({ selectedComment }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] })
    },
  })
}

export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id }: { id: number }) => deleteComment({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] })
    },
  })
}

export const useLikeCommentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      comments,
      id,
      postId,
    }: {
      comments: CommentsByPostId
      id: number
      postId: number
    }) =>
      likeComment({
        comments,
        id,
        postId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] })
    },
  })
}
