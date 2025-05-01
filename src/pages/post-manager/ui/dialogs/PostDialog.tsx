import { useLikeCommentMutation } from "@entities/comment/api/mutations.ts"
import { useCommentsQuery } from "@entities/comment/api/queries.ts"
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
  setSelectedComment,
  setShowEditCommentDialog,
  deleteComment,
}) {
  const { data, isLoading } = useCommentsQuery({ postId: selectedPost?.id })
  const likeCommentMutation = useLikeCommentMutation({ postId: selectedPost?.id })

  // 댓글 좋아요
  const likeComment = async (id) => {
    if (isLoading || !data) return
    try {
      await likeCommentMutation.mutateAsync({ comments: data.comments, id })
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
    }
  }

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
