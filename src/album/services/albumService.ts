import { ALBUM } from "album/constants/albumConstants"
import {
  AlbumDetail,
  AlbumWithUserDetail,
  PhotoDetail
} from "album/models/dtos/albumDtos"
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
  async getAlbumById(id: number): Promise<AlbumDetail | undefined> {
    try {
      const response = await api.get<AlbumDetail>(
        API.TYPICODE + ALBUM.ROUTES.API.BASE_PLURAL + API.PARAMS.BY_ID(id)
      )
      return response.data
    } catch (error) {
      console.error("Error fetching album list:", error)
      return undefined
    }
  }
  async getAlbumByUserId(id: number): Promise<AlbumDetail | undefined> {
    try {
      const response = await api.get<AlbumDetail>(
        API.TYPICODE +
          ALBUM.ROUTES.API.BASE_PLURAL +
          ALBUM.ROUTES.API.BY_USER_ID(id, true)
      )
      return response.data
    } catch (error) {
      console.error("Error fetching album list:", error)
      return undefined
    }
  }
  async getPhotoByAlbumId(albumid: number): Promise<Array<PhotoDetail> | undefined> {
    try {
      const response = await api.get<Array<PhotoDetail>>(
        API.TYPICODE +
          ALBUM.ROUTES.API.PHOTO_PLURAL +
          ALBUM.ROUTES.API.BY_ALBUM_ID(albumid, true)
      )
      return response.data
    } catch (error) {
      console.error("Error fetching album list:", error)
      return undefined
    }
  }
}

const albumService = new AlbumService()
export default albumService
