import { Comment, CommentsByPostId, NewComment } from "@entities/comment/model/types.ts"

// 댓글 가져오기
export const fetchComments = async ({ postId }: { postId: number }) => {
  const response = await fetch(`/api/comments/post/${postId}`)
  const data = await response.json()
  return data
}

// 댓글 추가
export const addComment = async ({ newComment }: { newComment: NewComment }) => {
  const response = await fetch("/api/comments/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newComment),
  })
  const data = await response.json()
  return data
}

// 댓글 업데이트
export const updateComment = async ({ selectedComment }: { selectedComment: Comment }) => {
  const response = await fetch(`/api/comments/${selectedComment.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ body: selectedComment.body }),
  })
  const data = await response.json()
  return data
}

// 댓글 삭제
export const deleteComment = async ({ id }: { id: number }) => {
  const response = await fetch(`/api/comments/${id}`, {
    method: "DELETE",
  })
  const data = await response.json()
  return data
}

// 댓글 좋아요
export const likeComment = async ({
  comments,
  id,
  postId,
}: {
  comments: CommentsByPostId
  id: number
  postId: number
}) => {
  const response = await fetch(`/api/comments/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ likes: comments[postId].find((c) => c.id === id).likes + 1 }),
  })
  const data = await response.json()
  return data
}
