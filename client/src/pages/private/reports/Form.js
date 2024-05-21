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
  Table,
  Popover,
  Modal,
  Radio,
  List,
  notification,
  Divider,
} from "antd";
import { useParams, useNavigate } from "react-router-dom";
import {
  SaveOutlined,
  PlusOutlined,
  MinusCircleOutlined,
  UploadOutlined,
  EditOutlined,
  CopyOutlined,
  FileTextOutlined,
  SafetyCertificateOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import { useEffect, useState, Fragment, useRef } from "react";
import {
  useGetReportTemplateQuery,
  useUpdateReportMutation,
  useGetReportByIdQuery,
  useRemoveReportFileMutation,
  useGetReportTypeByIdQuery,
  useLazyGetReportByGroupTypeQuery,
  useUpdateReportCompanyIdMutation,
} from "../../../store/services/report-service";

import ListingModalForm from "../../../components/report/ListingModalForm";
import { debounce } from "../../../hooks/useDebounce";
import EdsCert from "../../../components/eds/EdsCert";
import { useSelector } from "react-redux";
import { useGetCompaniesForOptionQuery, useLazyGetCompanyByIdQuery } from "../../../store/services/company-service";
import { useReactToPrint } from "react-to-print";

// через класс или id не работает стили так как шаблон стили загружает динамически
const btnStyle = {
  background: "#57b6c0",
  borderColor: "#57b6c0",
};
const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const uploadFileSize = 40 * 1024 * 1024; // 40 мб

const ReportForm = () => {
  const [loadedReport, setLoadedReport] = useState();
  const navigate = useNavigate();
  const { formType, reportType, tempId, reportId } = useParams();
  const [template, setTemplate] = useState([]);

  // Форма - Для добавление или обновление
  const [form] = Form.useForm();
  const { confirm } = Modal;

  const [listingTemplate, setListingTemplate] = useState({
    listing_prospectus: false,
    attachment_2_1: false,
  });
  const [listingField, setListingField] = useState("");

  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.roles.some((role) =>
    ['ADMIN', 'MODERATOR'].includes(role.title),
  );
  const { data: dataReportTemplate, isSuccess: isSuccessReportTemplate, isLoading: isLoadingReportTemplate } = useGetReportTemplateQuery(tempId);

  const [getCompanyById, {}] = useLazyGetCompanyByIdQuery();
  const [updateCompanyById, {}] = useUpdateReportCompanyIdMutation();
  const { data: optionCompanies } = useGetCompaniesForOptionQuery("");

  const [getReportByGroupType, { data: reportGroupData, isSuccess: isSuccessReportGroupData }] = useLazyGetReportByGroupTypeQuery();

  const { data: dataReportById, isSuccess: isSuccessGetReportById } = useGetReportByIdQuery(reportId);

  const { cert: edsData, typeId: edsType } = dataReportById?.eds.length > 0 && dataReportById?.eds[0];

  const { data: dataReportType } = useGetReportTypeByIdQuery(reportType);

  const [updateReport, {}] = useUpdateReportMutation();

  const [removeReportFile, {}] = useRemoveReportFileMutation();

  const addListingField = () => {
    if (listingField.trim() !== "") {
      let length = Object.keys(form.getFieldsValue()).length;
      let field = `other_file_${length}`;
      const addField = [...template];
      const newField = {
        field,
        element: "file",
        label: listingField,
        delete: true,
      };
      addField[2].lists.push(newField);
      setTemplate(addField);
    }
  };
  const deleteListingField = (field, itemToRemove) => {
    const fileName = form.getFieldValue(itemToRemove);
    if (fileName && fileName.length > 0) {
      deleteRemoveFile(fileName[0]);
    }
    const newTemp = template.map((item) => {
      if (item.field === field) {
        const updatedLists = item.lists.filter(
          (item) => item.field !== itemToRemove
        );
        updateReportFieldHandler({ [itemToRemove]: 'deleted' });
        return { ...item, lists: updatedLists };
      }
      return item;
    });
    form.setFieldsValue({ [itemToRemove]: 'deleted' });
    setTemplate(newTemp);
  };
  const toggleListingReportModal = (field, flag) => {
    setListingTemplate((prevState) => ({
      ...prevState,
      [field]: flag,
    }));
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
  // set data and other_file to main template
  const setTemplateAndOtherFileFields = async () => {
    const content = dataReportById.content;
    form.setFieldsValue(content);

    if (!template.length) {
      const temp = JSON.parse(JSON.stringify(dataReportTemplate.template));
      setTemplate(temp);
    }
    if (reportType == 2 && template.length && isSuccessGetReportById) {
      const addFieldTemplate = [...template];
      for (const prop in content) {
        if (prop.slice(0, 10) == "other_file") {
          const newField = {
            field: prop,
            element: "file",
            label: content[prop].length > 0 ? content[prop][0].label : "",
            delete: true,
          };
          addFieldTemplate[2].lists.push(newField);
        }
      }
      setTemplate(addFieldTemplate);
    }
  };

  const isFileObject = (obj) => {
    let file = obj[0]?.originFileObj;
    return file instanceof File || file instanceof Blob;
  };
  const uploadReportFileHandler = async (file, field) => {
    if (file.size > uploadFileSize) {
      return notification.error({ message: "Файл не должен превышать 40 мб" });
    }
    const { label } = template[2].lists.filter(
      (item) => item.field === field
    )[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("reportId", reportId);
    formData.append("content", JSON.stringify({ field, label }));
    // after upload file rename from server generated name for example: c9020844-f6a2-4657-8dec-dca254fab141.pdf
    const response = await updateReport(formData);
    const parseData = response.data.content;
    // set object with new name
    form.setFieldsValue({ [field]: parseData[field] });
  };
  const deleteRemoveFile = ({ name }) => {
    removeReportFile({ name });
  };
  const updateReportFieldHandler = (content) => {
    updateReport({
      reportId,
      content,
    });
  };
  const updateField = (content, allvalues) => {
    const contentProperty = Object.keys(content)[0];
    if (isFileObject(allvalues[contentProperty])) {
      const file = allvalues[contentProperty][0].originFileObj;

      uploadReportFileHandler(file, contentProperty);
    } else {
      const newContent = { [contentProperty]: allvalues[contentProperty] };
      updateReportFieldHandler(newContent);
    }
  };
  const setDataFromLastReport = (value) => {
    form.setFieldsValue({
      attachment_2_1: value.attachment_2_1,
    });
    updateReportFieldHandler({ attachment_2_1: value.attachment_2_1 });
  };
  const loadReportFromTemplate = () => {
    confirm({
      title: "Выберите документ",
      width: 700,
      icon: "",
      content: (
        <>
          {isSuccessReportGroupData && (
            <Radio.Group
              onChange={(e) => {
                setDataFromLastReport(e.target.value);
              }}
            >
              <Space direction="vertical">
                {reportGroupData.map((report) => (
                  <Radio value={report.content} key={report.id}>
                    {report.content.listing_period < 5
                      ? `${report.content.listing_period} квартал ${report.content.listing_year}`
                      : `Годовой отчет ${report.content.listing_year}`}{" "}
                    {report.type.title} {report.confirm_date}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          )}
        </>
      ),
      okText: "Cохранить",
      cancelText: "Отмента",
      onOk() {},
    });
  };
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const checkFileSize = ({ file }) => {
    if (file.size > uploadFileSize) {
      return (file.status = "error");
    } else {
      return (file.status = "uploading");
    }
  };
  const setCompanyFields = async () => {
    const company = await getCompanyById(user.companyId);
    const {
      name: issuer_data_full_name,
      opforma: issuer_data_org_legal,
      activity: issuer_data_main_activity,
      address: issuer_data_legal_info,
    } = company.data;

    const companyData = {
      issuer_data_full_name,
      issuer_data_org_legal,
      issuer_data_legal_info,
      issuer_data_main_activity,
    };
    // Листинговый отчет Приложения 2-1 данные компании
    if (reportType == 2) {
      form.setFieldsValue({ attachment_2_1: companyData });
      updateReportFieldHandler({ attachment_2_1: companyData });
    }
    // Приложения 2-1 данные компании
    if (reportType == 1) {
      form.setFieldsValue(companyData);
      updateReportFieldHandler(companyData);
    }
  };
  const setCompanyIdForReport = async (companyId) => {
    await updateCompanyById({reportId, companyId})
  }
  useEffect(() => {
    getReportByGroupType({ type: reportType, reportId });

    if (
      (formType == "add" && reportType == 2) ||
      (formType == "add" && reportType == 1)
    ) {
      setCompanyFields();
    }
  }, []);
  useEffect(() => {
    if (isSuccessGetReportById && isSuccessReportTemplate) {
      setTemplateAndOtherFileFields();
    }
  }, [isSuccessReportTemplate, isSuccessGetReportById, template.length]);

  const back = async () => {
    try {
      if(reportType == 1 || reportType == 2) {
        await form.validateFields();
      }
      navigate("/dashboard/reports");
    } catch (errorInfo) {
      notification.error({message: 'Не все обязательные поля заполнены'})
    }
    
  };

  const printContentRef = useRef();
  const printHandler = useReactToPrint({
    bodyClass: "print-agreement",
    content: () => printContentRef.current,
    documentTitle: `Центр раскрытия информации - ${dataReportType?.title}`,
  });

  

  return (
    <Card
      bordered={false}
      className="criclebox mb-24"
      title={
        <Title level={4}>
          {dataReportById?.company?.name} : {dataReportType?.title}
        </Title>
      }
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
        <Form.Provider>
          <Form
            layout="vertical"
            className="row-col"
            name="basicForm"
            form={form}
            onValuesChange={debounce(updateField, 1000)}
          >
            <Row>
              {
               isAdmin && dataReportById?.statusId == 2 &&
                <Col span={24} className="px-2">
                  <Form.Item
                    name=""
                    label="Выберите компанию"
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
                      options={optionCompanies}
                      optionFilterProp="children"
                      filterOption={(input, opt) =>
                        (opt?.label ?? "").includes(input)
                      }
                      filterSort={(optA, optB) =>
                        (optA?.label ?? "")
                          .toLowerCase()
                          .localeCompare((optB?.label ?? "").toLowerCase())
                      }
                      onChange={setCompanyIdForReport}
                    />
                  </Form.Item>
                </Col>
              }
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
                      {element === "select" && (
                        <>
                          {formType === "view" ? (
                            <Title level={5}>
                              {`${label}: ${
                                options.filter(
                                  (item) =>
                                    item.value == form.getFieldValue(field)
                                )[0]?.label || ""
                              }`}
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
                      {element === "dynamic_textarea" && (
                        <>
                          {formType === "view" ? (
                            <Text style={{ whiteSpace: "pre-wrap" }} level={5}>{`${
                              form.getFieldValue(field) || ""
                            }`}</Text>
                          ) : (
                            <>
                              <Form.Item
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
                                <TextArea rows={5} placeholder="Введите данные" />
                              </Form.Item>
                            </>
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
                                      <Text>{list.value}</Text>
                                    ) : (
                                      <Input
                                        disabled={true}
                                        value={list.value}
                                      />
                                    )}
                                  </Form.Item>
                                )}
                                {list.element === "input" && !list.disabled && (
                                  <Form.Item
                                    name={list.field}
                                    initialValue={list.value}
                                    rules={[
                                      {
                                        required: list.required,
                                        message: 'Поле обязательно'
                                      },
                                    ]}
                                  >
                                    {formType === "view" ? (
                                      <Text>
                                        {form.getFieldValue(list.field)}
                                      </Text>
                                    ) : (
                                      <Input placeholder="Введите данные" /> 
                                    )}
                                  </Form.Item>
                                )}
                                {list.element === "title" && (
                                  <Form.Item>
                                    <Text strong>{list.value}</Text>
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
                      {element === "textarea" && field != "audit_report" && (
                        <Form.Item
                          label={<Title level={5}>{label}</Title>}
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
                          {formType === "view" ? (
                            <>
                              <Text style={{ whiteSpace: "pre-wrap" }}>
                                {form.getFieldValue(field)}
                              </Text>
                              <Divider orientation="left" plain />
                            </>
                          ) : (
                            <TextArea rows={3} placeholder="Введите данные" />
                          )}
                        </Form.Item>
                      )}
                      {element === "textarea" &&
                        form.getFieldValue("period") == 5 &&
                        field == "audit_report" && (
                          <Form.Item
                            label={<Title level={5}>{label}</Title>}
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
                              <Text style={{ whiteSpace: "pre-wrap" }}>
                                {form.getFieldValue(field)}
                              </Text>
                            ) : (
                              <TextArea rows={3} placeholder="Введите данные" />
                            )}
                          </Form.Item>
                        )}
                      {element === "list_group" && (
                        <Row gutter={[16, 16]}>
                          {lists.map((list) => (
                            <Fragment key={list.field}>
                              <Col span={12}>
                                <Text>{list.label}</Text>
                                <Paragraph
                                  type="secondary"
                                  italic
                                  style={{ fontSize: "12px" }}
                                >
                                  {list.note && `(${list.note})`}
                                </Paragraph>
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
                                          onClick={() =>
                                            toggleListingReportModal(
                                              list.field,
                                              true
                                            )
                                          }
                                        >
                                          {formType === "view"
                                            ? "Отчет"
                                            : "Заполнить"}
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
                                    {formType != "view" && (
                                      <Button
                                        icon={<CopyOutlined />}
                                        style={{
                                          width: "200px",
                                          textAlign: "start",
                                        }}
                                        onClick={loadReportFromTemplate}
                                      >
                                        Загрузить из шаблона
                                      </Button>
                                    )}
                                  </Space>
                                )}
                                {list.element === "file" && (
                                  <>
                                    {formType === "view" ? (
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
                                                ?.url
                                            }
                                            target="_blank"
                                          >
                                            {
                                              form.getFieldValue(list.field)[0]
                                                ?.name
                                            }
                                          </Button>
                                        )}
                                      </Space>
                                    ) : (
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
                                            maxCount={1}
                                            listType="picture"
                                            onRemove={deleteRemoveFile}
                                            customRequest={({
                                              file,
                                              onSuccess,
                                            }) => onSuccess("ok")}
                                            onChange={checkFileSize}
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
                                              deleteListingField(
                                                field,
                                                list.field
                                              )
                                            }
                                            danger
                                          >
                                            Удалить поле
                                          </Button>
                                        )}
                                      </Space>
                                    )}
                                  </>
                                )}
                              </Col>
                            </Fragment>
                          ))}
                          {formType != "view" && (
                            <>
                              <Col span={12}>
                                <Input
                                  placeholder="Введите название"
                                  onChange={(e) =>
                                    setListingField(e.target.value)
                                  }
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
                            </>
                          )}
                        </Row>
                      )}
                    </Col>
                  )
                )}
            </Row>

            <Row justify="space-between" align="middle">
              <Col className="px-2">
                {edsData && (
                  <Popover
                    placement="topLeft"
                    content={<EdsCert data={edsData} type={edsType} />}
                  >
                    <Button type="dashed" icon={<SafetyCertificateOutlined />}>
                      Подписан ЭЦП: {edsData.commonName}
                    </Button>
                  </Popover>
                )}
              </Col>
              {formType != "view" && (
                <Col className="px-2">
                  <Space>
                    <Button onClick={back}>Назад</Button>
                    <Button
                      type="primary"
                      icon={<SaveOutlined />}
                      style={{
                        ...btnStyle,
                      }}
                      onClick={back}
                    >
                      {formType === "add" ? "Сохранить" : "Обновить"}
                    </Button>
                  </Space>
                </Col>
              )}
            </Row>
          </Form>
        </Form.Provider>
      </div>
    </Card>
  );
};

export default ReportForm;
