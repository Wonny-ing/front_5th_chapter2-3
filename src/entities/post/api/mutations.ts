import { addPost, deletePost, updatePost } from "@entities/post/api/services.ts"
import { Posts } from "@entities/post/model/types.ts"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useAddPostMutation = ({ limit, skip }: { limit: number; skip: number }) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addPost,
    onSuccess: (newPost) => {
      queryClient.setQueryData<Posts>(["posts", { limit, skip }], (oldData) => {
        const updatedPosts = oldData ? [newPost, ...oldData.posts] : [newPost]
        return { ...oldData, posts: updatedPosts }
      })
    },
  })
}

export const useUpdatePostMutation = ({ limit, skip }: { limit: number; skip: number }) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updatePost,
    onSuccess: (updatedPost) => {
      // 업데이트된 데이터를 기존 posts에 반영
      queryClient.setQueryData<Posts>(["posts", { limit, skip }], (oldData) => {
        const updatedPosts = (oldData as Posts).posts.map((post) =>
          post.id === updatedPost.id ? updatedPost : post,
        )
        return { ...oldData, posts: updatedPosts }
      })
    },
  })
}

export const useDeletePostMutation = ({ limit, skip }: { limit: number; skip: number }) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id }: { id: number }) => deletePost({ id }),
    onSuccess: (deletedPost) => {
      queryClient.setQueryData<Posts>(["posts", { limit, skip }], (oldData) => {
        // 기존 posts 데이터를 가져와서 삭제된 post를 제외
        const updatedPosts = oldData
          ? oldData.posts.filter((post) => post.id !== deletedPost.id)
          : []
        return { ...oldData, posts: updatedPosts }
      })
    },
  })
}
