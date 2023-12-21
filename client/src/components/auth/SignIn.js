import { Button, Typography, Card, Form, Input, Row, Col, Space } from "antd";
import { useLoginMutation } from "../../store/services/auth-service";
import logo from "../../assets/images/auth_logo.png";
import { UserOutlined } from "@ant-design/icons";

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
    ЗАО Кыргызская фондовая биржа © {currentYear}
  </Title>
);

const SignIn = () => {
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
          <Col span={8} xs={24} sm={24} md={10} lg={5}>
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
              {CopyrightText}
            </Space>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default SignIn;
