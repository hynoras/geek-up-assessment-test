import { UserDetail } from "user/models/dtos/userDtos"

export interface AlbumDetail {
  userId: number
  id: number
  title: string
}

export interface PhotoDetail {
  albumId: number
  id: number
  title: string
  url: string
  thumbnailUrl: string
}

export interface AlbumWithUserDetail extends AlbumDetail {
  user?: UserDetail
}
