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
      width={"90%"}
      title={label}
      open={open}
      onCancel={onCancel}
      onOk={onOk}
      okText="Сохранить"
      onCancelText="Отмена"
      style={{
        top: "5%",
      }}
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
                    <TextArea rows={4} placeholder="Введите данные" />
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
