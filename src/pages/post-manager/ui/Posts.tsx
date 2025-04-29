import Post from "@pages/post-manager/ui/Post.tsx"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@shared/ui"
import React from "react"

export default function Posts({
  posts,
  highlightText,
  searchQuery,
  selectedTag,
  setSelectedTag,
  updateURL,
  openPostDetail,
  openUserModal,
  setSelectedPost,
  setShowEditDialog,
  deletePost,
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">ID</TableHead>
          <TableHead>제목</TableHead>
          <TableHead className="w-[150px]">작성자</TableHead>
          <TableHead className="w-[150px]">반응</TableHead>
          <TableHead className="w-[150px]">작업</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            highlightText={highlightText}
            searchQuery={searchQuery}
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
            updateURL={updateURL}
            openUserModal={openUserModal}
            openPostDetail={openPostDetail}
            setSelectedPost={setSelectedPost}
            setShowEditDialog={setShowEditDialog}
            deletePost={deletePost}
          />
        ))}
      </TableBody>
    </Table>
  )
}
