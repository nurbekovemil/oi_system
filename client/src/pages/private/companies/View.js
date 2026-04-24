import { useState } from "react";
import {
  Card,
  Typography,
  Button,
  Table,
  Avatar,
  Space,
  Tooltip,
  Modal,
  Form,
  Input,
  Select,
  Popconfirm,
  message,
} from "antd";
import { useParams, Link } from "react-router-dom";
import {
  SolutionOutlined,
  TeamOutlined,
  ProjectOutlined,
  LinkOutlined,
  FormOutlined,
  PlusOutlined,
  DeleteOutlined,
  FileTextOutlined,
  UserOutlined,
} from "@ant-design/icons";

import {
  useGetCompanyByIdQuery,
  useGetCompanyOiKseLinksQuery,
  useCreateCompanyOiKseLinkMutation,
  useUpdateCompanyOiKseLinkMutation,
  useRemoveCompanyOiKseLinkMutation,
} from "../../../store/services/company-service";
import { useGetReportsQuery } from "../../../store/services/report-service";
import { useGetUsersQuery } from "../../../store/services/user-service";
import AboutCompany from "../../../components/company/AboutCompany";
const { Title } = Typography;

const usersColumns = [
  {
    title: "Логин пользователя",
    dataIndex: "login",
    key: "login",
  },
];

const reportsColumns = [
  {
    title: "Документ",
    dataIndex: "report",
    key: "report",
  },
  {
    title: "Статус",
    dataIndex: "status",
    key: "status",
    width: "30%",
  },
];

const linksColumns = [
  {
    title: "Тип связки",
    dataIndex: "type",
    key: "type",
    width: "30%",
  },
  {
    title: "ID OI",
    dataIndex: "oi_company_id",
    key: "oi_company_id",
    width: "35%",
  },
  {
    title: "ID KSE",
    dataIndex: "kse_company_id",
    key: "kse_company_id",
    width: "25%",
  },
  {
    title: "Действие",
    dataIndex: "action",
    key: "action",
    width: "20%",
  },
];

