import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  Row,
  Col,
  Card,
  Button,
  List,
  Descriptions,
  Avatar,
  Radio,
  Switch,
  Upload,
  message,
  Typography,
  Input,
  Form,
} from "antd";

import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  VerticalAlignTopOutlined,
  UserOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import {
  useGetCompanyByIdQuery,
  useGetCompanyTemplateQuery,
  useUpdateCompanyMutation,
} from "../../store/services/company-service";
import {
  useGetUserTemplateQuery,
  useUpdateUserMutation,
} from "../../store/services/user-service";
const { Title } = Typography;
const Profile = () => {
  const [userForm] = Form.useForm();
  const [companyForm] = Form.useForm();
  const { user } = useSelector((state) => state.auth);
  const {
    data: dataUserProfileTemplate,
    isSuccess: isSuccessUserProfileTemplate,
  } = useGetUserTemplateQuery("profile");
  const [updateUser, {}] = useUpdateUserMutation();

  const [updateCompany, { isSuccess: isSuccessUpdated }] =
    useUpdateCompanyMutation();
  const { data: dataCompanyTemplate, isSuccess: isSuccessCompanyTemplate } =
    useGetCompanyTemplateQuery("upd");

  const { data: dataGetCompanyId, isSuccess: isSuccessGetCompanyId } =
    useGetCompanyByIdQuery(user.companyId);

  const updateUserProfileHandler = (values) => {
    updateUser({ ...values, id: user.id });
  };

  const updateCompanyProfileHandler = (values) => {
    updateCompany({ ...values, id: dataGetCompanyId.id });
  };

  useEffect(() => {
    if (isSuccessGetCompanyId) {
      userForm.setFieldsValue(user);
      companyForm.setFieldsValue(dataGetCompanyId);
    }
  }, [isSuccessGetCompanyId]);
  return (
    <Row gutter={[18, 16]}>
      <Col span={24}>
        <Card
          bodyStyle={{ display: "none" }}
          title={
            <Row justify="space-between" align="middle" gutter={[24, 0]}>
              <Col
                span={24}
                md={12}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Avatar.Group>
                  <Avatar
                    size={50}
                    shape="square"
                    style={{
                      backgroundColor: "#57b6c0",
                    }}
                    icon={<UserOutlined />}
                  />

                  <div style={{ marginLeft: "16px" }}>
                    <h4 className="font-semibold m-0">
                      {user.firstName || user.login}
                    </h4>
                    <p>{user.roles[0].description}</p>
                  </div>
                </Avatar.Group>
              </Col>
            </Row>
          }
        ></Card>
      </Col>
      <Col span={16} xs={24} sm={24} md={16} lg={16}>
        <Card
          bordered={false}
          className="criclebox"
          title={<Title level={5}>Информация компании</Title>}
        >
          <Form
            layout="vertical"
            className="row-col"
            form={companyForm}
            onFinish={updateCompanyProfileHandler}
          >
            <Row gutter={16}>
              {isSuccessCompanyTemplate &&
                dataCompanyTemplate.template.map(({ field, label }) => (
                  <Col span={12} xs={24} sm={24} md={12} lg={12} key={field}>
                    <Form.Item label={label} name={field}>
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
                      width: "100%",
                      background: "#57b6c0",
                      borderColor: "#57b6c0",
                    }}
                  >
                    Сохранить
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>
      <Col span={8} xs={24} sm={24} md={8} lg={8}>
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
                      width: "100%",
                      background: "#57b6c0",
                      borderColor: "#57b6c0",
                    }}
                  >
                    Сохранить
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Profile;
