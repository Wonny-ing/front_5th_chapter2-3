import {
  usePostByTagQuery,
  usePostsQuery,
  useSearchPostsQuery,
} from "@entities/post/api/queries.ts"
import { useUsersQuery } from "@entities/user/api/queries.ts"
import { useLayoutStore } from "@shared/model/store.ts"
import { useMemo } from "react"

export const usePosts = () => {
  // Layout store에서 필터링 상태 가져오기
  const { skip, limit, searchQuery, selectedTag, sortBy, sortOrder } = useLayoutStore()

  // 데이터 쿼리
  const { data: searchData, isLoading: isSearchLoading } = useSearchPostsQuery({
    searchQuery,
  })
  const { data: tagData, isLoading: isTagLoading } = usePostByTagQuery({
    tag: selectedTag,
  })
  const { data: defaultData, isLoading: isDefaultLoading } = usePostsQuery({
    limit,
    skip,
  })
  const { data: usersData } = useUsersQuery()

  // 현재 사용할 데이터 결정
  const currentPostsData = useMemo(() => {
    if (searchQuery) return searchData
    if (selectedTag && selectedTag !== "all") return tagData
    return defaultData
  }, [searchQuery, selectedTag, searchData, tagData, defaultData])

  // Posts와 User 데이터 결합
  const posts = useMemo(() => {
    if (!currentPostsData?.posts || !usersData?.users) return []
    return currentPostsData.posts.map((post) => ({
      ...post,
      author: usersData.users.find((user) => user.id === post.userId),
    }))
  }, [currentPostsData, usersData])

  // 전체 로딩 상태
  const loading = isSearchLoading || isTagLoading || isDefaultLoading

  return {
    posts,
    loading,
    total: currentPostsData?.total || 0,
  }
}
