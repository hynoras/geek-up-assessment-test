import "./style.scss"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import AlbumListTable from "album/components/AlbumListTable"
import AlbumListPagination from "album/components/AlbumListPagination"
import { API } from "shared/constants/apiConstants"
import { GENERIC } from "shared/constants/genericValues"
import useAlbum from "album/hooks/useAlbum"

const AlbumListPage: React.FC = () => {
  const [paginationParams, setPaginationParams] = useSearchParams()
  const currentPage = parseInt(paginationParams.get(GENERIC.KEY.CURRENT_PAGE) || "1")
  const pageSize = parseInt(paginationParams.get(GENERIC.KEY.PAGE_SIZE) || "10")

  const [paginationOptions, setPaginationOptions] = useState({ currentPage, pageSize })

  useEffect(() => {
    setPaginationParams((prev) => {
      prev.set(GENERIC.KEY.CURRENT_PAGE, paginationOptions.currentPage.toString())
      prev.set(GENERIC.KEY.PAGE_SIZE, paginationOptions.pageSize.toString())
      return prev
    })
  }, [paginationOptions, setPaginationParams])

  const { data, isLoading } = useAlbum.fetchAlbumList()

  const startIndex = (currentPage - API.PARAMS.PAGINATION.DEFAULT_CURRENT_PAGE) * pageSize
  const paginatedAlbums = data.slice(startIndex, startIndex + pageSize)

  const onChangePagination = (page: number, size: number) => {
    setPaginationOptions({
      currentPage: page,
      pageSize: size
    })
  }

  return (
    <>
      <p>Album List</p>
      <AlbumListTable
        albums={paginatedAlbums || GENERIC.NULL_VALUE.EMPTY.STRING}
        loading={isLoading}
        // setQueryOptions={setQueryOptions}
        // rowSelection={rowSelection}
      />
      <AlbumListPagination
        total={data.length || GENERIC.NULL_VALUE.ZERO}
        queryOptions={paginationOptions}
        onChangePagination={onChangePagination}
      />
    </>
  )
}

export default AlbumListPage
