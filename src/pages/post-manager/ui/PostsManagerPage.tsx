import { usePosts } from "@entities/comment/model/usePosts.ts"
import AddCommentDialog from "@pages/post-manager/ui/dialogs/AddCommentDialog.tsx"
import AddPostDialog from "@pages/post-manager/ui/dialogs/AddPostDialog.tsx"
import EditCommentDialog from "@pages/post-manager/ui/dialogs/EditCommentDialog.tsx"
import EditPostDialog from "@pages/post-manager/ui/dialogs/EditPostDialog.tsx"
import PostDialog from "@pages/post-manager/ui/dialogs/PostDialog.tsx"
import UserDialog from "@pages/post-manager/ui/dialogs/UserDialog.tsx"
import FilterBar from "@pages/post-manager/ui/FilterBar.tsx"
import PostPagination from "@pages/post-manager/ui/PostPagination.tsx"
import Posts from "@pages/post-manager/ui/Posts.tsx"
import { useLayoutStore } from "@shared/model/store.ts"
import { Button, Card, CardContent, CardHeader, CardTitle } from "@shared/ui"
import { Plus } from "lucide-react"
import { useCallback, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const PostsManager = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // ui관련 상태
  const {
    skip,
    limit,
    searchQuery,
    selectedTag,
    setShowAddDialog,
    initFromURL,
    updateURLParams,
    sortBy,
    sortOrder,
  } = useLayoutStore()

  // Posts 데이터 가져오기
  const { posts, loading, total } = usePosts()

  const updateURL = useCallback(() => {
    const queryString = updateURLParams()
    const currentQuery = location.search.slice(1)

    // URL이 실제로 변경된 경우에만 navigate 실행
    if (queryString !== currentQuery) {
      navigate(`?${queryString}`, { replace: true })
    }
  }, [updateURLParams, navigate, location.search])

  useEffect(() => {
    updateURL()
  }, [skip, limit, sortBy, sortOrder, selectedTag, searchQuery])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    initFromURL(params)
  }, [location.search])

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <FilterBar updateURL={updateURL} />

          {/* 게시물 테이블 */}
          {loading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <Posts posts={posts} updateURL={updateURL} />
          )}

          {/* 페이지네이션 */}
          <PostPagination total={total || 0} />
        </div>
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      <AddPostDialog />

      {/* 게시물 수정 대화상자 */}
      <EditPostDialog />

      {/* 댓글 추가 대화상자 */}
      <AddCommentDialog />

      {/* 댓글 수정 대화상자 */}
      <EditCommentDialog />

      {/* 게시물 상세 보기 대화상자 */}
      <PostDialog />

      {/* 사용자 모달 */}
      <UserDialog />
    </Card>
  )
}

export default PostsManager
