import { Button, Form, Input } from "antd";
import { useLoginMutation } from "../../store/services/auth-service";
import { UserOutlined } from "@ant-design/icons";
import { useState } from "react";

const SignIn = () => {
  const [signData, setSignData] = useState({})
  const [login, { isLoading }] = useLoginMutation();

  const onLogin = (values) => {
    login(values);
  };
  return (
  <Form layout="vertical" className="row-col" onFinish={onLogin}>
    <Form.Item label="Логин" name="login">
      <Input placeholder="Введите логин" onChange={(e) => setSignData({...signData, login: e.target.value})}/>
    </Form.Item>
    <Form.Item label="Пароль" name="password">
      <Input.Password placeholder="Введите пароль" onChange={(e) => setSignData({...signData, password: e.target.value})}/>
    </Form.Item>
    <Form.Item>
      <Button
        disabled={!signData.login || !signData.password}
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
        Войти
      </Button>
    </Form.Item>
  </Form>
  );
};

export default SignIn;
