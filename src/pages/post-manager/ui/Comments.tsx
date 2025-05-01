import {
  useDeleteCommentMutation,
  useLikeCommentMutation,
} from "@entities/comment/api/mutations.ts"
import { Button } from "@shared/ui"
import HighlightText from "@shared/ui/HighlightText.tsx"
import { Edit2, Plus, ThumbsUp, Trash2 } from "lucide-react"

export default function Comments({
  postId,
  setNewComment,
  setShowAddCommentDialog,
  searchQuery,
  setSelectedComment,
  setShowEditCommentDialog,
  selectedPost,
  comments,
  isCommentLoading,
}) {
  const deleteCommentMutation = useDeleteCommentMutation({ postId: selectedPost?.id })
  const likeCommentMutation = useLikeCommentMutation({ postId: selectedPost?.id })

  if (isCommentLoading) {
    return null
  }

  // 댓글 삭제
  const deleteComment = async (id) => {
    try {
      await deleteCommentMutation.mutateAsync({ id })
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
    }
  }

  // 댓글 좋아요
  const likeComment = async (id) => {
    if (isCommentLoading || !comments) return
    try {
      await likeCommentMutation.mutateAsync({ comments: comments, id })
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
    }
  }

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={() => {
            setNewComment((prev) => ({ ...prev, postId }))
            setShowAddCommentDialog(true)
          }}
        >
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments?.map((comment) => (
          <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="font-medium truncate">{comment.user.username}:</span>
              <span className="truncate">
                <HighlightText text={comment.body} highlight={searchQuery} />
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" onClick={() => likeComment(comment.id)}>
                <ThumbsUp className="w-3 h-3" />
                <span className="ml-1 text-xs">{comment.likes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedComment(comment)
                  setShowEditCommentDialog(true)
                }}
              >
                <Edit2 className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => deleteComment(comment.id)}>
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
