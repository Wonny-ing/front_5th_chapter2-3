import { Comment, NewComment } from "@entities/comment/model/types.ts"
import { create } from "zustand"

export interface CommentState {
  selectedComment: Comment | null
  newComment: {
    body: string
    postId: number | null
    userId: number
  }
  setSelectedComment: (comment: Comment | null) => void
  setNewComment: (newComment: NewComment) => void
}

export const useCommentStore = create<CommentState>((set) => ({
  selectedComment: null,
  newComment: { body: "", postId: null, userId: 1 },
  setSelectedComment: (comment) => set({ selectedComment: comment }),
  setNewComment: (newComment) =>
    set((state) => ({
      newComment: { ...state.newComment, ...newComment },
    })),
}))
