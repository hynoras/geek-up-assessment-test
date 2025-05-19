import { Layout, Typography } from "antd"
import "./Header.scss"

const { Header } = Layout
const { Text } = Typography

const MainHeader = () => {
  return (
    <Header className="header-container">
      <Text strong>Geek up assessment test</Text>
      <Text>By QVQ</Text>
    </Header>
  )
}

export default MainHeader
