import { PostTag } from "@pages/post-manager/ui/PostsManagerPage.tsx"
import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/ui/index.tsx"
import { Search } from "lucide-react"
import React from "react"

interface IProps {
  searchQuery: string
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
  selectedTag: string
  setSelectedTag: React.Dispatch<React.SetStateAction<string>>
  sortBy: string
  setSortBy: React.Dispatch<React.SetStateAction<string>>
  sortOrder: string
  setSortOrder: React.Dispatch<React.SetStateAction<string>>
  tags: PostTag[]
  updateURL: () => void
  fetchPostsByTag: (tag: string) => void
  searchPosts: () => void
}
export default function FilterBar({
  searchQuery,
  setSearchQuery,
  fetchPostsByTag,
  searchPosts,
  selectedTag,
  setSelectedTag,
  updateURL,
  tags,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
}: IProps) {
  return (
    <div className="flex gap-4">
      <div className="flex-1">
        {/* 검색 기능 */}
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="게시물 검색..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && searchPosts()}
          />
        </div>
      </div>
      {/* 태그 선택 Select */}
      <Select
        value={selectedTag}
        onValueChange={(value) => {
          setSelectedTag(value)
          fetchPostsByTag(value)
          updateURL()
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="태그 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">모든 태그</SelectItem>
          {tags.map((tag: PostTag) => (
            <SelectItem key={tag.url} value={tag.slug}>
              {tag.slug}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {/* 정렬 기준 Select */}
      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 기준" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">없음</SelectItem>
          <SelectItem value="id">ID</SelectItem>
          <SelectItem value="title">제목</SelectItem>
          <SelectItem value="reactions">반응</SelectItem>
        </SelectContent>
      </Select>
      {/* 정렬 방식 Select */}
      <Select value={sortOrder} onValueChange={setSortOrder}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 순서" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">오름차순</SelectItem>
          <SelectItem value="desc">내림차순</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
