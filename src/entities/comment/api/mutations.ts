import {
  addComment,
  deleteComment,
  likeComment,
  updateComment,
} from "@entities/comment/api/services.ts"
import { Comment, Comments } from "@entities/comment/model/types.ts"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useAddCommentMutation = ({ postId }: { postId: number }) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addComment,
    onSuccess: (newComment) => {
      queryClient.setQueryData<Comments>(["comments", { postId }], (oldData = []) => {
        const filtered = (oldData as Comments)?.comments.filter(
          (comment) => comment.id !== newComment.id,
        )
        return {
          ...oldData,
          comments: [...filtered, newComment],
        }
      })
    },
  })
}

export const useUpdateCommentMutation = ({ postId }: { postId: number }) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateComment,
    onSuccess: (updatedComment) => {
      queryClient.setQueryData<Comments>(["comments", { postId }], (oldData = []) => {
        const updatedComments = (oldData as Comments)?.comments.map((comment) =>
          comment.id === updatedComment.id ? updatedComment : comment,
        )
        return {
          ...oldData,
          comments: updatedComments,
        }
      })
    },
  })
}

export const useDeleteCommentMutation = ({ postId }: { postId: number }) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id }: { id: number }) => deleteComment({ id }),
    onSuccess: (deletedComment) => {
      queryClient.setQueryData<Comments>(["comments", { postId }], (oldData = []) => {
        const updatedPosts = oldData
          ? (oldData as Comments).comments.filter((comment) => comment.id !== deletedComment.id)
          : []
        return { ...oldData, comments: updatedPosts }
      })
    },
  })
}

export const useLikeCommentMutation = ({ postId }: { postId: number }) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ comments, id }: { comments: Comment[]; id: number }) =>
      likeComment({
        comments,
        id,
      }),
    onSuccess: (updatedComment) => {
      queryClient.setQueryData<Comments>(["comments", { postId }], (oldData) => {
        const updatedComments = (oldData as Comments)?.comments.map((comment) =>
          comment.id === updatedComment.id ? { ...comment, likes: comment.likes + 1 } : comment,
        )
        return {
          ...oldData,
          comments: updatedComments,
        }
      })
    },
  })
}
