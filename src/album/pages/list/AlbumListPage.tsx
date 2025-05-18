import "shared/themes/list/GeneralListPage.scss"
import { useEffect, useMemo, useState } from "react"
import { useNavigate, useSearchParams } from "react-router"
import AlbumListTable from "album/components/AlbumListTable"
import AlbumListPagination from "album/components/AlbumListPagination"
import { API } from "shared/constants/apiConstants"
import { GENERIC } from "shared/constants/genericValues"
import useAlbum from "album/hooks/useAlbum"
import { ALBUM } from "album/constants/albumConstants"
import { AlbumWithUserDetail } from "album/models/dtos/albumDtos"
import { TableColumnsType, Button } from "antd"
import { EyeOutlined } from "@ant-design/icons"
import userService from "user/services/userService"

const AlbumListPage: React.FC = () => {
  const [paginationParams, setPaginationParams] = useSearchParams()
  const navigate = useNavigate()
  const currentPage = parseInt(
    paginationParams.get(GENERIC.KEY.CURRENT_PAGE) ||
      `${API.PARAMS.PAGINATION.DEFAULT_CURRENT_PAGE}`
  )
  const pageSize = parseInt(
    paginationParams.get(GENERIC.KEY.PAGE_SIZE) ||
      `${API.PARAMS.PAGINATION.DEFAULT_PAGE_SIZE}`
  )

  const [paginationOptions, setPaginationOptions] = useState({ currentPage, pageSize })

  useEffect(() => {
    setPaginationParams((prev) => {
      prev.set(GENERIC.KEY.CURRENT_PAGE, paginationOptions.currentPage.toString())
      prev.set(GENERIC.KEY.PAGE_SIZE, paginationOptions.pageSize.toString())
      return prev
    })
  }, [paginationOptions, setPaginationParams])

  const { data = [], isLoading } = useAlbum.fetchAlbumList()

  const startIndex = (currentPage - API.PARAMS.PAGINATION.DEFAULT_CURRENT_PAGE) * pageSize
  const paginatedAlbums = data.slice(startIndex, startIndex + pageSize)

  const onChangePagination = (page: number, size: number) => {
    setPaginationOptions({
      currentPage: page,
      pageSize: size
    })
  }

  const columns: TableColumnsType<AlbumWithUserDetail> = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: GENERIC.KEY.ID,
        key: GENERIC.KEY.ID
      },
      {
        title: "Title",
        dataIndex: ALBUM.KEY.TITLE,
        key: ALBUM.KEY.TITLE
      },
      {
        title: "User",
        key: ALBUM.KEY.USER_ID,
        render: (_, record: AlbumWithUserDetail) => {
          const user = record.user
          if (!user) return "-"
          const avatarUrl = userService.getAvatarUrl(user)
          return (
            <div
              className={"user-inner-cell-wrapper"}
              onClick={() => navigate(`/users/${record.id}`)}
            >
              <img className={"user-avatar"} src={avatarUrl} alt={user.name} />
              <p className={"user-full-name"}>{user.name}</p>
            </div>
          )
        }
      },
      {
        title: "Action",
        key: GENERIC.KEY.ACTION,
        render: (_, record) => (
          <Button onClick={() => navigate(`/albums/${record.id}`)}>
            <EyeOutlined /> Show
          </Button>
        ),
        align: "center"
      }
    ],
    [navigate]
  )

  return (
    <>
      <p>Album List</p>
      <AlbumListTable
        albums={paginatedAlbums || GENERIC.NULL_VALUE.EMPTY.STRING}
        loading={isLoading}
        columns={columns}
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
