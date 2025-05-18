export interface UserDetail {
  id: number
  name: string
  email: string
}

export interface UserListWithDetail extends UserDetail {
  phone: string
  website: string
}
