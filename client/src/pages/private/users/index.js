import {
  Row,
  Col,
  Card,
  Table,
  Avatar,
  Button,
  Typography,
  Space,
  Tooltip,
  Spin,
  Input,
} from "antd";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  PlusOutlined,
  UserOutlined,
  FormOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useGetUsersQuery } from "../../../store/services/user-service";
import { Fragment, useState, useEffect } from "react";

const { Title, Text } = Typography;
// через класс или id не работает стили так как шаблон стили загружает динамически
const btnStyle = {
  background: "#57b6c0",
  borderColor: "#57b6c0",
};
const FILTERS_STORAGE_KEY = "usersListFilters";
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
    title: "Компания",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Логин пользователя",
    dataIndex: "login",
    key: "user",
    width: "30%",
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
  // {
  //   key: "delete",
  //   label: "Удалить",
  //   icon: <DeleteOutlined />,
  //   description: "Удалить пользователя",
  //   color: "#ff7a45",
  // },
];

function Users() {
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

  const { data, isSuccess, isLoading, isFetching } = useGetUsersQuery({
    page: currentPage,
    limit: pageSize,
    search: search || undefined,
  });

  const navigate = useNavigate();
  const users =
    isSuccess &&
    data?.rows.map((user) => ({
      key: user.id,
      name: (
        <>
          <Avatar.Group>
            <Avatar
              className="shape-avatar"
              shape="square"
              size={40}
              icon={<UserOutlined />}
              style={{
                backgroundColor: "#57b6c0",
              }}
            ></Avatar>
            <div className="avatar-info">
              <Link to={`/dashboard/companies/view/${user.company.id}`}>
                {user?.company?.name.length > 50
                  ? user?.company?.name.slice(0, 50) + "..."
                  : user?.company?.name}
              </Link>
            </div>
          </Avatar.Group>
        </>
      ),
      login: <Link to={`/dashboard/users/view/${user.id}`}>{user.login}</Link>,
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
                  onClick={() => onAction(action.key, user.id)}
                >
                  {action.label}
                </Button>
              </Tooltip>
            </Fragment>
          ))}
        </Space>
      ),
    }));
  const onAction = (key, id) => {
    if (key === "view") {
      navigate(`/dashboard/users/view/${id}`);
    }
    if (key === "upd") {
      navigate(`/dashboard/users/upd/${id}`);
    }
    if (key === "delete") {
      // deleteCompany(id);
    }
  };
  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Список пользователей"
              extra={
                <Space size={12}>
                  <Input
                    placeholder="Поиск по логину или компании"
                    prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    allowClear
                    style={{ width: 300 }}
                  />
                  <Link to="/dashboard/users/add">
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      style={{ ...btnStyle }}
                    >
                      Добавить пользователя
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
                    dataSource={users}
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
}

export default Users;
