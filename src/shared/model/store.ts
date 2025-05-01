import { create } from "zustand"

interface LayoutState {
  showAddDialog: boolean
  showEditDialog: boolean
  showPostDetailDialog: boolean
  showUserModal: boolean
  showAddCommentDialog: boolean
  showEditCommentDialog: boolean

  skip: number
  limit: number
  searchQuery: string
  selectedTag: string
  sortBy: string
  sortOrder: "asc" | "desc"

  setShowAddDialog: (show: boolean) => void
  setShowEditDialog: (show: boolean) => void
  setShowPostDetailDialog: (show: boolean) => void
  setShowUserModal: (show: boolean) => void
  setShowAddCommentDialog: (show: boolean) => void
  setShowEditCommentDialog: (show: boolean) => void

  setSkip: (skip: number) => void
  setLimit: (limit: number) => void
  setSearchQuery: (query: string) => void
  setSelectedTag: (tag: string) => void
  setSortBy: (sortBy: string) => void
  setSortOrder: (sortOrder: "asc" | "desc") => void

  initFromURL: (searchParams: URLSearchParams) => void
  updateURLParams: () => string
}

export const useLayoutStore = create<LayoutState>((set, get) => ({
  showAddDialog: false,
  showEditDialog: false,
  showPostDetailDialog: false,
  showUserModal: false,
  showAddCommentDialog: false,
  showEditCommentDialog: false,

  skip: 0,
  limit: 10,
  searchQuery: "",
  selectedTag: "",
  sortBy: "",
  sortOrder: "asc",

  setShowAddDialog: (show) => set({ showAddDialog: show }),
  setShowEditDialog: (show) => set({ showEditDialog: show }),
  setShowPostDetailDialog: (show) => set({ showPostDetailDialog: show }),
  setShowUserModal: (show) => set({ showUserModal: show }),
  setShowAddCommentDialog: (show) => set({ showAddCommentDialog: show }),
  setShowEditCommentDialog: (show) => set({ showEditCommentDialog: show }),

  setSkip: (skip) => set({ skip }),
  setLimit: (limit) => set({ limit }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedTag: (tag) => set({ selectedTag: tag }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (sortOrder) => set({ sortOrder }),

  initFromURL: (searchParams) => {
    set({
      skip: parseInt(searchParams.get("skip") || "0"),
      limit: parseInt(searchParams.get("limit") || "10"),
      searchQuery: searchParams.get("search") || "",
      selectedTag: searchParams.get("tag") || "",
      sortBy: searchParams.get("sortBy") || "",
      sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || "asc",
    })
  },

  updateURLParams: () => {
    const state = get()
    const params = new URLSearchParams()

    if (state.skip) params.set("skip", state.skip.toString())
    if (state.limit !== 10) params.set("limit", state.limit.toString())
    if (state.searchQuery) params.set("search", state.searchQuery)
    if (state.selectedTag) params.set("tag", state.selectedTag)
    if (state.sortBy) params.set("sortBy", state.sortBy)
    if (state.sortOrder !== "asc") params.set("sortOrder", state.sortOrder)

    return params.toString()
  },
}))
