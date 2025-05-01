// fetchPosts와 같은 실제 API 호출 함수들

// 게시물 가져오기
import { NewPost, Post } from "@entities/post/model/types.ts"

export const fetchPosts = async ({ limit, skip }: { limit: number; skip: number }) => {
  const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
  const data = await response.json()
  return data
}

// 태그 가져오기
export const fetchTags = async () => {
  const response = await fetch("/api/posts/tags")
  const data = await response.json()
  return data
}

// 게시물 검색
export const searchPosts = async ({ searchQuery }: { searchQuery: string }) => {
  const response = await fetch(`/api/posts/search?q=${searchQuery}`)
  const data = await response.json()
  return data
}

// 태그별 게시물 가져오기
export const fetchPostByTag = async ({ tag }: { tag: string }) => {
  const response = await fetch(`/api/posts/tag/${tag}`)
  const data = await response.json()
  return data
}

// 게시물 추가
export const addPost = async ({ post }: { post: NewPost }) => {
  const response = await fetch("/api/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  })
  const data = await response.json()
  return data
}

// 게시물 업데이트
export const updatePost = async ({ post }: { post: Post | null }) => {
  const response = await fetch(`/api/posts/${post?.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  })
  const data = await response.json()
  return data
}

// 게시물 삭제
export const deletePost = async ({ id }: { id: number }) => {
  const response = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  })
  const data = await response.json()
  return data
}
