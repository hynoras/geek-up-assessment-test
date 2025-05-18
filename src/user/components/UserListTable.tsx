import { TableColumnsType, Table, Button } from "antd"
import { EyeOutlined } from "@ant-design/icons"
import { useMemo } from "react"
import { USER } from "user/constants/userConstants"
import { UserListWithDetail } from "user/models/dtos/userDtos"
import { API } from "shared/constants/apiConstants"
import { GENERIC } from "shared/constants/genericValues"
import { useNavigate } from "react-router"

type UserListTableProps = {
  users: Array<UserListWithDetail>
  loading: boolean
}

const UserListTable: React.FC<UserListTableProps> = ({ users, loading }) => {
  const navigate = useNavigate()
  const columns: TableColumnsType<UserListWithDetail> = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: GENERIC.KEY.ID,
        key: GENERIC.KEY.ID
      },
      {
        title: "Name",
        dataIndex: USER.KEY.NAME,
        key: USER.KEY.NAME
      },
      {
        title: "Avatar",
        dataIndex: USER.KEY.AVATAR,
        key: USER.KEY.AVATAR,
        render: (_, record: UserListWithDetail) => {
          const avatarUrl =
            API.UI_AVATAR(true) +
            USER.ROUTES.API.BY_NAME(
              record.name || GENERIC.NULL_VALUE.EMPTY.STRING,
              true
            ) +
            USER.ROUTES.API.BY_BACKGROUND(record.id || 1, true) +
            USER.ROUTES.API.BY_COLOR(true)
          return (
            <div className={"user-inner-cell-wrapper"}>
              <img className={"user-avatar"} src={avatarUrl} alt={record.name} />
            </div>
          )
        }
      },
      {
        title: "Email",
        dataIndex: USER.KEY.EMAIL,
        key: USER.KEY.EMAIL,
        render: (_, record: UserListWithDetail) => {
          return (
            <div className={"user-inner-cell-wrapper"}>
              <a href={`mailto:${record.email}`} className={"user-email"}>
                {record.email}
              </a>
            </div>
          )
        }
      },
      {
        title: "Phone",
        dataIndex: USER.KEY.PHONE,
        key: USER.KEY.PHONE,
        render: (_, record: UserListWithDetail) => {
          return (
            <div className={"user-inner-cell-wrapper"}>
              <a href={`tel:${record.phone}`} className={"user-phone"}>
                {record.phone}
              </a>
            </div>
          )
        }
      },
      {
        title: "Website",
        dataIndex: USER.KEY.WEBSITE,
        key: USER.KEY.WEBSITE,
        render: (_, record: UserListWithDetail) => {
          return (
            <div
              className={"user-inner-cell-wrapper"}
              onClick={() =>
                window.open(`https://${record.website}`, "_blank", "noopener,noreferrer")
              }
            >
              <p className={"user-website"}>{record.website}</p>
            </div>
          )
        }
      },
      {
        title: "Action",
        key: GENERIC.KEY.ACTION,
        render: (_, record: UserListWithDetail) => (
          <Button onClick={() => navigate(`/users/${record.id}`)}>
            <EyeOutlined /> Show
          </Button>
        ),
        align: "center"
      }
    ],
    [navigate]
  )

  return (
    <Table<UserListWithDetail>
      columns={columns}
      dataSource={users}
      pagination={false}
      loading={loading}
      rowKey={GENERIC.KEY.ID}
    />
  )
}

export default UserListTable
