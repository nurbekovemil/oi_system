import {
  Row,
  Col,
  Form,
  Input,
  Typography,
  Button,
  Space,
  Select,
  Modal,
  Table,
  Card,
  Divider,
} from "antd";
import {
  PlusOutlined,
  MinusCircleOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetReportByIdQuery,
  useGetReportTemplateQuery,
} from "../../../store/services/report-service";
import public_logo from "../../../assets/images/public_view_logo.png";
import { useReactToPrint } from "react-to-print";
const { Title, Text } = Typography;
const { TextArea } = Input;
const currentYear = new Date().getFullYear();
// через класс или id не работает стили так как шаблон стили загружает динамически
const btnStyle = {
  background: "#57b6c0",
  borderColor: "#57b6c0",
};
const CopyrightText = (
  <Title
    level={5}
    type="secondary"
    style={{ padding: "16px", textAlign: "center" }}
  >
    Центр раскрытия информации ЗАО "Кыргызская фондовая биржа" © {currentYear}
  </Title>
);
const ListingView = () => {
  const [form] = Form.useForm();
  const [template, setTemplate] = useState([]);
  const [title, setTitle] = useState("");
  const { name, tempId, reportId } = useParams();

  const formType = "view";

  const {
    data: getTemplate,
    isSuccess: isSuccessReportTemplate,
    isLoading: isLoadingReportTemplate,
  } = useGetReportTemplateQuery(tempId);

  const { data: listingData, isSuccess: isSuccessGetReportById } =
    useGetReportByIdQuery(reportId);

  const onViewTableHandler = (inputArray) => {
    if (inputArray) {
      return inputArray.map((inputObject) => {
        const outputObject = {};
        for (const key in inputObject) {
          const numericKey = parseInt(key.match(/\d+/)[0]);
          outputObject[numericKey] = inputObject[key];
        }
        return outputObject;
      });
    }
  };

  const setTempAndData = () => {
    const temp =
      isSuccessReportTemplate &&
      getTemplate.template[2].lists.filter((item) => item.field == name)[0];

    if (temp) {
      const report = listingData?.content[name];
      setTitle(`${listingData?.company?.name} : ${temp?.label}`);
      setTemplate(temp.template);
      form.setFieldsValue(report);
    }
  };

  useEffect(() => {
    if (isSuccessGetReportById && isSuccessReportTemplate) {
      setTempAndData();
    }
  }, [isSuccessGetReportById]);
  const printContentRef = useRef();
  const printHandler = useReactToPrint({
    bodyClass: "print-agreement",
    content: () => printContentRef.current,
    documentTitle: `Центр раскрытия информации - ${title}`,
  });
  return (
    <Row justify="center">
      <Col span={20}>
        <Card
          bordered={false}
          className="criclebox content-ant-public"
          style={{ marginBottom: "22px", marginTop: "22px" }}
        >
          <Row align={"middle"}>
            <Col span={12}>
              <div className="public_logo">
                <a href="https://www.kse.kg/ru" target="_blank">
                  <img src={public_logo}></img>
                </a>
              </div>
            </Col>
            <Col span={12} align="end">
              <Space size={"small"} split={<Divider type="vertical" />}>
                <Button
                  type="link"
                  href="https://www.kse.kg/ru"
                  target="_blank"
                >
                  Главная
                </Button>
                <Button
                  type="link"
                  href="https://www.kse.kg/ru/PublicInfo"
                  target="_blank"
                >
                  Центр раскрытия информации
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={20}>
        <Card
          bordered={false}
          className="criclebox mb-24 content-ant-public"
          title={<Title level={4}>{title}</Title>}
          extra={
            formType == "view" && (
              <Button
                type="primary"
                style={{ ...btnStyle }}
                onClick={printHandler}
                icon={<PrinterOutlined />}
              >
                Печать
              </Button>
            )
          }
        >
          <div ref={printContentRef}>
            <Form form={form} layout="vertical">
              <Row>
                {template &&
                  template.length > 0 &&
                  template.map(
                    (
                      {
                        label,
                        element,
                        field,
                        headers,
                        lists,
                        options,
                        type,
                        level,
                        required,
                      },
                      i
                    ) => (
                      <Col
                        className="px-2"
                        xs={{
                          span: 24,
                        }}
                        sm={{
                          span: 24,
                        }}
                        md={{
                          span: ["input", "select"].includes(element) ? 12 : 24,
                        }}
                        lg={{
                          span: ["input", "select"].includes(element) ? 12 : 24,
                        }}
                        key={`${field}-${i}`}
                      >
                        {element === "title" && (
                          <Title
                            type={type}
                            level={level}
                            style={
                              formType === "view" && { paddingTop: "20px" }
                            }
                          >
                            {label}
                          </Title>
                        )}
                        {element === "text" && (
                          <Space direction="vertical">
                            <Text>{label}</Text>
                          </Space>
                        )}
                        {element === "select" && (
                          <>
                            {formType === "view" ? (
                              <Title level={5}>
                                {
                                  options.filter(
                                    (item) =>
                                      item.value === form.getFieldValue(field)
                                  )[0]?.label
                                }
                              </Title>
                            ) : (
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
                                      .localeCompare(
                                        (optB?.label ?? "").toLowerCase()
                                      )
                                  }
                                />
                              </Form.Item>
                            )}
                          </>
                        )}
                        {element === "input" && (
                          <>
                            {formType === "view" ? (
                              <Text level={5}>{`${label}: ${form.getFieldValue(
                                field
                              )}`}</Text>
                            ) : (
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
                          </>
                        )}
                        {element === "list" && (
                          <>
                            {formType === "view" ? (
                              <Table
                                className="custom-table"
                                columns={headers.map((h, i) => ({
                                  title: h.title,
                                  dataIndex: i + 1,
                                  ellipsis: {
                                    showTitle: false,
                                  },
                                }))}
                                locale={{
                                  emptyText: "Пусто",
                                }}
                                dataSource={onViewTableHandler(
                                  form.getFieldValue(field)
                                )}
                                bordered
                                pagination={false}
                              />
                            ) : (
                              <Form.List name={field}>
                                {(fields, { add, remove }) => (
                                  <>
                                    <Row gutter={16} align="middle">
                                      {headers.map((head, i) => (
                                        <Col
                                          span={head.span}
                                          key={`${field}-${i}`}
                                        >
                                          <div>{head.title}</div>
                                        </Col>
                                      ))}
                                    </Row>

                                    {fields.map(
                                      ({ key, name, ...restField }) => (
                                        <Row gutter={16} key={key}>
                                          {lists.map((list) => (
                                            <Col
                                              span={list.span}
                                              key={list.field}
                                            >
                                              <Form.Item
                                                {...restField}
                                                name={[name, list.field]}
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
                                      )
                                    )}

                                    {
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
                                    }
                                  </>
                                )}
                              </Form.List>
                            )}
                          </>
                        )}
                        {element === "rows" && (
                          <>
                            <Row gutter={16} align="middle">
                              {headers.map((head, i) => (
                                <Col span={head.span} key={`${field}-${i}`}>
                                  <div>{head.title}</div>
                                </Col>
                              ))}
                            </Row>
                            <Row
                              gutter={formType != "view" && 16}
                              style={
                                formType == "view" && {
                                  border: "1px solid #f0f0f0",
                                }
                              }
                            >
                              {lists.map((list, i) => (
                                <Col
                                  span={list.span}
                                  offset={
                                    (list.element === "title" && 2) ||
                                    (list.offset && list.offset)
                                  }
                                  style={
                                    formType == "view" && {
                                      border: "0.5px solid #f0f0f0",
                                    }
                                  }
                                  key={`${list.field}-${i}`}
                                >
                                  {list.element === "input" &&
                                    list.disabled && (
                                      <Form.Item>
                                        {formType === "view" ? (
                                          <Text style={{ padding: "0px 25px" }}>
                                            {list.value}
                                          </Text>
                                        ) : (
                                          <Input
                                            disabled={true}
                                            value={list.value}
                                          />
                                        )}
                                      </Form.Item>
                                    )}
                                  {list.element === "input" &&
                                    !list.disabled && (
                                      <Form.Item
                                        name={list.field}
                                        initialValue={list.value}
                                      >
                                        {formType === "view" ? (
                                          <Text style={{ padding: "0px 25px" }}>
                                            {form.getFieldValue(list.field)}
                                          </Text>
                                        ) : (
                                          <Input placeholder="Введите данные" />
                                        )}
                                      </Form.Item>
                                    )}
                                  {list.element === "title" && (
                                    <Text
                                      strong
                                      style={
                                        formType === "view" && {
                                          padding: "0px 25px",
                                        }
                                      }
                                    >
                                      {list.value}
                                    </Text>
                                  )}
                                  {list.element === "text" && (
                                    <Text>{list.value}</Text>
                                  )}
                                </Col>
                              ))}
                            </Row>
                          </>
                        )}
                        {element === "textarea" && (
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
                            {formType === "view" ? (
                              <Text>{form.getFieldValue(field)}</Text>
                            ) : (
                              <TextArea rows={4} placeholder="Введите данные" />
                            )}
                          </Form.Item>
                        )}
                      </Col>
                    )
                  )}
              </Row>
            </Form>
          </div>
        </Card>
        {CopyrightText}
      </Col>
    </Row>
  );
};
export default ListingView;
