import { SaveOutlined } from "@ant-design/icons";
import { Card, Col, Input, Row, Typography, Form, Button } from "antd";
import React, { useEffect } from "react";
import { useUpdateUserPasswordMutation } from "../../store/services/user-service";
const { Title, Text } = Typography;
const ChangeUserPass = ({ btnStyle, user, title, col, description }) => {
  const [accessForm] = Form.useForm();
  const [updateUserPassword, {}] = useUpdateUserPasswordMutation();
  const updateAccessHandler = (values) => {
    updateUserPassword({ ...values, userId: user.id });
  };
  useEffect(() => {
    if (user) {
      accessForm.setFieldsValue(user);
    }
  }, [user]);
  return (
    <Card
      bordered={false}
      className="criclebox mt-16"
      title={<Title level={5}>{title}</Title>}
    >
      <Form
        layout="vertical"
        className="row-col"
        onFinish={updateAccessHandler}
        form={accessForm}
      >
        <Row justify={"end"} gutter={16}>
          {description && (
            <Col span={24} style={{ marginBottom: "10px" }}>
              <Text type="secondary">{description}</Text>
            </Col>
          )}
          <Col span={col}>
            <Form.Item
              name="password"
              label="Введите новый пароль"
              rules={[
                {
                  required: true,
                  message: "Пароль должен содержать не менее 8-ми символов",
                  min: 8,
                  whitespace: true,
                },
              ]}
            >
              <Input placeholder="Пароль" />
            </Form.Item>
          </Col>
          <Col span={col}>
            <Form.Item
              name="confirmPassword"
              label="Текущий пароль для подтверждения"
              rules={[
                {
                  required: true,
                  message: "Поле обязательно",
                },
              ]}
            >
              <Input placeholder="Пароль для подтверждения" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SaveOutlined />}
                style={{
                  ...btnStyle,
                }}
              >
                Сохранить
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default ChangeUserPass;
