import { useCommentsQuery } from "@entities/comment/api/queries.ts"
import { usePostStore } from "@entities/post/model/store.ts"
import Comments from "@pages/post-manager/ui/Comments.tsx"
import { useLayoutStore } from "@shared/model/store.ts"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@shared/ui"
import HighlightText from "@shared/ui/HighlightText.tsx"

export default function PostDialog() {
  const { showPostDetailDialog, setShowPostDetailDialog, searchQuery } = useLayoutStore()
  const { selectedPost } = usePostStore()

  const { data: commentsData, isLoading: isCommentsLoading } = useCommentsQuery({
    postId: selectedPost?.id,
  })

  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            <HighlightText text={selectedPost?.title || ""} highlight={searchQuery} />
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>
            <HighlightText text={selectedPost?.body || ""} highlight={searchQuery} />
          </p>
          {/* 댓글 렌더링 */}
          {isCommentsLoading || !commentsData ? (
            <span>로딩 중...</span>
          ) : (
            <Comments
              postId={selectedPost?.id}
              searchQuery={searchQuery}
              selectedPost={selectedPost}
              commentsData={commentsData}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
