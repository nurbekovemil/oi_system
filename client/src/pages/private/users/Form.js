import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Typography,
  Button,
  Select,
  Space,
} from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { SaveOutlined, BulbOutlined, CopyOutlined } from "@ant-design/icons";
import {
  useGetCompaniesForOptionQuery,
  useLazyGetCompanyByIdQuery,
} from "../../../store/services/company-service";
import useLoginPasswordGenerator from "../../../hooks/useLoginPasswordGenerator";
import {
  useCreateUserMutation,
  useGetUserTemplateQuery,
  useLazyGetUserByIdQuery,
  useUpdateUserMutation,
} from "../../../store/services/user-service";
import { useEffect } from "react";
import { useGetAllRolesQuery } from "../../../store/services/role-service";
const { Title } = Typography;

const UserForm = () => {
  // Параметры страницы тип формы formType и cid для получение компании по id
  const { formType, id } = useParams();
  const navigate = useNavigate();

  // Форма - Для добавление или обновление
  const [form] = Form.useForm();

  // Cервис - Получить шаблон по типу формы form/type add или upd
  const { data: dataTemplate, isSuccess: isSuccessTemplate } =
    useGetUserTemplateQuery(formType);

  // Хук - Генерация логина и пароля
  const { login, password, generateLogin, generatePassword } =
    useLoginPasswordGenerator();

  // Сервис - Создать нового пользователя
  const [
    createUser,
    { data: userCreatedData, isSuccess: isSuccessUserCreated },
  ] = useCreateUserMutation();
  const [updateUser, {}] = useUpdateUserMutation();
  // Сервис - Получиь список компаний
  const { data: optionCompanies } = useGetCompaniesForOptionQuery("");
  const { data: optionRoles } = useGetAllRolesQuery();

  // Сервис - Получить компанию по id
  const [getCompanyById, { data: companyData, isSuccess: isSuccessCompany }] =
    useLazyGetCompanyByIdQuery();

  // Сервис - Получить пользователя по id
  const [getUserById, { data: userData, isSuccess: isSuccessUser }] =
    useLazyGetUserByIdQuery();

  // Вызвать функции после того как компонент готов к работе
  useEffect(() => {
    if (formType === "upd") {
      if (id && !isSuccessUser) {
        getUserById(id);
      }
      if (isSuccessUser && userData) {
        const user = userData;
        form.setFieldsValue({ ...user, roleId: user.roles[0].id });
      }
    }
    if (formType === "add") {
      if (id && !isSuccessCompany) {
        getCompanyById(id);
      }
      if (isSuccessCompany && companyData) {
        form.setFieldsValue({
          companyId: companyData.id,
          label: companyData.name,
        });
      }
      if (isSuccessUserCreated) {
        navigate(`/dashboard/users/view/${userCreatedData.id}`);
      }
    }
  }, [companyData, userData, isSuccessUserCreated]);

  const title = isSuccessTemplate && dataTemplate.title;

  // generate random login or password
  const generateValue = (field) => {
    if (field === "login") {
      generateLogin();
      form.setFieldsValue({
        login,
      });
    }
    if (field === "password") {
      generatePassword();
      form.setFieldsValue({
        password,
      });
    }
  };

  // Сохранить или обновить данные пользователя
  const onSaveOrUpdate = (values) => {
    if (formType === "add") {
      createUser(values);
    }
    if (formType === "upd") {
      updateUser({ ...values, id: userData.id });
    }
  };

  // Скопировать данные при создании нового пользователя
  const copyData = () => {
    const { login, password, firstName } = form.getFieldsValue();
    navigator.clipboard.writeText(
      `Имя: ${firstName} \nЛогин: ${login} \nПароль: ${password}`
    );
  };

  const template =
    isSuccessTemplate &&
    dataTemplate.template.map((f) =>
      f.field === "companyId"
        ? { ...f, option: optionCompanies }
        : f.field === "roleId"
        ? { ...f, option: optionRoles }
        : f
    );

  return (
    <>
      <Card
        bordered={false}
        className="criclebox mb-24"
        title={<Title level={4}>{title}</Title>}
      >
        <Form
          layout="vertical"
          form={form}
          className="row-col"
          onFinish={onSaveOrUpdate}
        >
          <Row>
            {isSuccessTemplate &&
              template.map(({ label, element, value, field, option }) => (
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
                  {element === "select" ? (
                    <Form.Item
                      name={field}
                      label={label}
                      rules={[
                        {
                          required: true,
                          message: "Выберите из списка",
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        placeholder="Выберите из списка"
                        className="header-search"
                        options={option}
                        optionFilterProp="children"
                        filterOption={(input, opt) =>
                          (opt?.label ?? "").includes(input)
                        }
                        filterSort={(optA, optB) =>
                          (optA?.label ?? "")
                            .toLowerCase()
                            .localeCompare((optB?.label ?? "").toLowerCase())
                        }
                      />
                    </Form.Item>
                  ) : (element === "input" && field === "login") ||
                    (element === "input" && field === "password") ? (
                    <Space.Compact
                      direction="horizontal"
                      style={{ width: "100%" }}
                    >
                      <Form.Item
                        label={label}
                        name={field}
                        style={{
                          width: "90%",
                        }}
                        rules={[
                          {
                            required:
                              formType === "upd" && field === "password"
                                ? false
                                : true,
                            message: `${label} обязательно`,
                            whitespace: true,
                          },
                        ]}
                      >
                        <Input placeholder={label} />
                      </Form.Item>
                      <Form.Item
                        label={" "}
                        style={{
                          width: "50px",
                          marginTop: 0.5,
                        }}
                      >
                        <Button
                          icon={<BulbOutlined />}
                          type="primary"
                          style={{
                            width: "50px",
                            background: "#57b6c0",
                            borderColor: "#57b6c0",
                          }}
                          onClick={() => generateValue(field)}
                        />
                      </Form.Item>
                    </Space.Compact>
                  ) : (
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
                  )}
                </Col>
              ))}
          </Row>
          <Row justify="end">
            <Col className="px-2">
              <Space>
                {formType === "add" && (
                  <Button icon={<CopyOutlined />} onClick={copyData}>
                    Скопировать
                  </Button>
                )}
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
                  Сохранить
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
};

export default UserForm;
