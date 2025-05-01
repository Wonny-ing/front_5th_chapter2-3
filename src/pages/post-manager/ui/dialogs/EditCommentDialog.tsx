import { useUpdateCommentMutation } from "@entities/comment/api/mutations.ts"
import { useCommentStore } from "@entities/comment/model/store.ts"
import { usePostStore } from "@entities/post/model/store.ts"
import { useLayoutStore } from "@shared/model/store.ts"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "@shared/ui"

export default function EditCommentDialog() {
  const { showEditCommentDialog, setShowEditCommentDialog } = useLayoutStore()
  const { selectedPost } = usePostStore()
  const { selectedComment, setSelectedComment } = useCommentStore()

  const updateCommentMutation = useUpdateCommentMutation({ postId: selectedPost?.id ?? undefined })

  // 댓글 업데이트
  const updateComment = async () => {
    try {
      if (!selectedComment) return
      await updateCommentMutation.mutateAsync({ selectedComment })
      setShowEditCommentDialog(false)
    } catch (error) {
      console.error("댓글 업데이트 오류:", error)
    }
  }

  return (
    <Dialog open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={selectedComment?.body || ""}
            onChange={(e) => {
              if (!selectedComment) return
              setSelectedComment({ ...selectedComment, body: e.target.value })
            }}
          />
          <Button onClick={updateComment}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