const CompanyView = () => {
  const { id } = useParams();
  const { data, isSuccess } = useGetCompanyByIdQuery(id);
  const { data: companyLinksData } = useGetCompanyOiKseLinksQuery(id);
  const [createCompanyOiKseLink] = useCreateCompanyOiKseLinkMutation();
  const [updateCompanyOiKseLink] = useUpdateCompanyOiKseLinkMutation();
  const [removeCompanyOiKseLink] = useRemoveCompanyOiKseLinkMutation();
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState(null);
  const [linkForm] = Form.useForm();
  const { data: usersData } = useGetUsersQuery({
    page: 1,
    limit: 100,
    companyId: id,
  });
  const { data: reportsData } = useGetReportsQuery({
    page: 1,
    limit: 100,
    companyId: id,
  });

  const tabList = [
    {
      key: "about",
      tab: (
        <span>
          <SolutionOutlined />
          Профиль компании
        </span>
      ),
    },
    {
      key: "employees",
      tab: (
        <span>
          <TeamOutlined />
          Пользователи
        </span>
      ),
    },
    {
      key: "reports",
      tab: (
        <span>
          <ProjectOutlined />
          Отчеты
        </span>
      ),
    },
    {
      key: "links",
      tab: (
        <span>
          <LinkOutlined />
          Связка OI/KSE
        </span>
      ),
    },
  ];

  const users =
    usersData?.rows?.map((user) => ({
      key: user.id,
      login: (
        <Avatar.Group>
          <Avatar
            className="shape-avatar"
            shape="square"
            size={32}
            icon={<UserOutlined />}
            style={{ backgroundColor: "#57b6c0" }}
          />
          <div className="avatar-info">
            <Link to={`/dashboard/users/view/${user.id}`}>{user.login}</Link>
          </div>
        </Avatar.Group>
      ),
    })) || [];

  const reports =
    reportsData?.rows?.map((report) => ({
      key: report.id,
      report: (
        <Avatar.Group>
          <Avatar
            className="shape-avatar"
            shape="square"
            size={32}
            style={{ backgroundColor: "#57b6c0" }}
            icon={<FileTextOutlined />}
          />
          <div className="avatar-info">
            <Tooltip title={report.type.title} placement="right">
              <Link
                to={`/dashboard/reports/view/${report.type.id}/${report.type.tempId}/${report.id}`}
              >
                {report.type.title}
              </Link>
            </Tooltip>
          </div>
        </Avatar.Group>
      ),
      status: report.status?.title || "-",
    })) || [];
  const onCreateLink = () => {
    setEditingLink(null);
    linkForm.resetFields();
    setIsLinkModalOpen(true);
  };

  const onEditLink = (item) => {
    setEditingLink(item);
    linkForm.setFieldsValue({
      type: item.type,
      kse_company_id: item.kse_company_id,
    });
    setIsLinkModalOpen(true);
  };

  const onDeleteLink = async (linkId) => {
    try {
      await removeCompanyOiKseLink({
        companyId: Number(id),
        linkId,
      }).unwrap();
      message.success("Связка удалена");
    } catch (e) {
      message.error(e?.data?.message || "Ошибка удаления связки");
    }
  };

  const onSaveLink = async () => {
    try {
      const values = await linkForm.validateFields();
      const payload = {
        companyId: Number(id),
        kse_company_id: Number(values.kse_company_id),
        type: values.type,
      };
      if (editingLink?.id) {
        await updateCompanyOiKseLink({
          ...payload,
          linkId: editingLink.id,
        }).unwrap();
        message.success("Связка обновлена");
      } else {
        await createCompanyOiKseLink(payload).unwrap();
        message.success("Связка добавлена");
      }
      setIsLinkModalOpen(false);
      setEditingLink(null);
      linkForm.resetFields();
    } catch (e) {
      if (e?.errorFields) return;
      message.error(e?.data?.message || "Ошибка сохранения связки");
    }
  };

  const contentList = {
    about: <AboutCompany data={data} />,
    employees: (
      <>
        <Space align="center" style={{ marginLeft: "24px" }}>
          <Title level={5}>Пользователи: {usersData?.count || 0}</Title>
        </Space>
        <Table
          columns={usersColumns}
          dataSource={users}
          className="ant-border-space"
          locale={{ emptyText: "Пусто" }}
          pagination={false}
        />
      </>
    ),
    reports: (
      <>
        <Space align="center" style={{ marginLeft: "24px" }}>
          <Title level={5}>Отчеты: {reportsData?.count || 0}</Title>
        </Space>
        <Table
          columns={reportsColumns}
          dataSource={reports}
          className="ant-border-space"
          locale={{ emptyText: "Пусто" }}
          pagination={false}
        />
      </>
    ),
    links: (
      <>
        <Space
          align="center"
          style={{ marginLeft: "24px", marginBottom: "12px" }}
          size={12}
        >
          <Title level={5}>Связки: {companyLinksData?.length || 0}</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={onCreateLink}
            style={{ background: "#57b6c0", borderColor: "#57b6c0" }}
          >
            Добавить
          </Button>
        </Space>
        <Table
          columns={linksColumns}
          dataSource={(companyLinksData || []).map((item) => ({
            key: item.id,
            type: item.type === "listing" ? "Listing" : "OI",
            oi_company_id: item.oi_company_id,
            kse_company_id: item.kse_company_id,
            action: (
              <Space>
                <Button
                  type="primary"
                  icon={<FormOutlined />}
                  style={{ background: "#ffa940", borderColor: "#ffa940" }}
                  onClick={() => onEditLink(item)}
                >
                  Изменить
                </Button>
                <Popconfirm
                  title="Удалить связку?"
                  okText="Удалить"
                  cancelText="Отмена"
                  onConfirm={() => onDeleteLink(item.id)}
                >
                  <Button danger icon={<DeleteOutlined />}>
                    Удалить
                  </Button>
                </Popconfirm>
              </Space>
            ),
          }))}
          className="ant-border-space"
          locale={{ emptyText: "Пусто" }}
          pagination={false}
        />
        <Modal
          title={editingLink ? "Изменить связку" : "Добавить связку"}
          open={isLinkModalOpen}
          onOk={onSaveLink}
          onCancel={() => {
            setIsLinkModalOpen(false);
            setEditingLink(null);
            linkForm.resetFields();
          }}
          okText="Сохранить"
          cancelText="Отмена"
        >
          <Form form={linkForm} layout="vertical">
            <Form.Item
              label="Тип связки"
              name="type"
              rules={[{ required: true, message: "Выберите тип" }]}
            >
              <Select
                options={[
                  { value: "oi", label: "OI" },
                  { value: "listing", label: "Listing" },
                ]}
                placeholder="Выберите тип"
              />
            </Form.Item>
            <Form.Item
              label="ID компании (внешняя KSE)"
              name="kse_company_id"
              rules={[{ required: true, message: "Введите ID" }]}
            >
              <Input placeholder="Например: 173" />
            </Form.Item>
          </Form>
        </Modal>
      </>
    ),
  };
  const [activeTab, setActiveTab] = useState("about");
  const onTabChange = (key) => {
    setActiveTab(key);
  };
  return (
    <>
      {isSuccess && (
        <Card
          bordered={false}
          className="criclebox mb-24"
          tabList={tabList}
          activeTabKey={activeTab}
          onTabChange={(key) => {
            onTabChange(key);
          }}
          extra={
            <Link to={`/dashboard/companies/upd/${data.id}`}>
              <Button
                type="primary"
                icon={<FormOutlined />}
                style={{
                  background: "#57b6c0",
                  borderColor: "#57b6c0",
                }}
              >
                Изменить
              </Button>
            </Link>
          }
          title={<Title level={4}>Информация о компании</Title>}
        >
          {contentList[activeTab]}
        </Card>
      )}
    </>
  );
};

export default CompanyView;
