import type { MenuProps } from "antd"
import { Layout, Menu } from "antd"
import { FileTextOutlined, UserOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router"
import "./style.scss"
import { useState } from "react"

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
    key: "user",
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
  const [collapsed, setCollapsed] = useState(false)

  const onClick: MenuProps["onClick"] = (e) => {
    navigate(`/${e.key}`)
  }

  return (
    <Sider theme="light" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <Menu onClick={onClick} defaultSelectedKeys={["albums"]} mode="inline" items={items} />
    </Sider>
  )
}

export default Sidebar
