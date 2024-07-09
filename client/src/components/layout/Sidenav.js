import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutOutlined,
  TeamOutlined,
  ReconciliationOutlined,
  IdcardOutlined,
  BankOutlined,
  BookOutlined,
  AuditOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import logo from "../../assets/images/oi_logo.png";
import { useSelector } from "react-redux";
const menuList = [
  {
    path: "/dashboard/profile",
    label: "Профиль",
    icon: <IdcardOutlined />,
    role: ["ADMIN", "USER", "MODERATOR"],
  },
  {
    path: "/dashboard",
    label: "Панель управления",
    icon: <LayoutOutlined />,
    role: ["ADMIN", "MODERATOR"],
  },
  {
    path: "/dashboard/reports",
    label: "Документы",
    icon: <ReconciliationOutlined />,
    role: ["ADMIN", "USER", "MODERATOR"],
  },
  {
    path: "/dashboard/contracts",
    label: "Договор",
    icon: <SolutionOutlined />,
    role: ["ADMIN", "USER", "MODERATOR"],
  },
  {
    path: "/dashboard/users",
    label: "Пользователи",
    icon: <TeamOutlined />,
    role: ["ADMIN", "MODERATOR"],
  },
  {
    path: "/dashboard/companies",
    label: "Компании",
    icon: <BankOutlined />,
    role: ["ADMIN", "MODERATOR"],
  },
  {
    path: "/dashboard/user-guide",
    label: "Руководство",
    icon: <BookOutlined />,
    role: ["ADMIN", "USER", "MODERATOR"],
  },
  {
    path: "/dashboard/regulations",
    label: "Нормативные акты",
    icon: <AuditOutlined />,
    role: ["ADMIN", "USER", "MODERATOR"],
  },
];
function Sidenav({ color }) {
  const { pathname } = useLocation();
  const { user } = useSelector((state) => state.auth);
  // const isWeakPass = user?.changePass;
  const menu = menuList
    .filter((menuItem) => {
      // Check if any of the user roles match a role in the menu item
      return user.roles.some((userRole) =>
        menuItem.role.includes(userRole.title)
      );
    })
    .map((m, i) => ({
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

      <Menu
        // theme={!isWeakPass && "dark"}
        theme={"dark"}
        mode="inline"
        items={menu}
        // disabled={isWeakPass}
      />
    </>
  );
}

export default Sidenav;
