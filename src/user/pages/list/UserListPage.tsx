import "shared/themes/list/GeneralListPage.scss"
import { GENERIC } from "shared/constants/genericValues"
import UserListTable from "user/components/UserListTable"
import useUser from "user/hooks/useUser"

const UserListPage: React.FC = () => {
  const { data, isLoading } = useUser.fetchUserList()
  return (
    <>
      <p>User List</p>
      <UserListTable users={data || GENERIC.NULL_VALUE.EMPTY.ARRAY} loading={isLoading} />
    </>
  )
}

export default UserListPage
