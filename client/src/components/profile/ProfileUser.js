import { useEffect } from "react";

import { Row, Col, Card, Button, Typography, Input, Form } from "antd";

import { SaveOutlined } from "@ant-design/icons";
import {
  useGetUserTemplateQuery,
  useUpdateUserMutation,
} from "../../store/services/user-service";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const ProfileUser = ({ user, btnStyle }) => {
  const navigate = useNavigate();
  const [userForm] = Form.useForm();

  const {
    data: dataUserProfileTemplate,
    isSuccess: isSuccessUserProfileTemplate,
  } = useGetUserTemplateQuery("profile");

  const [updateUser, {}] = useUpdateUserMutation();

  const updateUserProfileHandler = (values) => {
    updateUser({ ...values, id: user.id });
  };

  useEffect(() => {
    if (isSuccessUserProfileTemplate) {
      userForm.setFieldsValue(user);
    }
  }, [isSuccessUserProfileTemplate]);
  return (
    <Card
      bordered={false}
      className="criclebox"
      title={<Title level={5}>Информация пользователя</Title>}
    >
      <Form
        layout="vertical"
        className="row-col"
        onFinish={updateUserProfileHandler}
        form={userForm}
      >
        <Row gutter={16}>
          {isSuccessUserProfileTemplate &&
            dataUserProfileTemplate.template.map(({ field, label }) => (
              <Col span={24} key={field}>
                <Form.Item name={field} label={label}>
                  <Input placeholder={`Введите ${label.toLowerCase()}`} />
                </Form.Item>
              </Col>
            ))}
        </Row>
        <Row justify={"end"}>
          <Col>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SaveOutlined />}
                style={{
                  ...btnStyle,
                  width: "100%",
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

export default ProfileUser;
