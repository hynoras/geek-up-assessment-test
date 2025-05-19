import "shared/themes/list/GeneralListPage.scss"
import { GENERIC } from "shared/constants/genericValues"
import UserListTable from "user/components/UserListTable"
import useUser from "user/hooks/useUser"
import { Typography } from "antd"

const { Title } = Typography

const UserListPage: React.FC = () => {
  const { data, isLoading } = useUser.fetchUserList()
  return (
    <>
      <Title level={2}>User List</Title>
      <UserListTable users={data || GENERIC.NULL_VALUE.EMPTY.ARRAY} loading={isLoading} />
    </>
  )
}

export default UserListPage
