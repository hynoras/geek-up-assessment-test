import { UserDetail } from "user/models/dtos/userDtos"

export interface AlbumDetail {
  userId: number
  id: number
  title: string
}

export interface AlbumWithUserDetail extends AlbumDetail {
  user?: UserDetail
}
