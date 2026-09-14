import { Typography, Card, Row, Col, Space, Tabs } from "antd";
import {
  CloudOutlined,
  KeyOutlined,
  LockOutlined,
  SafetyCertificateOutlined,
  UsbOutlined,
} from "@ant-design/icons";

import logo from "../../assets/images/auth_logo.png";
import SignIn from "../../components/auth/SignIn";
import Rutoken from "../../components/auth/Rutoken";
import TokenLoginForm from "../../components/auth/TokenLoginForm";
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
const tabLabel = (icon, text) => (
  <span className="auth-tab-label">
    {icon}
    {text}
  </span>
);

const tabList = [
  {
    key: "login",
    tab: tabLabel(<LockOutlined />, "Логин / Пароль"),
  },
  {
    key: "rutoken",
    tab: tabLabel(<UsbOutlined />, "РуТокен"),
  },
  {
    key: "jacarta",
    tab: tabLabel(<SafetyCertificateOutlined />, "JaCarta"),
  },
  {
    key: "enotoken",
    tab: tabLabel(<KeyOutlined />, "EnoToken"),
  },
  {
    key: "eds",
    tab: tabLabel(<CloudOutlined />, "Облачная ЭЦП"),
  },
];
const contentList = {
  login: <SignIn />,
  rutoken: <Rutoken />,
  jacarta: <TokenLoginForm kind="jacarta" />,
  enotoken: <TokenLoginForm kind="enotoken" />,
  eds: <Eds />,
};

const Auth = () => {
  const [activeTab, setActiveTab] = useState("login");
  return (
    <div className="auth-page">
      <Row style={{ minHeight: "100vh" }} align="middle" justify="center">
        <Col span={24} xs={22} sm={20} md={18} lg={16} xl={14}>
          <div className="auth-shell">
            <Space direction="vertical" style={{ width: "100%" }} size={12}>
              {Logo}
              <Card
                title={LoginButtonText}
                bordered={false}
                className="criclebox auth-login-card"
              >
                <Tabs
                  tabPosition="left"
                  activeKey={activeTab}
                  onChange={setActiveTab}
                  animated={false}
                >
                  {tabList.map((item) => (
                    <Tabs.TabPane tab={item.tab} key={item.key}>
                      {activeTab === item.key ? contentList[item.key] : null}
                    </Tabs.TabPane>
                  ))}
                </Tabs>
              </Card>
              {CopyrightText}
            </Space>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Auth;
