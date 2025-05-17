import { TableProps, TableColumnsType, Table, Button } from "antd"
import { EyeOutlined } from "@ant-design/icons"
import { useMemo } from "react"
import { ALBUM } from "album/constants/albumConstants"
import { AlbumWithUserDetail } from "album/models/dtos/albumDtos"
import { useNavigate } from "react-router"
import { API } from "shared/constants/apiConstants"
import { USER } from "user/constants/userConstants"
import { GENERIC } from "shared/constants/genericValues"

type AlbumListTableProps = {
  albums: Array<AlbumWithUserDetail>
  loading: boolean
  rowSelection?: TableProps<AlbumWithUserDetail>["rowSelection"]
}

const AlbumListTable: React.FC<AlbumListTableProps> = ({ albums, loading, rowSelection }) => {
  const navigate = useNavigate()

  const columns: TableColumnsType<AlbumWithUserDetail> = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: ALBUM.KEY.ID,
        key: ALBUM.KEY.ID
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
          const avatarUrl =
            API.UI_AVATAR(true) +
            USER.ROUTES.API.BY_NAME(record.user?.name || GENERIC.NULL_VALUE.EMPTY.STRING, true) +
            USER.ROUTES.API.BY_BACKGROUND(record.user?.id || 1, true) +
            USER.ROUTES.API.BY_COLOR(true)
          return (
            <div className={"user-avatar-wrapper"} onClick={() => navigate(`/users/${user.id}`)}>
              <img className={"user-avatar"} src={avatarUrl} alt={user.name} />
              <p className={"user-full-name"}>{user.name}</p>
            </div>
          )
        }
      },
      {
        title: "Action",
        key: GENERIC.KEY.ACTION,
        render: (_, __) => (
          <Button>
            <EyeOutlined /> Show
          </Button>
        ),
        align: "center"
      }
    ],
    [navigate]
  )

  return (
    <Table<AlbumWithUserDetail>
      columns={columns}
      dataSource={albums}
      pagination={false}
      rowSelection={rowSelection}
      loading={loading}
      rowKey={ALBUM.KEY.ID}
    />
  )
}

export default AlbumListTable
