import "./style.scss"
import type { MenuProps } from "antd"
import { Layout, Menu } from "antd"
import { FileTextOutlined, UserOutlined } from "@ant-design/icons"
import { useLocation, useNavigate } from "react-router"
import { useMemo, useState } from "react"

type MenuItem = Required<MenuProps>["items"][number]

const { Sider } = Layout

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
  const [collapsed, setCollapsed] = useState(false)

  const onClick: MenuProps["onClick"] = (e) => {
    navigate(`/${e.key}`)
  }

  const selectedKeys = useMemo(() => {
    if (location.pathname.startsWith("/albums")) return ["albums"]
    if (location.pathname.startsWith("/users")) return ["users"]
    return []
  }, [location.pathname])

  return (
    <Sider
      theme="light"
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <Menu
        onClick={onClick}
        defaultSelectedKeys={selectedKeys}
        mode="inline"
        items={items}
      />
    </Sider>
  )
}

export default Sidebar
