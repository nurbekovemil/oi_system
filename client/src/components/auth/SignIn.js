import React, { useState } from "react";
import {
  Layout,
  Button,
  Typography,
  Card,
  Form,
  Input,
  Menu,
  Row,
  Col,
  Affix,
  Breadcrumb,
  Space,
  Avatar,
} from "antd";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../../store/services/auth-service";
import logo from "../../assets/images/oi_logo.png";

import {
  DribbbleOutlined,
  TwitterOutlined,
  InstagramOutlined,
  GithubOutlined,
  ArrowLeftOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Header } from "antd/lib/layout/layout";
import Footer from "../layout/Footer";
import Meta from "antd/lib/card/Meta";
const { Title, Text } = Typography;
// const { Content, Footer, Header } = Layout;
const { Header: AntHeader, Content, Sider } = Layout;
// const logo = <GithubOutlined />;
const SignIn = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [login, { isLoading }] = useLoginMutation();

  const onLogin = (values) => {
    login(values);
  };
  return (
    <Row
      style={{ height: "100vh" }}
      align="middle"
      justify="center"
      gutter={16}
    >
      <Col span={20}>
        <Row justify="center">
          <Col span={8} xs={24} sm={24} md={10} lg={8}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Meta
                avatar={<Avatar size={32} shape="square" src={logo} />}
                title={
                  <Title level={5} type="secondary">
                    Центр раскрытия информации
                  </Title>
                }
                style={{
                  padding: "16px",
                }}
              />
              <Card
                title={<Title level={4}>Войти в личный кабинет</Title>}
                bordered={false}
                className="criclebox"
              >
                <Form layout="vertical" className="row-col" onFinish={onLogin}>
                  <Form.Item label="Логин" name="login">
                    <Input placeholder="Введите логин" />
                  </Form.Item>
                  <Form.Item label="Пароль" name="password">
                    <Input type="password" placeholder="Введите пароль" />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      loading={isLoading}
                      type="primary"
                      htmlType="submit"
                      icon={<UserOutlined />}
                      style={{
                        width: "100%",
                        background: "#57b6c0",
                        borderColor: "#57b6c0",
                      }}
                    >
                      Войти {isLoading}
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
              <Title
                level={5}
                type="secondary"
                style={{ padding: "16px", textAlign: "center" }}
              >
                Кыргызская фондовая биржа © 2023
              </Title>
            </Space>
          </Col>
          {/* <Col span={8}>
            Кыргызская фондовая биржа © 2023 Центр раскрытия информации
          </Col> */}
        </Row>
      </Col>
    </Row>

    // <Layout className="layout-default layout-signin">
    //   <Content className="content-ant">
    //     <Card
    //       className="card-signup header-solid ant-card"
    //       style={{
    //         width: 400,
    //       }}
    //       bordered="false"
    //     >
    //       <Title className="mb-15" level={4}>
    //         Авторизация
    //       </Title>
    //       <Form layout="vertical" className="row-col" onFinish={onLogin}>
    //         <Form.Item
    //           className="auth"
    //           label="Логин"
    //           name="login"
    //           value="emil"
    //           rules={[
    //             {
    //               required: true,
    //               message: "Введите логин!",
    //               whitespace: true,
    //             },
    //           ]}
    //         >
    //           <Input placeholder="Введите логин" />
    //         </Form.Item>

    //         <Form.Item
    //           className="auth"
    //           label="Пароль"
    //           name="password"
    //           rules={[
    //             {
    //               required: true,
    //               message: "Введите пароль!",
    //               whitespace: true,
    //             },
    //           ]}
    //         >
    //           <Input type="password" placeholder="Введите пароль" />
    //         </Form.Item>

    //         <Form.Item>
    //           <Button
    //             loading={isLoading}
    //             type="primary"
    //             htmlType="submit"
    //             style={{
    //               width: "100%",
    //               background: "#57b6c0",
    //               borderColor: "#57b6c0",
    //             }}
    //           >
    //             Войти {isLoading}
    //           </Button>
    //         </Form.Item>
    //       </Form>
    //       {/* <p className="font-semibold text-muted text-center">
    //       Забыли пароль?{" "}
    //       <Link to="/" className="font-bold text-dark">
    //         Восстановить
    //       </Link>
    //     </p> */}
    //     </Card>
    //   </Content>
    // </Layout>
  );
};

export default SignIn;
