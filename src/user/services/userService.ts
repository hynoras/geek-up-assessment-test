import { API } from "shared/constants/apiConstants"
import { api } from "shared/utils/apiUtils"
import { USER } from "user/constants/userConstants"
import { UserDetail } from "user/models/dtos/userDtos"

class UserService {
  async getUsers(): Promise<Array<UserDetail> | undefined> {
    try {
      const response = await api.get<Array<UserDetail>>(API.TYPICODE + USER.ROUTES.API.BASE_PLURAL)
      return response.data
    } catch (error) {
      console.error("Error fetching album list:", error)
      return undefined
    }
  }

  async getUserAvatar(name: string, id: number): Promise<string | undefined> {
    try {
      const response = await api.get<string>(
        API.UI_AVATAR(true) +
          USER.ROUTES.API.BY_NAME(name, true) +
          USER.ROUTES.API.BY_BACKGROUND(id, true) +
          USER.ROUTES.API.BY_COLOR(true)
      )
      return response.data
    } catch (error) {
      console.error("Error fetching avatar:", error)
      return undefined
    }
  }
}

const userService = new UserService()
export default userService
