import { useAddCommentMutation } from "@entities/comment/api/mutations.ts"
import { useCommentStore } from "@entities/comment/model/store.ts"
import { usePostStore } from "@entities/post/model/store.ts"
import { useLayoutStore } from "@shared/model/store.ts"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "@shared/ui"

export default function AddCommentDialog() {
  const { showAddCommentDialog, setShowAddCommentDialog } = useLayoutStore()
  const { selectedPost } = usePostStore()
  const { newComment, setNewComment } = useCommentStore()

  const addCommentMutation = useAddCommentMutation({ postId: selectedPost?.id ?? undefined })

  // 댓글 추가
  const addComment = async () => {
    try {
      await addCommentMutation.mutateAsync({ newComment })
      setShowAddCommentDialog(false)
      setNewComment({ body: "", postId: null, userId: 1 })
    } catch (error) {
      console.error("댓글 추가 오류:", error)
    }
  }

  return (
    <Dialog open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={newComment.body}
            onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
          />
          <Button onClick={addComment}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
