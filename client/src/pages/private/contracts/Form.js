import {
    Row,
    Col,
    Card,
    Form,
    Input,
    Typography,
    Button,
    Space,
    Spin,
  } from "antd";
  import { useParams, useNavigate } from "react-router-dom";
  import {
    PrinterOutlined,
  } from "@ant-design/icons";
  import { useEffect, useState, Fragment, useRef } from "react";
import { useGetContractTypeByIdQuery } from "../../../store/services/contract-service";
  
  // через класс или id не работает стили так как шаблон стили загружает динамически
  const btnStyle = {
    background: "#57b6c0",
    borderColor: "#57b6c0",
  };
  const { Title, Text, Paragraph } = Typography;
  
  const ContractForm = () => {

    const { formType, contractType } = useParams();
    const [template, setTemplate] = useState([]);
    const { data: dataContractType, isLoading: isLoadingContractType, isSuccess: isSuccessContractType } = useGetContractTypeByIdQuery(contractType);

    // Форма - Для добавление или обновление
    const [form] = Form.useForm();
  
    return (
      <Card
        bordered={false}
        className="criclebox mb-24"
        title={
          <Title level={4}>
            {dataContractType?.title}
          </Title>
        }
        extra={
          formType == "view" && (
            <Button
              type="primary"
              style={{ ...btnStyle }}
              icon={<PrinterOutlined />}
            >
              Печать
            </Button>
          )
        }
      >
        <div>
          <Form.Provider>
            <Form
              layout="vertical"
              className="row-col"
              name="basicForm"
              form={form}
            >
              <Row>
                { isLoadingContractType && (
                  <Col span={24} className="d-flex justify-content-center">
                    <Spin />
                  </Col>
                )}
                {
                  dataContractType?.templates?.template.map(
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
                            style={formType === "view" && { paddingTop: "10px" }}
                          >
                            {label}
                          </Title>
                        )}
                        {element === "text" && (
                          <Space direction="vertical">
                            <Text>{label}</Text>
                          </Space>
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
                                style={{
                                  marginBottom: "0px",
                                }}
                              >
                                <Input placeholder="Введите данные" />
                              </Form.Item>
                            )}
                          </>
                        )}               
                      </Col>
                    )
                  )}
              </Row>
  
              <Row justify="space-between" align="middle">
                
              </Row>
            </Form>
          </Form.Provider>
        </div>
      </Card>
    );
  };
  
  export default ContractForm;
  