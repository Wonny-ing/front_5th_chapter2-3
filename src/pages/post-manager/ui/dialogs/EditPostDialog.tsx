import { useUpdatePostMutation } from "@entities/post/api/mutations.ts"
import { usePostStore } from "@entities/post/model/store.ts"
import { useLayoutStore } from "@shared/model/store.ts"
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Textarea,
} from "@shared/ui"
import React from "react"

export default function EditPostDialog() {
  const { showEditDialog, skip, limit, setShowEditDialog } = useLayoutStore()
  const { selectedPost, setSelectedPost } = usePostStore()

  const updatePostMutation = useUpdatePostMutation({ limit, skip })

  // 게시물 업데이트
  const updatePost = async () => {
    try {
      await updatePostMutation.mutateAsync({ post: selectedPost })
      setShowEditDialog(false)
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
    }
  }

  return (
    <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={selectedPost?.title || ""}
            onChange={(e) => {
              if (!selectedPost) return
              setSelectedPost({ ...selectedPost, title: e.target.value })
            }}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={selectedPost?.body || ""}
            onChange={(e) => {
              if (!selectedPost) return
              setSelectedPost({ ...selectedPost, body: e.target.value })
            }}
          />
          <Button onClick={updatePost}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
