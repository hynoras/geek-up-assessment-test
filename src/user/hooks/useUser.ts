import { useQuery } from "@tanstack/react-query"
import { QueryProps } from "shared/models/dtos/sharedDtos"
import { USER } from "user/constants/userConstants"
import userService from "user/services/userService"

class UseUser {
  fetchUserList = (): QueryProps => {
    const { data: users = [], isLoading: loading } = useQuery({
      queryKey: [USER.KEY.USER_PLURAL],
      queryFn: () => userService.getUsers(),
      staleTime: Infinity
    })
    return { data: users, isLoading: loading }
  }
  fetchUserById = (id: number): QueryProps => {
    const { data: user, isLoading: loading } = useQuery({
      enabled: !!id,
      queryKey: [USER.KEY.USER, id],
      queryFn: () => userService.getUserById(id),
      staleTime: Infinity
    })
    return { data: user, isLoading: loading }
  }
}

const useUser = new UseUser()
export default useUser
