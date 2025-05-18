import { Card, Col, Image, Row, Typography, Skeleton } from "antd"
import useAlbum from "album/hooks/useAlbum"
import { useNavigate, useParams } from "react-router"
import useUser from "user/hooks/useUser"
import { EyeOutlined } from "@ant-design/icons"
import "./ShowAlbumPage.scss"
import userService from "user/services/userService"

const { Title, Text } = Typography

const ShowAlbumPage: React.FC = () => {
  const { id } = useParams()
  const albumId = Number(id)
  const navigate = useNavigate()

  const { data: album, isLoading: loadingAlbum } = useAlbum.fetchAlbumById(albumId)
  const { data: user, isLoading: loadingUser } = useUser.fetchUserById(album?.userId)
  const { data: photos, isLoading: loadingPhotos } = useAlbum.fetchPhotosById(albumId)

  const avatarURL = userService.getAvatarUrl(user)

  if (loadingAlbum && loadingUser && loadingPhotos) {
    return <Skeleton active />
  }

  if (!album) {
    return <Skeleton active />
  }

  const handleUserClick = () => {
    if (user) {
      navigate(`/users/${user.id}`)
    }
  }

  return (
    <div className="show-album-page">
      <Row gutter={[16, 16]}>
        <Title level={1}>Show Album</Title>
        <Col span={24}>
          <Card>
            <Title level={2}>{album.title}</Title>
          </Card>
        </Col>

        {user && (
          <Col span={24}>
            <Card
              title="User Information"
              className="user-card"
              hoverable
              onClick={handleUserClick}
            >
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
            </Card>
          </Col>
        )}

        <Col span={24}>
          <Card title="Photos">
            <div className="photos-grid">
              {photos?.map((photo: any) => (
                <div key={photo.id} className="photo-item">
                  <Image
                    src={"https://dummyjson.com/image/150"}
                    alt={photo.title}
                    preview={{
                      mask: <EyeOutlined />,
                      src: photo.url
                    }}
                  />
                  <Text className="photo-title">{photo.title}</Text>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ShowAlbumPage
