import {
  Row,
  Col,
  Card,
  Table,
  Avatar,
  Button,
  Typography,
  Modal,
  Form,
  Space,
  Input,
  Tooltip,
  Spin,
} from "antd";
import {
  PlusOutlined,
  FormOutlined,
  DeleteOutlined,
  BankOutlined,
  ExclamationCircleOutlined,
  SearchOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";

import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  useGetCompaniesQuery,
  useRemoveCompanyMutation,
} from "../../../store/services/company-service";
import { Fragment, useState, useEffect } from "react";

// через класс или id не работает стили так как шаблон стили загружает динамически
const btnStyle = {
  background: "#57b6c0",
  borderColor: "#57b6c0",
};

const { Paragraph, Title, Text } = Typography;
const { confirm } = Modal;
const FILTERS_STORAGE_KEY = "companiesListFilters";
const pageSizeOptions = [5, 10, 20];

const parseId = (value) => {
  if (value == null || value === "") return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const readStoredFilters = () => {
  try {
    const raw = sessionStorage.getItem(FILTERS_STORAGE_KEY);
    return raw ? new URLSearchParams(raw) : null;
  } catch {
    return null;
  }
};

const writeStoredFilters = (params) => {
  try {
    const value = params.toString();
    if (value) {
      sessionStorage.setItem(FILTERS_STORAGE_KEY, value);
    } else {
      sessionStorage.removeItem(FILTERS_STORAGE_KEY);
    }
  } catch {
    // ignore storage errors
  }
};

const columns = [
  {
    title: "Название компании",
    dataIndex: "name",
    key: "name",
    width: "55%",
  },
  {
    title: "Отчеты",
    dataIndex: "reportsCount",
    key: "reportsCount",
    width: "10%",
    align: "center",
  },
  {
    title: "OI",
    dataIndex: "oi",
    key: "oi",
    width: "10%",
    align: "center",
  },
  {
    title: "Листинг",
    dataIndex: "listing",
    key: "listing",
    width: "10%",
    align: "center",
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
  const [searchParams, setSearchParams] = useSearchParams();
  const pageSize = parseId(searchParams.get("limit")) || 10;
  const currentPage = parseId(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";
  const [searchInput, setSearchInput] = useState(search);

  useEffect(() => {
    if ([...searchParams.keys()].length > 0) {
      writeStoredFilters(searchParams);
      return;
    }

    const stored = readStoredFilters();
    if (stored && [...stored.keys()].length > 0) {
      setSearchParams(stored, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  const updateSearchParams = (patch) => {
    const next = new URLSearchParams(searchParams);

    Object.entries(patch).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") {
        next.delete(key);
      } else {
        next.set(key, String(value));
      }
    });

    writeStoredFilters(next);
    setSearchParams(next, { replace: true });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput === search) return;
      updateSearchParams({
        search: searchInput || undefined,
        page: 1,
      });
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const getUsersHandler = (page, limit) => {
    updateSearchParams({ page, limit });
  };

  const { data, isSuccess, isLoading, isFetching } = useGetCompaniesQuery({
    page: currentPage,
    limit: pageSize,
    search: search || undefined,
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
              <Text
                type="secondary"
                style={{
                  display: "block",
                  maxWidth: "520px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {company.activity.length > 100
                  ? company.activity.slice(0, 100) + "..."
                  : company.activity}
              </Text>
            </Tooltip>
          </div>
        </Avatar.Group>
      ),
      reportsCount: Number(company.reportsCount || 0),
      oi: company.hasOi ? (
        <CheckCircleFilled style={{ color: "#52c41a", fontSize: 18 }} />
      ) : (
        "-"
      ),
      listing: company.hasListing ? (
        <CheckCircleFilled style={{ color: "#52c41a", fontSize: 18 }} />
      ) : (
        "-"
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
                <Space size={12}>
                  <Input
                    placeholder="Поиск по названию"
                    prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    allowClear
                    style={{ width: 280 }}
                  />
                  <Link to="/dashboard/companies/add">
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      style={{ ...btnStyle }}
                    >
                      Добавить компанию
                    </Button>
                  </Link>
                </Space>
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
