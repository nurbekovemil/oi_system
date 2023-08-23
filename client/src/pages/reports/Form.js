import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Typography,
  Button,
  Upload,
  Space,
  Select,
  Spin,
} from "antd";
import { useParams, useNavigate } from "react-router-dom";
import {
  SaveOutlined,
  PlusOutlined,
  MinusCircleOutlined,
  UploadOutlined,
  EditOutlined,
  CopyOutlined,
} from "@ant-design/icons";

import { useEffect, useState, Fragment } from "react";
import {
  useGetReportTemplateQuery,
  useUpdateReportMutation,
  useLazyGetReportByIdQuery,
} from "../../store/services/report-service";

import ListingModalForm from "../../components/report/ListingModalForm";
import { debounce } from "../../hooks/useDebounce";
const { Title, Text } = Typography;
const { TextArea } = Input;

const ReportForm = () => {
  const navigate = useNavigate();
  const { formType, reportType, tempId, reportId } = useParams();
  const [template, setTemplate] = useState([]);
  // Форма - Для добавление или обновление
  const [form] = Form.useForm();

  const [listingTemplate, setListingTemplate] = useState({
    listing_prospectus: false,
    attachment_2_1: false,
  });
  const [listingField, setListingField] = useState("");

  const {
    data: dataReportTemplate,
    isSuccess: isSuccessReportTemplate,
    isLoading: isLoadingReportTemplate,
  } = useGetReportTemplateQuery(tempId);
  const [
    getReportById,
    { data: dataReportById, isSuccess: isSuccessGetReportById },
  ] = useLazyGetReportByIdQuery();
  const [updateReport, {}] = useUpdateReportMutation();

  const addListingField = () => {
    if (listingField.trim() !== "") {
      let length = Object.keys(form.getFieldsValue()).length;
      let field = `other_file_${length}`;
      const addField = [...template];
      addField[2].lists.push({
        field,
        element: "file",
        label: listingField,
        delete: true,
      });
      setTemplate(addField);
    }
  };
  const deleteListingField = (field, itemToRemove) => {
    const newTemp = template.map((item) => {
      if (item.field === field) {
        const updatedLists = item.lists.filter(
          (item) => item.field !== itemToRemove
        );
        return { ...item, lists: updatedLists };
      }
      return item;
    });
    setTemplate(newTemp);
  };
  const toggleListingReportModal = (field, flag) => {
    setListingTemplate((prevState) => ({
      ...prevState,
      [field]: flag,
    }));
  };

  const validValues = (values) =>
    Object.fromEntries(
      Object.entries(values).filter(([_, value]) =>
        typeof value === "string"
          ? value.trim() !== ""
          : value !== undefined && value !== null
      )
    );

  const save = (values) => {
    console.log(values);
    // надо пересмотреть фильтрацию
    // const report = Object.fromEntries(
    //   Object.entries(values).filter(([_, value]) =>
    //     typeof value === "string"
    //       ? value.trim() !== ""
    //       : value !== undefined && value !== null
    //   )
    // );
    // const { content } = report;
    // const newReport = {
    //   typeId: reportType,
    //   content: JSON.stringify(content),
    //   statusId: 1, // Статус отчета "сохранен"
    // };
    // createReport(newReport);
  };

  const update = () => {
    const testData = {
      listing_period: 2,
      listing_year: 2022,
      listing_prospectus: {
        issuer_data_name: "test",
        issuer_data_period: "test",
        issuer_data_date: "test",
        issuer_data_legal_info_address: "test",
        issuer_data_contact: "test",
      },
    };
    form.setFieldsValue(testData);
  };

  const updateField = (content, allvalues) => {
    const contentProperty = Object.keys(content)[0];
    updateReport({
      reportId,
      content: { [contentProperty]: allvalues[contentProperty] },
      field: Object.keys(content)[0],
    });
  };
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  // Вызвать функции после того как компонент готов к работе
  useEffect(() => {
    if (formType === "upd" && !isSuccessGetReportById && !dataReportById) {
      getReportById(reportId);
    }
    if (formType === "add") {
      // createReport({ typeId: reportType, statusId: 1 });
    }
    if (isSuccessReportTemplate && template.length == 0) {
      setTemplate(JSON.parse(JSON.stringify(dataReportTemplate.template)));
    }
    if (isSuccessGetReportById) {
      form.setFieldsValue(JSON.parse(dataReportById.content));
    }
  }, [isSuccessReportTemplate, isSuccessGetReportById]);

  return (
    <>
      <Card
        bordered={false}
        className="criclebox mb-24"
        title={<Title level={4}>Добавить отчет</Title>}
      >
        <Form.Provider>
          <Form
            layout="vertical"
            className="row-col"
            name="basicForm"
            form={form}
            onValuesChange={debounce(updateField, 1000)}
          >
            <Row>
              {isLoadingReportTemplate && isSuccessGetReportById && (
                <Col span={24} className="d-flex justify-content-center">
                  <Spin />
                </Col>
              )}
              {isSuccessReportTemplate &&
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
                        <Typography>
                          <Title type={type} level={level}>
                            {label}
                          </Title>
                        </Typography>
                      )}
                      {element === "text" && (
                        <Space direction="vertical">
                          <Text>{label}</Text>
                        </Space>
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
                                .localeCompare(
                                  (optB?.label ?? "").toLowerCase()
                                )
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
                                {headers.map((head, i) => (
                                  <Col span={head.span} key={`${field}-${i}`}>
                                    <div>{head.title}</div>
                                  </Col>
                                ))}
                              </Row>

                              {fields.map(({ key, name, ...restField }) => (
                                <Row gutter={16} key={key}>
                                  {lists.map((list) => (
                                    <Col span={list.span} key={list.field}>
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
                              ))}

                              {
                                <Form.Item>
                                  <Button
                                    type="dashed"
                                    style={{
                                      color: "#1890ff",
                                    }}
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
                      {element === "rows" && (
                        <>
                          <Row gutter={16} align="middle">
                            {headers.map((head, i) => (
                              <Col span={head.span} key={`${field}-${i}`}>
                                <div>{head.title}</div>
                              </Col>
                            ))}
                          </Row>
                          <Row gutter={16}>
                            {lists.map((list, i) => (
                              <Col
                                span={list.span}
                                offset={
                                  (list.element === "title" && 2) ||
                                  (list.offset && list.offset)
                                }
                                key={`${list.field}-${i}`}
                              >
                                {list.element === "input" && list.disabled && (
                                  <Form.Item>
                                    <Input disabled={true} value={list.value} />
                                  </Form.Item>
                                )}
                                {list.element === "input" && !list.disabled && (
                                  <Form.Item
                                    name={list.field}
                                    initialValue={list.value}
                                  >
                                    <Input placeholder="Введите данные" />
                                  </Form.Item>
                                )}
                                {list.element === "title" && (
                                  <Text strong>{list.value}</Text>
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
                          <TextArea rows={4} placeholder="Введите данные" />
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
                                          icon={<EditOutlined />}
                                          style={{
                                            width: "155px",
                                            textAlign: "start",
                                          }}
                                          onClick={() =>
                                            toggleListingReportModal(
                                              list.field,
                                              true
                                            )
                                          }
                                        >
                                          Заполнить
                                        </Button>

                                        <ListingModalForm
                                          open={listingTemplate[list.field]}
                                          name={list.field}
                                          label={list.label}
                                          onCancel={() =>
                                            toggleListingReportModal(
                                              list.field,
                                              false
                                            )
                                          }
                                          template={list.template}
                                          reportId={reportId}
                                          formType={formType}
                                          updData={form.getFieldValue(
                                            list.field
                                          )}
                                        />
                                      </>
                                    </Form.Item>
                                    <Button
                                      icon={<CopyOutlined />}
                                      style={{
                                        width: "200px",
                                        textAlign: "start",
                                      }}
                                    >
                                      Загрузить из шаблона
                                    </Button>
                                  </Space>
                                )}
                                {list.element === "file" && (
                                  <Space align="start">
                                    <Form.Item
                                      name={list.field}
                                      valuePropName="fileList"
                                      getValueFromEvent={normFile}
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                      }}
                                    >
                                      <Upload
                                        name={list.field}
                                        listType="picture"
                                        customRequest={({ file, onSuccess }) =>
                                          onSuccess("ok")
                                        }
                                        onChange={({ file }) =>
                                          (file.status = "done")
                                        }
                                        accept=".pdf, .doc, .docx"
                                      >
                                        <Button
                                          icon={<UploadOutlined />}
                                          style={{
                                            width: "155px",
                                            textAlign: "start",
                                          }}
                                        >
                                          Загрузить файл
                                        </Button>
                                      </Upload>
                                    </Form.Item>
                                    {list.delete && (
                                      <Button
                                        icon={<MinusCircleOutlined />}
                                        type=""
                                        style={{
                                          width: "155px",
                                          textAlign: "start",
                                        }}
                                        onClick={() =>
                                          deleteListingField(field, list.field)
                                        }
                                        danger
                                      >
                                        Удалить поле
                                      </Button>
                                    )}
                                  </Space>
                                )}
                              </Col>
                            </Fragment>
                          ))}
                          <Col span={12}>
                            <Input
                              placeholder="Введите название"
                              onChange={(e) => setListingField(e.target.value)}
                            />
                          </Col>
                          <Col span={12}>
                            <Button
                              icon={<PlusOutlined />}
                              style={{
                                width: "155px",
                                textAlign: "start",
                                marginRight: "1rem",
                              }}
                              onClick={addListingField}
                            >
                              Добавить поле
                            </Button>
                          </Col>
                        </Row>
                      )}
                    </Col>
                  )
                )}
            </Row>
            <Row justify="space-between" align="middle">
              <Col className="px-2"></Col>
              <Col className="px-2">
                <Space>
                  <Button onClick={update}>upd</Button>
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
        </Form.Provider>
      </Card>
    </>
  );
};

export default ReportForm;
