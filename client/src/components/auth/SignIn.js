import React from "react";
import { Layout, Button, Typography, Card, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../../store/services/auth-service";
const { Title } = Typography;
const { Content } = Layout;

const SignIn = () => {
  const [login, { isLoading }] = useLoginMutation();

  const onLogin = (values) => {
    login(values);
  };
  return (
    <Content
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        className="card-signup header-solid  ant-card"
        style={{
          width: 350,
        }}
        bordered="false"
      >
        <Title className="mb-15" level={4}>
          Авторизация
        </Title>
        <Form layout="vertical" className="row-col" onFinish={onLogin}>
          <Form.Item
            className="auth"
            label="Логин"
            name="login"
            value="emil"
            rules={[
              {
                required: true,
                message: "Введите логин!",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="Введите логин" />
          </Form.Item>

          <Form.Item
            className="auth"
            label="Пароль"
            name="password"
            rules={[
              {
                required: true,
                message: "Введите пароль!",
                whitespace: true,
              },
            ]}
          >
            <Input type="password" placeholder="Введите пароль" />
          </Form.Item>

          <Form.Item>
            <Button
              loading={isLoading}
              type="primary"
              htmlType="submit"
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
        <p className="font-semibold text-muted text-center">
          Забыли пароль?{" "}
          <Link to="/" className="font-bold text-dark">
            Восстановить
          </Link>
        </p>
      </Card>
    </Content>
  );
};

export default SignIn;
