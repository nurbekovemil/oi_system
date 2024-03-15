import { Typography, Card, Row, Col, Space } from "antd";

import logo from "../../assets/images/auth_logo.png";
import SignIn from "../../components/auth/SignIn";
import Rutoken from "../../components/auth/Rutoken";
import { useState } from "react";
import Eds from "../../components/auth/Eds";


const { Title } = Typography;
const currentYear = new Date().getFullYear();
const Logo = (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
    }}
  >
    <img
      src={logo}
      style={{
        width: 300,
      }}
    />
  </div>
);
const LoginButtonText = (
  <Title
    level={4}
    style={{
      textAlign: "center",
    }}
  >
    Войти в личный кабинет
  </Title>
);
const CopyrightText = (
  <Title
    level={5}
    type="secondary"
    style={{ padding: "16px", textAlign: "center" }}
  >
    Центр раскрытия информации <br/>ЗАО "Кыргызская фондовая биржа" © {currentYear}
  </Title>
);
const tabList = [
  {
    key: 'login',
    tab: 'Логин / Пароль',
  },
  {
    key: 'rutoken',
    tab: 'РуТокен',
  },
  {
    key: 'eds',
    tab: 'Облачная ЭЦП',
  },
];
const contentList = {
  login: <SignIn/>,
  rutoken: <Rutoken/>,
  eds: <Eds/>,
};

const Auth = () => {
  const [activeTab, setActiveTab] = useState('login');
  const onTabChange = (key) => {
    setActiveTab(key);
  };
  return (
    <Row
      style={{ height: "100vh" }}
      align="middle"
      justify="center"
      gutter={16}
    >
      <Col span={24}  xs={20} sm={20} md={24} lg={24}>
        <Row justify="center">
          <Col span={8} xs={24} sm={24} md={10} lg={4}>
            <Space
              direction="vertical"
              style={{
                width: "100%",
              }}
            >
              {Logo}
              <Card
                title={LoginButtonText}
                bordered={false}
                className="criclebox"
                tabList={tabList}
                onTabChange={(key) => {
                  onTabChange(key);
                }}
              >
                {contentList[activeTab]}
              </Card>
              {CopyrightText}
            </Space>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Auth;
