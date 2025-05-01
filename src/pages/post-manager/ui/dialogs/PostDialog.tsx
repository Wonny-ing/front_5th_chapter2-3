import Comments from "@pages/post-manager/ui/Comments.tsx"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@shared/ui"
import HighlightText from "@shared/ui/HighlightText.tsx"

export default function PostDialog({
  showPostDetailDialog,
  setShowPostDetailDialog,
  selectedPost,
  searchQuery,
  setNewComment,
  setShowAddCommentDialog,
  setSelectedComment,
  setShowEditCommentDialog,
  comments,
  isCommentLoading,
}) {
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
          <Comments
            postId={selectedPost?.id}
            setNewComment={setNewComment}
            setShowAddCommentDialog={setShowAddCommentDialog}
            searchQuery={searchQuery}
            setSelectedComment={setSelectedComment}
            setShowEditCommentDialog={setShowEditCommentDialog}
            selectedPost={selectedPost}
            comments={comments}
            isCommentLoading={isCommentLoading}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
