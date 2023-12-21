import {
  Row,
  Col,
  Card,
  Form,
  Typography,
  Button,
  Space,
  Spin,
  Table,
  Avatar,
  Divider,
} from "antd";
import { useParams, useNavigate } from "react-router-dom";
import {
  EditOutlined,
  FileTextOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { useEffect, useState, Fragment } from "react";
import {
  useGetReportTemplateQuery,
  useGetReportByIdQuery,
  useGetReportTypeByIdQuery,
  useLazyGetReportsQuery,
} from "../../../store/services/report-service";
import public_logo from "../../../assets/images/public_view_logo.png";

const { Meta } = Card;
const { Title, Text } = Typography;
const currentYear = new Date().getFullYear();
const CopyrightText = (
  <Title
    level={5}
    type="secondary"
    style={{ padding: "16px", textAlign: "center" }}
  >
    Центр раскрытия информации ЗАО "Кыргызская фондовая биржа" © {currentYear}
  </Title>
);
const ReportPublicView = () => {
  const navigate = useNavigate();
  const { reportType, tempId, reportId } = useParams();
  const formType = "view";
  const [template, setTemplate] = useState([]);
  // Форма - Для добавление или обновление
  const [form] = Form.useForm();

  const {
    data: dataReportTemplate,
    isSuccess: isSuccessReportTemplate,
    isLoading: isLoadingReportTemplate,
  } = useGetReportTemplateQuery(tempId);

  const { data: dataReportById, isSuccess: isSuccessGetReportById } =
    useGetReportByIdQuery(reportId);

  const { cert: edsData, typeId: edsType } =
    dataReportById?.eds.length > 0 && dataReportById?.eds[0];

  const { data: dataReportType, isSuccess: isSuccessGetReportType } =
    useGetReportTypeByIdQuery(reportType);

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
  // set data and other_file to main template
  const setTemplateAndOtherFileFields = () => {
    if (!template.length) {
      const temp = JSON.parse(JSON.stringify(dataReportTemplate.template));
      setTemplate(temp);
      const content = dataReportById.content;
      form.setFieldsValue(content);
    }
    if (reportType == 2 && template.length && isSuccessGetReportById) {
      const data = dataReportById.content;
      const addFieldTemplate = [...template];
      for (const prop in data) {
        if (prop.slice(0, 10) == "other_file") {
          const newField = {
            field: prop,
            element: "file",
            label: data[prop].length > 0 ? data[prop][0].label : "",
            delete: true,
          };
          addFieldTemplate[2].lists.push(newField);
        }
      }
      setTemplate(addFieldTemplate);
    }
  };

  useEffect(() => {
    console.log(dataReportType);
    if (isSuccessGetReportById && isSuccessReportTemplate) {
      setTemplateAndOtherFileFields();
    }
  }, [isSuccessReportTemplate, isSuccessGetReportById, template.length]);

  if (reportType == 2) {
    return false;
  }

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
                <img src={public_logo}></img>
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
          title={
            <Title level={4}>
              {dataReportById?.company?.name} : {dataReportType?.title}
            </Title>
          }
        >
          <Form.Provider>
            <Form
              layout="vertical"
              className="row-col"
              name="basicForm"
              form={form}
            >
              <Row>
                {isLoadingReportTemplate && (
                  <Col span={24} className="d-flex justify-content-center">
                    <Spin />
                  </Col>
                )}
                {isSuccessReportTemplate &&
                  isSuccessGetReportById &&
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
                            style={{ paddingTop: "20px" }}
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
                          <Title level={5}>
                            {`${label}: ${
                              options.filter(
                                (item) =>
                                  item.value === form.getFieldValue(field)
                              )[0]?.label
                            }`}
                          </Title>
                        )}
                        {element === "input" && (
                          <Text level={5}>{`${label}: ${
                            form.getFieldValue(field) || ""
                          }`}</Text>
                        )}
                        {element === "list" && (
                          <Table
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
                                  style={{
                                    border: "0.5px solid #f0f0f0",
                                  }}
                                  key={`${list.field}-${i}`}
                                >
                                  {list.element === "input" &&
                                    list.disabled && (
                                      <Form.Item>
                                        <Text style={{ padding: "0px 25px" }}>
                                          {list.value}
                                        </Text>
                                      </Form.Item>
                                    )}
                                  {list.element === "input" &&
                                    !list.disabled && (
                                      <Form.Item
                                        name={list.field}
                                        initialValue={list.value}
                                      >
                                        <Text style={{ padding: "0px 25px" }}>
                                          {form.getFieldValue(list.field)}
                                        </Text>
                                      </Form.Item>
                                    )}
                                  {list.element === "title" && (
                                    <Form.Item>
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
                                    </Form.Item>
                                  )}
                                  {list.element === "text" && (
                                    <Form.Item>
                                      <Text>{list.value}</Text>
                                    </Form.Item>
                                  )}
                                </Col>
                              ))}
                            </Row>
                          </>
                        )}
                        {element === "textarea" && (
                          <Form.Item
                            label={<Title level={5}>{label}</Title>}
                            name={field}
                          >
                            <Text>{form.getFieldValue(field)}</Text>
                            <Divider orientation="left" plain />
                          </Form.Item>
                        )}
                        {element === "list_group" && (
                          <Row gutter={[16, 16]}>
                            {lists.map((list) => (
                              <Fragment key={list.field}>
                                <Col span={12}>
                                  <Text>{list.label}</Text>
                                </Col>
                                <Col
                                  span={12}
                                  className="my-2"
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                  }}
                                >
                                  {list.element === "form" && (
                                    <Space align="start">
                                      <Form.Item
                                        name={list.field}
                                        shouldUpdate={(prevValues, curValues) =>
                                          curValues[list.field]
                                        }
                                      >
                                        <>
                                          <Button
                                            type={formType === "view" && "link"}
                                            icon={<EditOutlined />}
                                            style={{
                                              width: "155px",
                                              textAlign: "start",
                                            }}
                                          >
                                            {formType === "view"
                                              ? "Отчет"
                                              : "Заполнить"}
                                          </Button>
                                        </>
                                      </Form.Item>
                                    </Space>
                                  )}
                                  {list.element === "file" && (
                                    <Space align="start">
                                      {form.getFieldValue(list.field) && (
                                        <Button
                                          type="link"
                                          icon={<FileTextOutlined />}
                                          style={{
                                            width: "155px",
                                            textAlign: "start",
                                          }}
                                          href={
                                            form.getFieldValue(list.field)[0]
                                              .url
                                          }
                                          target="_blank"
                                        >
                                          {
                                            form.getFieldValue(list.field)[0]
                                              .name
                                          }
                                        </Button>
                                      )}
                                    </Space>
                                  )}
                                </Col>
                              </Fragment>
                            ))}
                          </Row>
                        )}
                      </Col>
                    )
                  )}
              </Row>
            </Form>
          </Form.Provider>
        </Card>
        {CopyrightText}
      </Col>
    </Row>
  );
};

export default ReportPublicView;
