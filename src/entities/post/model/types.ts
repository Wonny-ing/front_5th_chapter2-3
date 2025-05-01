export interface Post {
  id: number
  title: string
  body: string
  tags: string[]
  reactions: {
    likes: number
    dislikes: number
  }
  views: number
  userId: number
  author: {
    id: number
    username: string
    image: string
  }
}

export interface NewPost {
  title: string
  body: string
  userId: number
}

export interface PostTag {
  slug: string
  name: string
  url: string
}

export interface Posts {
  posts: Post[]
  limit: number
  skip: number
  total: number
}
