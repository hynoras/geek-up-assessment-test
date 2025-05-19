import "./ShowUserPage.scss"
import { Col, Image, Row, Typography, Skeleton, Button, TableColumnsType } from "antd"
import useAlbum from "album/hooks/useAlbum"
import { useNavigate, useParams } from "react-router"
import useUser from "user/hooks/useUser"
import userService from "user/services/userService"
import AlbumListTable from "album/components/AlbumListTable"
import { ALBUM } from "album/constants/albumConstants"
import { AlbumWithUserDetail } from "album/models/dtos/albumDtos"
import { EyeOutlined } from "@ant-design/icons"
import { GENERIC } from "shared/constants/genericValues"

const { Title, Text } = Typography

const ShowUserPage: React.FC = () => {
  const { id } = useParams()
  const userId = Number(id)
  const navigate = useNavigate()

  const { data: user, isLoading: loadingUser } = useUser.fetchUserById(userId)
  const { data: album, isLoading: loadingAlbum } = useAlbum.fetchAlbumByUserId(userId)

  const avatarURL = userService.getAvatarUrl(user)

  if (loadingAlbum && loadingUser) {
    return <Skeleton active />
  }

  if (!album) {
    return <Skeleton active />
  }

  const columns: TableColumnsType<AlbumWithUserDetail> = [
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
      title: "Action",
      key: GENERIC.KEY.ACTION,
      render: (_, record) => (
        <Button onClick={() => navigate(`/albums/${record.id}`)}>
          <EyeOutlined /> Show
        </Button>
      ),
      align: "center"
    }
  ]

  return (
    <div className="show-album-page">
      <Row gutter={[16, 16]}>
        <Title level={1}>Show User</Title>
        {user && (
          <Col span={24}>
            <div className="user-info">
              <Image
                src={avatarURL}
                alt={user.name}
                preview={false}
                className="user-avatar"
              />
              <div className="user-details">
                <Text strong>{user.name}</Text>
                <a href={`mailto:${user.email}`} className={"user-email"}>
                  {user.email}
                </a>
              </div>
            </div>
          </Col>
        )}
        <Col span={24}>
          <Title level={2}>Albums</Title>
          <AlbumListTable albums={album} loading={false} columns={columns} />
        </Col>
      </Row>
    </div>
  )
}

export default ShowUserPage
