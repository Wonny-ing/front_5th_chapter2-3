import { NewPost } from "@entities/post/model/types.ts"
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
  showAddDialog: boolean
  setShowAddDialog: React.Dispatch<React.SetStateAction<boolean>>
  newPost: NewPost
  setNewPost: React.Dispatch<React.SetStateAction<NewPost>>
  addPost: () => Promise<void>
}
export default function AddPostDialog({
  showAddDialog,
  setShowAddDialog,
  newPost,
  setNewPost,
  addPost,
}: IProps) {
  return (
    <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <Textarea
            rows={30}
            placeholder="내용"
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          />
          <Input
            type="number"
            placeholder="사용자 ID"
            value={newPost.userId}
            onChange={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
          />
          <Button onClick={addPost}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
