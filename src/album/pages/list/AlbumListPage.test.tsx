// AlbumListPage.test.tsx
import { render, screen, waitFor } from "@testing-library/react"
import AlbumListPage from "./AlbumListPage"
import useAlbum from "album/hooks/useAlbum"

jest.mock("axios", () => ({
  create: () => ({
    get: jest.fn(() => Promise.resolve({ data: [] }))
  })
}))

jest.mock("album/components/AlbumListTable", () => (props: any) => {
  return (
    <div data-testid="album-table">
      {props.loading ? (
        <div>Loading...</div>
      ) : (
        Array.isArray(props.albums) &&
        props.albums.map((album: any) => <div key={album.id}>{album.title}</div>)
      )}
    </div>
  )
})

jest.mock("album/components/AlbumListPagination", () => (props: any) => (
  <div data-testid="pagination">
    Current: {props.queryOptions.currentPage}, Size: {props.queryOptions.pageSize}, Total:{" "}
    {props.total}
  </div>
))

jest.mock("album/hooks/useAlbum", () => {
  const originalModule = jest.requireActual("album/hooks/useAlbum")
  return {
    __esModule: true,
    default: {
      ...originalModule.default,
      fetchAlbumList: jest.fn(() => ({
        data: [],
        isLoading: false
      }))
    }
  }
})

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useSearchParams: () => [
    new URLSearchParams({ currentPage: "1", pageSize: "20" }),
    jest.fn()
  ],
  useNavigate: () => jest.fn()
}))

describe("AlbumListPage", () => {
  const mockAlbums = Array.from({ length: 100 }, (_, i) => ({
    userId: i + 1,
    id: i + 1,
    title: `Album ${i + 1}`,
    user: {
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`
    }
  }))

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should render with fetched album data", async () => {
    ;(useAlbum.fetchAlbumList as jest.Mock).mockReturnValue({
      data: mockAlbums,
      isLoading: false
    })

    render(<AlbumListPage />)

    await waitFor(() => {
      expect(useAlbum.fetchAlbumList).toHaveBeenCalled()
    })
  })

  it("should display 20 albums on page 1 with page size 20", async () => {
    ;(useAlbum.fetchAlbumList as jest.Mock).mockReturnValue({
      data: mockAlbums,
      isLoading: false
    })

    render(<AlbumListPage />)

    await waitFor(() => {
      const displayedAlbums = screen.getAllByText(/Album \d+/)
      expect(displayedAlbums.length).toBe(20)
    })
  })

  it("should display no albums on page 3 with page size 50", async () => {
    jest
      .spyOn(require("react-router"), "useSearchParams")
      .mockImplementation(() => [
        new URLSearchParams({ currentPage: "3", pageSize: "50" }),
        jest.fn()
      ])
    ;(useAlbum.fetchAlbumList as jest.Mock).mockReturnValue({
      data: mockAlbums,
      isLoading: false
    })

    render(<AlbumListPage />)

    await waitFor(() => {
      const displayedAlbums = screen.queryAllByText(/Album \d+/)
      expect(displayedAlbums.length).toBe(0)
    })
    const displayedAlbums = screen.queryAllByText(/Album \d+/)
    expect(displayedAlbums.length).toBe(0)
    expect(screen.getByText(/Size: 50/)).toBeInTheDocument()
  })
})
