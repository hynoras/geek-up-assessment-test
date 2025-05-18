import { Pagination } from "antd"
import { API } from "shared/constants/apiConstants"

type AlbumListPaginationProps = {
  total: number | undefined
  queryOptions: {
    currentPage: number
    pageSize: number
  }
  onChangePagination: ((page: number, pageSize: number) => void) | undefined
}

const AlbumListPagination: React.FC<AlbumListPaginationProps> = ({
  total,
  queryOptions,
  onChangePagination
}) => {
  return (
    <>
      <Pagination
        className="album-pagination"
        align="end"
        defaultCurrent={API.PARAMS.PAGINATION.DEFAULT_CURRENT_PAGE}
        current={queryOptions.currentPage}
        total={total}
        pageSize={queryOptions.pageSize}
        onChange={onChangePagination}
        showQuickJumper
        showTotal={(total) => `Total ${total} albums`}
      />
    </>
  )
}

export default AlbumListPagination
