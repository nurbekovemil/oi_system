import { Button, Form, Input,} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useCloudEdsConfirmPinCodeMutation, useCloudEdsSendPinCodeMutation } from "../../store/services/auth-service";

const Eds = () => {
  const [cloudEdsSendPinCode, {isLoading: isLoadingPinCode, isSuccess: isSuccessPinCode}] = useCloudEdsSendPinCodeMutation()
  const [cloudEdsConfirmPinCode, {isLoading: isLoadingConfirmPinCode, isSuccess: isSuccessConfirmPinCode}] = useCloudEdsConfirmPinCodeMutation()
  const [userInn, setUserInn] = useState('')
  const [pinCode, setPinCode] = useState()

  const onSendPinCode = () => {
    cloudEdsSendPinCode({user_inn: userInn})
  };
  const onConfirmPinCode = () => {
    cloudEdsConfirmPinCode({user_inn: userInn, pin: pinCode })
  };
  return (
    <Form layout="vertical" className="row-col">
        {/* <Form.Item label="ИНН компании">
            <Input placeholder="Введите инн компании" onChange={(e) => setUserData({...userData, company_inn: e.target.value})}/>
        </Form.Item> */}
        <Form.Item label="ИНН пользователя">
            <Input placeholder="Введите инн пользователя" onChange={(e) => setUserInn(e.target.value)} />
        </Form.Item>
        <Form.Item>
            <Button
                loading={isLoadingPinCode}
                type="primary"
                icon={<UserOutlined />}
                style={{
                  width: "100%",
                  background: "#57b6c0",
                  borderColor: "#57b6c0",
                }}
                onClick={onSendPinCode}
            >
                Отправить PIN-код {isLoadingPinCode}
            </Button>
        </Form.Item>
        {
          isSuccessPinCode &&         
          <Form.Item label="PIN-код">
              <Input placeholder="Введите PIN-код" onChange={(e) => setPinCode(e.target.value)} />
          </Form.Item>
        }
        <Form.Item>
            <Button
                disabled={!isSuccessPinCode}
                loading={isLoadingConfirmPinCode}
                type="primary"
                htmlType="submit"
                icon={<UserOutlined />}
                style={{
                  width: "100%",
                  background: "#57b6c0",
                  borderColor: "#57b6c0",
                }}
                onClick={onConfirmPinCode}
            >
                Войти {isLoadingConfirmPinCode}
            </Button>
        </Form.Item>
    </Form>
  );
};

export default Eds;
