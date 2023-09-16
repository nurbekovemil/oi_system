import {
  Row,
  Col,
  Card,
  Table,
  Avatar,
  Button,
  Typography,
  Dropdown,
  Modal,
  Form,
  Space,
  Input,
  Tooltip,
  Spin,
} from "antd";
import {
  BarsOutlined,
  PlusOutlined,
  FormOutlined,
  DeleteOutlined,
  EyeOutlined,
  BankOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

import { Link, useNavigate } from "react-router-dom";
import {
  useGetCompaniesQuery,
  useRemoveCompanyMutation,
} from "../../store/services/company-service";
import { Fragment, useState } from "react";
const { Paragraph, Title, Text } = Typography;
const { confirm } = Modal;

const columns = [
  {
    title: "Название компании",
    dataIndex: "name",
    key: "name",
    width: "85%",
  },
  {
    title: "Действие",
    key: "action",
    dataIndex: "action",
    width: "15%",
    align: "center",
  },
];

const items = [
  {
    key: "upd",
    label: "Изменить",
    icon: <FormOutlined />,
    description: "Изменить пользователя",
    color: "#ffa940",
  },
  {
    key: "delete",
    label: "Удалить",
    danger: true,
    icon: <DeleteOutlined />,
    description: "Удалить пользователя",
    color: "#ff7a45",
  },
];

const Companies = () => {
  const [form] = Form.useForm();

  const pageSizeOptions = [5, 10, 20];
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const getUsersHandler = (page, limit) => {
    setCurrentPage(page);
    setPageSize(limit);
  };

  const { data, isSuccess, isLoading, isFetching } = useGetCompaniesQuery({
    page: currentPage,
    limit: pageSize,
  });

  const [removeCompany, {}] = useRemoveCompanyMutation();
  const navigate = useNavigate();
  const onAction = (key, id) => {
    if (key === "view") {
      navigate(`/dashboard/companies/view/${id}`);
    }
    if (key === "upd") {
      navigate(`/dashboard/companies/upd/${id}`);
    }
    if (key === "delete") {
      deleteCompany(id);
    }
  };
  const companies =
    isSuccess &&
    data?.rows.map((company) => ({
      key: company.id,
      name: (
        <Avatar.Group>
          <Avatar
            className="shape-avatar"
            shape="square"
            size={40}
            icon={<BankOutlined />}
            style={{
              backgroundColor: "#57b6c0",
            }}
          ></Avatar>
          <div className="avatar-info">
            <Tooltip title={company.name} placement="right">
              <Title level={5}>
                <Link to={`/dashboard/companies/view/${company.id}`}>
                  {company.name.length > 50
                    ? company.name.slice(0, 50) + "..."
                    : company.name}
                </Link>
              </Title>
            </Tooltip>
            <Tooltip title={company.activity} placement="right">
              <Text type="secondary">
                {company.activity.length > 100
                  ? company.activity.slice(0, 100) + "..."
                  : company.activity}
              </Text>
            </Tooltip>
          </div>
        </Avatar.Group>
      ),
      action: (
        <Space>
          {items.map((action) => (
            <Fragment key={action.key}>
              <Tooltip title={action.description}>
                <Button
                  type="primary"
                  icon={action.icon}
                  style={{
                    background: action.color,
                    borderColor: action.color,
                    width: "120px",
                  }}
                  onClick={() => onAction(action.key, company.id)}
                >
                  {action.label}
                </Button>
              </Tooltip>
            </Fragment>
          ))}
        </Space>
      ),
    }));

  const deleteCompany = (companyId) => {
    confirm({
      width: 500,
      title: "Вы уверены, что хотите удалить компнию?",
      icon: <ExclamationCircleOutlined />,
      content: (
        <>
          <Space direction="vertical">
            <Text>
              Будет удалено все данные, пользователи и отчеты компании!
            </Text>
            <Form form={form}>
              <Form.Item name="confirmPassword">
                <Input placeholder="Введите пароль для подтверждения" />
              </Form.Item>
            </Form>
          </Space>
        </>
      ),
      okText: "Удалить",
      okButtonProps: {
        type: "primary",
        style: {
          background: "#57b6c0",
          borderColor: "#57b6c0",
        },
      },
      cancelText: "Отмена",
      onOk() {
        removeCompany({
          companyId,
          confirmPassword: form.getFieldsValue().confirmPassword,
        });
      },
    });
  };
  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Список компаний"
              extra={
                <Link to="/dashboard/companies/add">
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    style={{
                      background: "#57b6c0",
                      borderColor: "#57b6c0",
                    }}
                  >
                    Добавить компанию
                  </Button>
                </Link>
              }
            >
              <div className="table-responsive">
                {isLoading || isFetching ? (
                  <div
                    style={{ padding: "16px 25px" }}
                    className="d-flex justify-content-center"
                  >
                    <Spin />
                  </div>
                ) : (
                  <Table
                    columns={columns}
                    dataSource={companies}
                    className="ant-border-space"
                    pagination={{
                      pageSize,
                      total: data?.count,
                      pageSizeOptions,
                      current: currentPage,
                      locale: {
                        items_per_page: " показано",
                      },
                      position: "bottomRight",
                      onChange: (page, pageSize) =>
                        getUsersHandler(page, pageSize),
                    }}
                  />
                )}
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Companies;
