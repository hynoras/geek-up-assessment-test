import "./MainLayoutPage.scss"
import { Outlet } from "react-router"
import Header from "shared/components/layouts/header/Header"
import Sidebar from "shared/components/layouts/sidebar/Sidebar"
import { Layout } from "antd"

const { Content } = Layout

const MainLayoutPage = () => {
  return (
    <div className="main-layout-body">
      <Header />
      <div className="main-layout-container">
        <Sidebar />
        <Content className="main-layout-content-wrapper">
          <Outlet />
        </Content>
      </div>
    </div>
  )
}

export default MainLayoutPage
