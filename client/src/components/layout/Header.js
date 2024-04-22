import { useEffect } from "react";
import { Row, Col, Button, Divider, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ArrowLeftOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useLazyLogoutQuery } from "../../store/services/auth-service";
import Search from "../search";

const toggler = [
  <svg
    width="20"
    height="20"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    key={0}
  >
    <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
  </svg>,
];

function Header({ onPress }) {
  useEffect(() => window.scrollTo(0, 0));
  const { user } = useSelector((state) => state.auth);
  const [logout] = useLazyLogoutQuery();
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    localStorage.removeItem("accessToken");
  };

  const handleButtonClick = () => {
    navigate(-1); // Navigate back to the previous page
  };
  // const isWeakPass = user?.changePass;
  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={24} md={7} xs={7} sm={7}>
          <Button
            icon={<ArrowLeftOutlined />}
            type="text"
            onClick={handleButtonClick}
            // disabled={isWeakPass}
          >
            Назад
          </Button>
        </Col>
        <Col span={24} md={10} xs={10} sm={10}>
          <Search />
        </Col>
        <Col span={24} md={7} xs={7} sm={7} className="header-control">
          <Button
            type="link"
            className="sidebar-toggler"
            onClick={() => onPress()}
          >
            {toggler}
          </Button>
          <Space size={2} split={<Divider type="vertical" />}>
            <Button
              icon={<UserOutlined />}
              type="text"
              className="header-control-btn"
              onClick={() => navigate("/dashboard/profile")}
              // disabled={isWeakPass}
            >
              {user.firstName || user.lastName || user.login}
            </Button>
            <Button
              danger
              type="text"
              className="header-control-btn"
              onClick={logoutHandler}
            >
              Выйти
            </Button>
          </Space>
        </Col>
      </Row>
    </>
  );
}

export default Header;
