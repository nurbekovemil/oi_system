import { useEffect } from "react";
import { Row, Col, Card, Button, Typography, Input, Form } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import {
  useGetCompanyByIdQuery,
  useGetCompanyTemplateQuery,
  useUpdateCompanyMutation,
} from "../../store/services/company-service";
const { Title } = Typography;

const ProfileCompany = ({ user, btnStyle }) => {
  const [companyForm] = Form.useForm();

  const [updateCompany, { isSuccess: isSuccessUpdated }] =
    useUpdateCompanyMutation();

  const { data: dataCompanyTemplate, isSuccess: isSuccessCompanyTemplate } =
    useGetCompanyTemplateQuery("upd");

  const { data: dataGetCompanyId, isSuccess: isSuccessGetCompanyId } =
    useGetCompanyByIdQuery(user.companyId);

  const updateCompanyProfileHandler = (values) => {
    updateCompany({ ...values, id: dataGetCompanyId.id });
  };

  useEffect(() => {
    if (isSuccessGetCompanyId) {
      companyForm.setFieldsValue(dataGetCompanyId);
    }
  }, [isSuccessGetCompanyId]);
  return (
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

export default ProfileCompany;
