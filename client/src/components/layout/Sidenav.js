import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutOutlined,
  TeamOutlined,
  ReconciliationOutlined,
  IdcardOutlined,
  BankOutlined,
} from "@ant-design/icons";
import logo from "../../assets/images/oi_logo.png";
const menuList = [
  {
    path: "/dashboard/profile",
    label: "Профиль",
    icon: <IdcardOutlined />,
  },
  {
    path: "/dashboard",
    label: "Панель управления",
    icon: <LayoutOutlined />,
  },
  {
    path: "/dashboard/reports",
    label: "Отчеты",
    icon: <ReconciliationOutlined />,
  },
  {
    path: "/dashboard/users",
    label: "Пользователи",
    icon: <TeamOutlined />,
  },
  {
    path: "/dashboard/companies",
    label: "Компании",
    icon: <BankOutlined />,
  },
];
function Sidenav({ color }) {
  const { pathname } = useLocation();
  const menu = menuList.map((m, i) => ({
    label: (
      <Link to={m.path} className={pathname === m.path ? "active" : ""}>
        <span
          className="icon"
          style={{
            background: pathname === m.path ? color : "",
          }}
        >
          {m.icon}
        </span>
        <span className="label">{m.label}</span>
      </Link>
    ),
  }));
  return (
    <>
      <div className="brand">
        <img src={logo} alt="" />
        <span>OI SYSTEM</span>
      </div>
      <hr />

      <Menu theme="dark" mode="inline" items={menu} />
    </>
  );
}

export default Sidenav;
