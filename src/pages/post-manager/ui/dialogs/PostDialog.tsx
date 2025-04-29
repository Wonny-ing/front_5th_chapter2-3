import Comments from "@pages/post-manager/ui/Comments.tsx"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@shared/ui"

export default function PostDialog({
  showPostDetailDialog,
  setShowPostDetailDialog,
  highlightText,
  selectedPost,
  searchQuery,
  setNewComment,
  setShowAddCommentDialog,
  comments,
  likeComment,
  setSelectedComment,
  setShowEditCommentDialog,
  deleteComment,
}) {
  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(selectedPost?.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(selectedPost?.body, searchQuery)}</p>
          {/* 댓글 렌더링 */}
          <Comments
            postId={selectedPost?.id}
            setNewComment={setNewComment}
            setShowAddCommentDialog={setShowAddCommentDialog}
            comments={comments}
            highlightText={highlightText}
            searchQuery={searchQuery}
            likeComment={likeComment}
            setSelectedComment={setSelectedComment}
            setShowEditCommentDialog={setShowEditCommentDialog}
            deleteComment={deleteComment}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
