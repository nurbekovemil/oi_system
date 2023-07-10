import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Typography,
  Button,
  Divider,
  Space,
  Select,
  Tooltip,
} from "antd";
import { useParams, useNavigate } from "react-router-dom";
import {
  SaveOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import {
  useCreateCompanyMutation,
  useGetCompanyTemplateQuery,
  useLazyGetCompanyByIdQuery,
  useUpdateCompanyMutation,
} from "../../store/services/company-service";
import { useEffect, useState } from "react";
import { useGetReportTypesQuery } from "../../store/services/report-service";
const { Title, Text } = Typography;

const template = [
  {
    label: "Период отчета",
    element: "select",
    field: "period",
    options: [
      { value: 1, label: "Квартал 1" },
      { value: 2, label: "Квартал 2" },
      { value: 3, label: "Квартал 3" },
      { value: 4, label: "Квартал 4" },
      { value: 5, label: "Годовой отчет" },
    ],
    required: true,
  },
  {
    label: "Год",
    element: "select",
    field: "year",
    options: [
      {
        value: 2023,
        label: "2023",
      },
      {
        value: 2022,
        label: "2022",
      },
      {
        value: 2021,
        label: "2021",
      },
    ],
    required: true,
  },
  {
    label:
      "Данные, включаемые в краткий годовой и ежеквартальный отчет для публикации в средствах массовой информации",
    element: "title",
    type: "default",
    level: 5,
  },
  {
    label: "1. Данные об эмитенте",
    element: "title",
    type: "secondary",
    level: 5,
  },
  {
    label: "Полное и сокращенное наименование эмитента",
    element: "input",
    field: "1_issuer_data_1",
    required: false,
  },
  {
    label: "Организационно-правовая форма",
    element: "input",
    field: "1_issuer_data_2",
    required: false,
  },
  {
    label: "Юридический и почтовый адрес эмитента, номер телефона и факс",
    element: "input",
    field: "1_issuer_data_3",
    required: false,
  },
  {
    label: "Основной вид деятельности эмитента",
    element: "input",
    field: "1_issuer_data_4",
    required: false,
  },
  {
    label: "2. Количество владельцев ценных бумаг и работников эмитента",
    element: "title",
    type: "secondary",
    level: 5,
  },
  {
    label: "Количество владельцев",
    element: "input",
    field: "2_number_of_securities_holders_1",
    required: false,
  },
  {
    label: "Количество работников",
    element: "input",
    field: "2_number_of_securities_holders_2",
    required: false,
  },
  {
    label:
      "3. Список юридических лиц, в которых данный эмитент владеет 5 процентами и более уставного капитала",
    element: "title",
    type: "secondary",
    level: 5,
  },
  {
    element: "list",
    required: false,
    field: "3_list_of_legal_entities",
    headers: [
      {
        title: "Наименование юридического лица",
        span: 5,
      },
      {
        title: "Организационно-правовая форма",
        span: 5,
      },
      {
        title:
          "Местонахождение, почтовый адрес, телефон, факс, адрес электронной почты и код ОКПО",
        span: 8,
      },
      {
        title: "Доля участия в уставном капитале",
        span: 5,
      },
      {
        title: "",
        span: 2,
      },
    ],
    lists: [
      {
        element: "input",
        field: "3_list_of_legal_entities_1",
        required: false,
        span: 5,
      },
      {
        element: "input",
        field: "3_list_of_legal_entities_2",
        required: false,
        span: 5,
      },
      {
        element: "input",
        field: "3_list_of_legal_entities_3",
        required: false,
        span: 8,
      },
      {
        element: "input",
        field: "3_list_of_legal_entities_4",
        required: false,
        span: 5,
      },
    ],
  },
  {
    label:
      "4. Информация о существенных фактах (далее - факт), затрагивающих деятельность эмитента ценных бумаг в отчетном периоде",
    element: "title",
    type: "secondary",
    level: 5,
  },
  {
    element: "list",
    required: false,
    field: "4_information_about_material_facts",
    headers: [
      {
        title: "Наименование факта",
        span: 5,
      },
      {
        title: "Дата появления факта",
        span: 5,
      },
      {
        title: "Влиянии факта на деятельность",
        span: 8,
      },
      {
        title: "Дата и форма раскрытия",
        span: 5,
      },
      {
        title: "",
        span: 2,
      },
    ],
    lists: [
      {
        element: "input",
        field: "4_information_about_material_facts_1",
        required: false,
        span: 5,
      },
      {
        element: "input",
        field: "4_information_about_material_facts_2",
        required: false,
        span: 5,
      },
      {
        element: "input",
        field: "4_information_about_material_facts_3",
        required: false,
        span: 8,
      },
      {
        element: "input",
        field: "4_information_about_material_facts_4",
        required: false,
        span: 5,
      },
    ],
  },
  {
    label: "5. Финансовая отчетность эмитента за отчетный период",
    element: "title",
    type: "secondary",
    level: 5,
  },
];

const ReportForm = () => {
  const navigate = useNavigate();
  // Параметры страницы тип формы formType и cid для получение компании по id
  const { formType, cid } = useParams();

  const { data: dataReportTypes } = useGetReportTypesQuery();

  // Форма - Для добавление или обновление
  const [form] = Form.useForm();

  // Вызвать функции после того как компонент готов к работе
  useEffect(() => {
    if (formType === "upd") {
    }
    if (formType === "add") {
    }
  }, []);
  const save = (values) => {
    console.log(values);
  };
  return (
    <>
      <Card
        bordered={false}
        className="criclebox mb-24"
        title={<Title level={4}>Добавить отчет</Title>}
      >
        <Form layout="vertical" className="row-col" form={form} onFinish={save}>
          <Row>
            <Col className="px-2" span={24}>
              <Form.Item
                name="typeId"
                label="Тип отчета"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: `Тип отчета обязательно`,
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Выберите тип отчета из списка"
                  className="header-search"
                  options={dataReportTypes}
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
            </Col>
            {template.map(
              ({
                label,
                element,
                field,
                headers,
                lists,
                options,
                type,
                level,
                required,
              }) => (
                <Col
                  className="px-2"
                  xs={{
                    span: 24,
                  }}
                  sm={{
                    span: 24,
                  }}
                  md={{
                    span: ["title", "list"].includes(element) ? 24 : 12,
                  }}
                  lg={{
                    span: ["title", "list"].includes(element) ? 24 : 12,
                  }}
                  key={field}
                >
                  {element === "title" && (
                    <Typography>
                      <Title type={type} level={level}>
                        {label}
                      </Title>
                    </Typography>
                  )}
                  {element === "select" && (
                    <Form.Item
                      name={field}
                      label={label}
                      hasFeedback
                      rules={[
                        {
                          required: required,
                          message: `${label} обязательно`,
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        placeholder={`${label} из списка`}
                        className="header-search"
                        options={options}
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
                  )}
                  {element === "input" && (
                    <Form.Item
                      label={label}
                      name={field}
                      rules={[
                        {
                          required: required,
                          message: `${label} обязательно`,
                          whitespace: true,
                        },
                      ]}
                    >
                      <Input placeholder="Введите данные" />
                    </Form.Item>
                  )}
                  {element === "list" && (
                    <Form.List name={field}>
                      {(fields, { add, remove }) => (
                        <>
                          <Row gutter={16} align="middle">
                            {headers.map((head) => (
                              <Col span={head.span}>
                                <div>{head.title}</div>
                              </Col>
                            ))}
                          </Row>

                          {fields.map(({ key, name, ...restField }) => (
                            <Row gutter={16} key={key}>
                              {lists.map((list) => (
                                <Col span={list.span}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, list.field]}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Missing first name",
                                      },
                                    ]}
                                  >
                                    <Input placeholder="Введите данные" />
                                  </Form.Item>
                                </Col>
                              ))}

                              <Col span={1}>
                                <Form.Item>
                                  <MinusCircleOutlined
                                    color="primary"
                                    onClick={() => remove(name)}
                                  />
                                </Form.Item>
                              </Col>
                            </Row>
                          ))}

                          <Form.Item>
                            <Button
                              type="dashed"
                              onClick={() => add()}
                              block
                              icon={<PlusOutlined />}
                            >
                              Добавить поле для ввода данных
                            </Button>
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                  )}
                </Col>
              )
            )}
          </Row>
          <Row justify="space-between" align="middle">
            <Col className="px-2"></Col>
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

export default ReportForm;
