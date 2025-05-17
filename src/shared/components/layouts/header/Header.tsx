import { Layout } from "antd"
import "./style.scss"

const { Header } = Layout

const MainHeader = () => {
  return (
    <Header className="header-container">
      <div className="demo-logo" />
    </Header>
  )
}

export default MainHeader
