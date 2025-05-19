import "./Sidebar.scss"
import type { MenuProps } from "antd"
import { Grid, Layout, Drawer, Menu, FloatButton } from "antd"
import { FileTextOutlined, UserOutlined, MenuOutlined } from "@ant-design/icons"
import { useLocation, useNavigate } from "react-router"
import { useMemo, useState } from "react"

type MenuItem = Required<MenuProps>["items"][number]

const { Sider } = Layout

const { useBreakpoint } = Grid

const items: MenuItem[] = [
  {
    key: "albums",
    label: "Albums",
    icon: <FileTextOutlined />
  },
  {
    type: "divider"
  },
  {
    key: "users",
    label: "Users",
    icon: <UserOutlined />
  },
  {
    type: "divider"
  },
  {
    key: "setting",
    label: "Help"
  }
]

const Sidebar: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const screens = useBreakpoint()
  const isMobile = !screens.md

  const [drawerVisible, setDrawerVisible] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  const onClick: MenuProps["onClick"] = (e) => {
    navigate(`/${e.key}`)
    if (isMobile) setDrawerVisible(false)
  }

  const selectedKeys = useMemo(() => {
    if (location.pathname.startsWith("/albums")) return ["albums"]
    if (location.pathname.startsWith("/users")) return ["users"]
    return []
  }, [location.pathname])

  const menu = (
    <Menu
      onClick={onClick}
      defaultSelectedKeys={selectedKeys}
      mode="inline"
      items={items}
    />
  )

  return (
    <>
      {isMobile ? (
        <>
          <FloatButton
            className={"menu-float-button"}
            icon={<MenuOutlined />}
            onClick={() => setDrawerVisible(true)}
            style={{ position: "fixed", top: 16, left: 16, zIndex: 1000 }}
          />
          <Drawer
            placement="left"
            open={drawerVisible}
            onClose={() => setDrawerVisible(false)}
          >
            {menu}
          </Drawer>
        </>
      ) : (
        <Sider
          theme="light"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          {menu}
        </Sider>
      )}
    </>
  )
}

export default Sidebar
