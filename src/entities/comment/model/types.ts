import { User } from "@entities/user/model/types.ts"

export interface NewComment {
  body: string
  postId: number | null
  userId: number
}
export interface Comment {
  id: number
  body: string
  postId: number
  likes?: number
  user: Pick<User, "id" | "username" | "fullName">
}

export interface Comments {
  id: number
  body: string
  postId: number
  likes: number
  comments: Comment[]
}
