import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Typography,
  Button,
  Checkbox,
  Space,
} from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { SaveOutlined } from "@ant-design/icons";
import {
  useCreateCompanyMutation,
  useGetCompanyTemplateQuery,
  useLazyGetCompanyByIdQuery,
  useUpdateCompanyMutation,
} from "../../../store/services/company-service";
import { useEffect, useState } from "react";
const { Title } = Typography;

const CompanyForm = () => {
  const navigate = useNavigate();
  // Параметры страницы тип формы formType и cid для получение компании по id
  const { formType, cid } = useParams();

  // Если флаг true добавить пользователя для данной компании
  const [isAddUser, setIsAddUser] = useState(false);

  // Форма - Для добавление или обновление
  const [form] = Form.useForm();

  // Cервис - Получить шаблон по типу формы form/type add или upd
  const { data: dataTemplate, isSuccess: isSuccessTemplate } =
    useGetCompanyTemplateQuery(formType);
  const title = isSuccessTemplate && dataTemplate.title;

  // Сервис - Создать новую компанию - mutation
  const [
    createCompany,
    { isSuccess: isSuccessCreated, isError, data: dataCreated },
  ] = useCreateCompanyMutation();

  // Сервис - Обновить данные компании - mutation
  const [updateCompany, { isSuccess: isSuccessUpdated }] =
    useUpdateCompanyMutation();

  // Сервис - Получить компанию по id - lazy loading query
  const [getCompanyById, { isSuccess: isSuccessGet, data: dataGet }] =
    useLazyGetCompanyByIdQuery();

  // Вызвать функции после того как компонент готов к работе
  useEffect(() => {
    if (formType === "upd" && cid) {
      if (!isSuccessGet) getCompanyById(cid);
      if (isSuccessGet && !isSuccessUpdated) {
        let { id, ...rest } = dataGet;
        form.setFieldsValue(rest);
      }
      if (isSuccessUpdated) {
        navigate(`/dashboard/companies/view/${dataGet.id}`);
      }
    }
    if (formType === "add" && isSuccessCreated && !isError) {
      if (!isAddUser) {
        navigate("/dashboard/companies");
      }
      if (isAddUser) {
        navigate(`/dashboard/users/add/${dataCreated.id}`);
      }
    }
  }, [isSuccessCreated, isSuccessGet, isSuccessUpdated]);

  // Сохранить или обновить данные компании
  const onSaveOrUpdate = (values) => {
    if (formType === "add") {
      createCompany(values);
    }
    if (formType === "upd") {
      updateCompany({ ...values, id: dataGet.id });
    }
  };

  return (
    <>
      <Card
        bordered={false}
        className="criclebox mb-24"
        title={<Title level={4}>{title}</Title>}
      >
        <Form
          layout="vertical"
          className="row-col"
          onFinish={onSaveOrUpdate}
          form={form}
        >
          <Row>
            {isSuccessTemplate &&
              dataTemplate.template.map(({ label, element, value, field }) => (
                <Col
                  className="px-2"
                  xs={{
                    span: 24,
                  }}
                  sm={{
                    span: 24,
                  }}
                  md={{
                    span: 12,
                  }}
                  lg={{
                    span: 12,
                  }}
                  key={field}
                >
                  <Form.Item
                    label={label}
                    name={field}
                    rules={[
                      {
                        required: true,
                        message: `${label} обязательно`,
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input placeholder={label} />
                  </Form.Item>
                </Col>
              ))}
          </Row>
          <Row justify="space-between" align="middle">
            <Col className="px-2">
              {formType === "add" && (
                <Checkbox
                  checked={isAddUser}
                  onChange={() => setIsAddUser(!isAddUser)}
                >
                  Добавить пользователя
                </Checkbox>
              )}
            </Col>
            <Col className="px-2">
              <Space>
                <Button onClick={() => navigate(-1)} danger>
                  Отменить
                </Button>
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  style={{
                    background: "#57b6c0",
                    borderColor: "#57b6c0",
                  }}
                  htmlType="submit"
                >
                  {formType === "add" ? "Сохранить" : "Обновить"}
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
};

export default CompanyForm;
