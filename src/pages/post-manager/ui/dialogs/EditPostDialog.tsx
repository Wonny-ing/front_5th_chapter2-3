import { Post } from "@entities/post/model/types.ts"
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

interface IProps {
  showEditDialog: boolean
  setShowEditDialog: React.Dispatch<React.SetStateAction<boolean>>
  selectedPost: Post | null
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>
  updatePost: () => Promise<void>
}
export default function EditPostDialog({
  showEditDialog,
  setShowEditDialog,
  selectedPost,
  setSelectedPost,
  updatePost,
}: IProps) {
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
            onChange={(e) => setSelectedPost({ ...selectedPost, title: e.target.value })}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={selectedPost?.body || ""}
            onChange={(e) => setSelectedPost({ ...selectedPost, body: e.target.value })}
          />
          <Button onClick={updatePost}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
