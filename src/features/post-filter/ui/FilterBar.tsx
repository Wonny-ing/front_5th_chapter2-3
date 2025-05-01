import { usePostTagsQuery } from "@entities/post/api/queries.ts"
import { PostTag } from "@entities/post/model/types.ts"
import { useLayoutStore } from "@shared/model/store.ts"
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/ui"
import { Search } from "lucide-react"
import React from "react"

interface FilterBarProps {
  updateURL: () => void
}
export default function FilterBar({ updateURL }: FilterBarProps) {
  const {
    searchQuery,
    setSearchQuery,
    selectedTag,
    setSelectedTag,
    sortBy,
    setSortBy,
    setSortOrder,
    sortOrder,
  } = useLayoutStore()

  const { data: tags } = usePostTagsQuery()

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
            onKeyPress={(e) => {
              if (e.key === "Enter" && !searchQuery) {
                setSelectedTag("")
              }
            }}
          />
        </div>
      </div>
      {/* 태그 선택 Select */}
      <Select
        value={selectedTag}
        onValueChange={(value) => {
          setSelectedTag(value === "all" ? "" : value)
          updateURL()
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="태그 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">모든 태그</SelectItem>
          {tags?.map((tag: PostTag) => (
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
