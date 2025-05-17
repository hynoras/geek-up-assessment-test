import { ALBUM } from "album/constants/albumConstants"
import { AlbumDetail, AlbumWithUserDetail } from "album/models/dtos/albumDtos"
import { API } from "shared/constants/apiConstants"
import { api } from "shared/utils/apiUtils"
import { USER } from "user/constants/userConstants"
import { UserDetail } from "user/models/dtos/userDtos"

class AlbumService {
  async getAlbums(): Promise<Array<AlbumWithUserDetail> | undefined> {
    try {
      const [albumsRes, usersRes] = await Promise.all([
        api.get<Array<AlbumDetail>>(API.TYPICODE + ALBUM.ROUTES.API.BASE_PLURAL),
        api.get<Array<UserDetail>>(API.TYPICODE + USER.ROUTES.API.BASE_PLURAL)
      ])

      const userMap = new Map<number, UserDetail>()
      usersRes.data.forEach((user) => userMap.set(user.id, user))

      const albumsWithUser = albumsRes.data.map((album) => ({
        ...album,
        user: userMap.get(album.userId)
      }))

      return albumsWithUser
    } catch (error) {
      console.error("Error fetching album list:", error)
      return undefined
    }
  }
}

const albumService = new AlbumService()
export default albumService
