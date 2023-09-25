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
} from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useUpdateReportMutation } from "../../store/services/report-service";
import { debounce } from "../../hooks/useDebounce";
import { useEffect } from "react";
const { Title, Text } = Typography;
const { TextArea } = Input;

const ListingModalForm = ({
  open,
  onCancel,
  template,
  name,
  label,
  reportId,
  updData,
  formType,
}) => {
  const [form] = Form.useForm();
  const onOk = () => {
    form.submit();
    onCancel();
  };

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
  useEffect(() => {
    if (updData) {
      form.setFieldsValue(updData);
    }
  }, [updData]);

  const [updateReport, {}] = useUpdateReportMutation();

  const updateField = (content, allvalues) => {
    const contentProperty = Object.keys(content)[0];

    updateReport({
      reportId,
      content: { [name]: { [contentProperty]: allvalues[contentProperty] } },
      field: Object.keys(content)[0],
    });
  };

  return (
    <Modal
      width={"80%"}
      title={label}
      open={open}
      onCancel={onCancel}
      okText="Сохранить"
      onCancelText={"Отмена"}
      onOk={onOk}
    >
      <Form
        form={form}
        layout="vertical"
        name={name}
        onValuesChange={debounce(updateField, 1000)}
      >
        <Row>
          {template.map(
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
                    style={formType === "view" && { paddingTop: "20px" }}
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
                        {options.filter(
                          (item) => item.value === form.getFieldValue(field)
                        )[0]?.label || ""}
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
                              .localeCompare((optB?.label ?? "").toLowerCase())
                          }
                        />
                      </Form.Item>
                    )}
                  </>
                )}
                {element === "input" && (
                  <>
                    {formType === "view" ? (
                      <Text level={5}>{`${label}: ${
                        form.getFieldValue(field) || ""
                      }`}</Text>
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
                          {list.element === "input" && list.disabled && (
                            <Form.Item>
                              {formType === "view" ? (
                                <Text style={{ padding: "0px 25px" }}>
                                  {list.value}
                                </Text>
                              ) : (
                                <Input disabled={true} value={list.value} />
                              )}
                            </Form.Item>
                          )}
                          {list.element === "input" && !list.disabled && (
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
                          {list.element === "text" && <Text>{list.value}</Text>}
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
    </Modal>
  );
};
export default ListingModalForm;
