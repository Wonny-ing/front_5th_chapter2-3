import {
  addComment,
  deleteComment,
  likeComment,
  updateComment,
} from "@entities/comment/api/services.ts"
import { Comment, Comments } from "@entities/comment/model/types.ts"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useAddCommentMutation = ({ postId }: { postId: number | undefined }) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addComment,
    onSuccess: (newComment) => {
      if (!postId) return
      queryClient.setQueryData<Comments>(["comments", { postId }], (oldData = []) => {
        return {
          ...oldData,
          // eslint-disable-next-line no-unsafe-optional-chaining
          comments: [...(oldData as Comments)?.comments, newComment],
        }
      })
    },
  })
}

export const useUpdateCommentMutation = ({ postId }: { postId: number | undefined }) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateComment,
    onSuccess: (_, { selectedComment }) => {
      if (!postId) return
      queryClient.setQueryData<Comments>(["comments", { postId }], (oldData = []) => {
        const updatedComments = (oldData as Comments)?.comments.map((comment) =>
          comment.id === selectedComment.id ? selectedComment : comment,
        )
        return {
          ...oldData,
          comments: updatedComments,
        }
      })
    },
  })
}

export const useDeleteCommentMutation = ({ postId }: { postId: number | undefined }) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id }: { id: number }) => deleteComment({ id }),
    onSuccess: (_, { id }) => {
      if (!postId) return
      queryClient.setQueryData<Comments>(["comments", { postId }], (oldData = []) => {
        const updatedPosts = oldData
          ? (oldData as Comments).comments.filter((comment) => comment.id !== id)
          : []
        return { ...oldData, comments: updatedPosts }
      })
    },
  })
}

export const useLikeCommentMutation = ({ postId }: { postId: number | undefined }) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ comments, id }: { comments: Comment[]; id: number }) =>
      likeComment({
        comments,
        id,
      }),
    onSuccess: (_, { comments, id }) => {
      if (!postId) return
      queryClient.setQueryData<Comments>(["comments", { postId }], (oldData) => {
        const updatedComments = (oldData as Comments)?.comments.map((comment) =>
          comment.id === id
            ? { ...comment, likes: (comments.find((c) => c.id === id)?.likes ?? 0) + 1 }
            : comment,
        )
        return {
          ...oldData,
          comments: updatedComments,
        }
      })
    },
  })
}
