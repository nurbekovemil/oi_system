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
    Select,
    List,
    Avatar,
  } from "antd";
  import { useParams, useNavigate } from "react-router-dom";
  import {
    ArrowLeftOutlined,
    PrinterOutlined,
    SaveOutlined,
    UserOutlined,
  } from "@ant-design/icons";
  import { useEffect, useState, Fragment, useRef } from "react";
import { useCreateContractMutation, useGetContractTypeByIdQuery, useLazyGetContractByIdQuery } from "../../../store/services/contract-service";
import { useGetCompaniesForOptionQuery, useLazyGetCompanyByIdQuery } from "../../../store/services/company-service";
import { useSelector } from "react-redux";

  
  // через класс или id не работает стили так как шаблон стили загружает динамически
  const btnStyle = {
    background: "#57b6c0",
    borderColor: "#57b6c0",
  };
  const { Title, Text, Paragraph } = Typography;
  const { TextArea } = Input;
  const ContractForm = () => {
    const [ form] = Form.useForm();
    const { formType, contractType, contractId } = useParams();
    const { data: dataContractType, isLoading: isLoadingContractType } = useGetContractTypeByIdQuery(contractType);
    const [ getContractById, { data: contractDetail, isLoading: isLoadingContract }] = useLazyGetContractByIdQuery()
    const [ createContract ] = useCreateContractMutation()
    const { data: optionCompanies } = useGetCompaniesForOptionQuery("");
    const [ getCompanyById ] = useLazyGetCompanyByIdQuery();
    const { user } = useSelector((state) => state.auth);
    const [ contractCompanies, setContractCompanies ] = useState([]);
    const isAdmin = user?.roles.some((role) =>
      ['ADMIN', 'MODERATOR'].includes(role.title),
    );
    const ContractDisclosureAgreement = async () => {
      const {value} = await getCompanyData(user.companyId)
      form.setFieldsValue({contractor: value})
    }
    const getCompanyData = async (companyId) =>{
      const {data} = await getCompanyById(companyId)
      const value = ` ${data.name}\n ИНН: ${data.inn}\n Адрес: ${data.address}\n Тел: ${data.phone_number}\n Президент: ${data.director}\n`
      return {
        companyId,
        value
      } 
    }
    const contractDetails = async () => {
      const detail = await getContractById(contractId)
      // setContractCompanies()
      form.setFieldsValue(detail?.data?.content)
    }
    const setCompanyDataForContract = async (companyIds) => {
      if(contractType == 1 && companyIds.length > 0){
        const company_data = await getCompanyData(companyIds[0])
        form.setFieldsValue({сustomer: company_data.value})
        setContractCompanies([companyIds[0]])
      }
    }
    const onSave = async () => {
      const content = form.getFieldsValue();
      const contract = {
        companyId: user.companyId,
        content,
        typeId: contractType
      }
      const contract_companies = [...contractCompanies, user.companyId]
      await createContract({contract, contract_companies})
    }
    useEffect(() => {
      if (contractType == 1) {
        if(formType === 'add'){
          ContractDisclosureAgreement()
        }
        if(formType === 'upd' || formType === 'view'){
          contractDetails()
        }
      }
    }, [])
    return (
      <Row gutter={[18, 16]}>
        <Col span={24}>
          <Card
            bordered={false}
            title={<Title level={4}>Участники</Title>}
          >
            {
               isAdmin && formType == "add" &&
                <Col span={24} className="px-2">
                  <Form.Item
                    name=""
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
                      className="header-search contract-select"
                      options={optionCompanies}
                      optionFilterProp="children"
                      defaultValue={contractCompanies}
                      mode="multiple"
                      allowClear
                      filterOption={(input, opt) =>
                        (opt?.label ?? "").includes(input)
                      }
                      filterSort={(optA, optB) =>
                        (optA?.label ?? "")
                          .toLowerCase()
                          .localeCompare((optB?.label ?? "").toLowerCase())
                      }
                      onChange={setCompanyDataForContract}
                    />
                  </Form.Item>
                </Col>
            }
            {
              formType == "view" && (
                <Col span={24}>
                    <List
                      itemLayout="horizontal"
                      dataSource={contractDetail?.contractCompanies}
                      renderItem={(item) => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={
                              <Avatar
                                style={{
                                  backgroundColor: (item.status?.id === 2 && "#57b6c0") || (item.status?.id === 3 && "#f50"),
                                }}
                                icon={<UserOutlined />}
                              />}
                            title={<a>{item.company.name}</a>}
                            description={`Статус подписи: ${item.status.title}`}
                          />
                        </List.Item>
                      )}
                    />
                </Col>
              )
            }
          </Card>
        </Col>
        <Col span={24}>
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
                              span: ["textarea_contract"].includes(element) ? 12 : 24,
                            }}
                            lg={{
                              span: ["textarea_contract"].includes(element) ? 12 : 24,
                            }}
                            key={`${field}-${i}`}
                          >
                            {element === "title" && (
                              <Title
                                type={type}
                                level={level}
                                style={{ paddingTop: "10px" }}
                              >
                                {label}
                              </Title>
                            )}
                            {element === "title_center" && (
                              <Title
                                type={type}
                                level={level}
                                style={{ 
                                  paddingTop: "10px",
                                  display:'flex',
                                  justifyContent:'center'
                                }}
                              >
                                {label}
                              </Title>
                            )}
                            {element === "text" && (
                              <Space direction="vertical">
                                <Text>{label}</Text>
                              </Space>
                            )}
                            {element === "textarea_contract" && (
                              <Form.Item
                                label={<Title level={5}>{label}</Title>}
                                name={field}
                              >
                                {
                                  formType == "view" ? <Text style={{ whiteSpace: "pre-wrap" }}>{form.getFieldValue(field) || ""}</Text> : <TextArea rows={7}/>
                                }
                                
                              </Form.Item>
                            )}            
                          </Col>
                        )
                      )}
                  </Row>
      
                  <Row justify="end" align="middle">
                    <Col className="px-2">
                      <Space >
                        <Button>Назад</Button>
                        {
                          formType != "view" && <Button
                            type="primary"
                            icon={<SaveOutlined />}
                            style={{
                              ...btnStyle,
                            }}
                            onClick={onSave}
                          >
                            {formType == "add" ? "Сохранить" : "Обновить"}
                          </Button>
                        }
                      </Space>
                    </Col>
                  </Row>
                </Form>
              </Form.Provider>
            </div>
          </Card>
        </Col>
      </Row>
    );
  };
  
  export default ContractForm;
  