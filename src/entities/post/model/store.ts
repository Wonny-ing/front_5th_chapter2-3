import { Post } from "@entities/post/model/types.ts"
import { create } from "zustand"

interface PostState {
  selectedPost: Post | null

  newPost: {
    title: string
    body: string
    userId: number
  }

  setSelectedPost: (post: Post | null) => void
  setNewPost: (newPost: Partial<PostState["newPost"]>) => void
}

export const usePostStore = create<PostState>((set) => ({
  selectedPost: null,
  newPost: { title: "", body: "", userId: 1 },

  setSelectedPost: (post) =>
    set((state) => ({
      ...state,
      selectedPost: post,
    })),

  setNewPost: (newPost) =>
    set((state) => ({
      newPost: { ...state.newPost, ...newPost },
    })),
}))
