import { Button, Form, Input,} from "antd";
import { useLoginMutation } from "../../store/services/auth-service";
import { UserOutlined } from "@ant-design/icons";
import { useState } from "react";

const SignIn = () => {
  const [signData, setSignData] = useState({})
  const [login, { isLoading }] = useLoginMutation();

  const onLogin = () => {
    login(signData);
  };
  return (
  <Form layout="vertical" className="row-col">
    <Form.Item label="Логин">
      <Input placeholder="Введите логин" onChange={(e) => setSignData({...signData, login: e.target.value})}/>
    </Form.Item>
    <Form.Item label="Пароль">
      <Input type="password" placeholder="Введите пароль" onChange={(e) => setSignData({...signData, password: e.target.value})}/>
    </Form.Item>
    <Form.Item>
      <Button
        disabled={!Object.keys(signData).length > 0}
        loading={isLoading}
        type="primary"
        icon={<UserOutlined />}
        style={{
          width: "100%",
          background: "#57b6c0",
          borderColor: "#57b6c0",
        }}
        onClick={onLogin}
      >
        Войти {isLoading}
      </Button>
    </Form.Item>
  </Form>
  );
};

export default SignIn;
