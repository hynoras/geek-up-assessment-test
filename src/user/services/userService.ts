import { API } from "shared/constants/apiConstants"
import { GENERIC } from "shared/constants/genericValues"
import { api } from "shared/utils/apiUtils"
import { USER } from "user/constants/userConstants"
import { UserDetail, UserListWithDetail } from "user/models/dtos/userDtos"

class UserService {
  async getUsers(): Promise<Array<UserListWithDetail> | undefined> {
    try {
      const response = await api.get<Array<UserListWithDetail>>(
        API.TYPICODE + USER.ROUTES.API.BASE_PLURAL
      )
      return response.data
    } catch (error) {
      console.error("Error fetching user list:", error)
      return undefined
    }
  }
  getAvatarUrl = (user: UserDetail | undefined): string => {
    if (!user) return ""
    return (
      API.UI_AVATAR(true) +
      USER.ROUTES.API.BY_NAME(user.name || GENERIC.NULL_VALUE.EMPTY.STRING, true) +
      USER.ROUTES.API.BY_BACKGROUND(user.id || 1, true) +
      USER.ROUTES.API.BY_COLOR(true)
    )
  }
  async getUserById(id: number): Promise<UserListWithDetail | undefined> {
    try {
      const response = await api.get<UserListWithDetail>(
        API.TYPICODE + USER.ROUTES.API.BASE_PLURAL + API.PARAMS.BY_ID(id)
      )
      return response.data
    } catch (error) {
      console.error("Error fetching user list:", error)
      return undefined
    }
  }
}

const userService = new UserService()
export default userService
