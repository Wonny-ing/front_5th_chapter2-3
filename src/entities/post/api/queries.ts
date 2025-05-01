import { fetchPostByTag, fetchPosts, fetchTags, searchPosts } from "@entities/post/api/services.ts"
import { useQuery } from "@tanstack/react-query"

// Tanstack Query 훅들
export const usePostsQuery = ({ limit, skip }: { limit: number; skip: number }) => {
  return useQuery({
    queryKey: ["posts", { limit, skip }],
    queryFn: () => fetchPosts({ limit, skip }),
  })
}
export const usePostTagsQuery = () => {
  return useQuery({
    queryKey: ["post-tags"],
    queryFn: fetchTags,
  })
}

export const useSearchPostsQuery = ({ searchQuery }: { searchQuery: string }) => {
  return useQuery({
    queryKey: ["searchPosts", searchQuery],
    queryFn: () => searchPosts({ searchQuery }),
    enabled: !!searchQuery,
  })
}

export const usePostByTagQuery = ({ tag }: { tag: string }) => {
  return useQuery({
    queryKey: ["searchPosts", tag],
    queryFn: () => fetchPostByTag({ tag }),
    enabled: !!tag,
  })
}
