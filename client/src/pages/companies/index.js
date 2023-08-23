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
import { useState } from "react";
const { Paragraph, Title, Text } = Typography;
const { confirm } = Modal;

const columns = [
  {
    title: "Название компании",
    dataIndex: "name",
    key: "name",
    width: "25%",
  },
  {
    title: "Пользователи",
    dataIndex: "users",
    key: "users",
    width: "25%",
  },

  {
    title: "Отчеты",
    key: "reports",
    dataIndex: "reports",
    width: "25%",
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
    key: "view",
    label: "Посмотреть",
    icon: <EyeOutlined />,
  },
  {
    key: "upd",
    label: "Изменить",
    icon: <FormOutlined />,
  },
  {
    key: "delete",
    label: "Удалить",
    danger: true,
    icon: <DeleteOutlined />,
  },
];

const Companies = () => {
  const [form] = Form.useForm();
  const { data, isSuccess } = useGetCompaniesQuery("");
  const [removeCompany, {}] = useRemoveCompanyMutation();
  const [confirmPassword, setConfirmPassword] = useState();
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
    data.map((company) => ({
      key: company.id,
      name: (
        <Avatar.Group>
          <Avatar
            className="shape-avatar"
            shape="square"
            size={40}
            icon={<BankOutlined />}
          ></Avatar>
          <div className="avatar-info">
            <Title level={5}>{company.name}</Title>
            <Paragraph>{company.activity}</Paragraph>
          </div>
        </Avatar.Group>
      ),
      users: (
        <div className="author-info">
          <p>{company.countUsers}</p>
        </div>
      ),
      reports: (
        <div className="author-info">
          <p>{company.countReports}</p>
        </div>
      ),
      action: (
        <Dropdown
          menu={{
            items,
            onClick: (event) => onAction(event.key, company.id),
          }}
          placement="bottomRight"
        >
          <Button
            type="link"
            icon={<BarsOutlined />}
            style={{
              width: "100%",
            }}
          >
            Действие
          </Button>
        </Dropdown>
      ),
    }));

  const deleteCompany = (companyId) => {
    confirm({
      width: 500,
      title: "Вы уверены, что хотите удалить эту компнию?",
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
              title="Компании"
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
                <Table
                  columns={columns}
                  dataSource={companies}
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Companies;
