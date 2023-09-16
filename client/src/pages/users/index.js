import {
  Row,
  Col,
  Card,
  Table,
  Avatar,
  Button,
  Typography,
  Dropdown,
  Space,
  Tooltip,
  Spin,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  PlusOutlined,
  UserOutlined,
  FormOutlined,
  DeleteOutlined,
  EyeOutlined,
  BarsOutlined,
} from "@ant-design/icons";
import { useGetUsersQuery } from "../../store/services/user-service";
import { Fragment, useState } from "react";

const { Title, Text } = Typography;

const columns = [
  {
    title: "Логин пользователя",
    dataIndex: "login",
    key: "user",
    width: "30%",
  },
  {
    title: "Компания",
    dataIndex: "name",
    key: "name",
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
    icon: <DeleteOutlined />,
    description: "Удалить пользователя",
    color: "#ff7a45",
  },
];

function Users() {
  const pageSizeOptions = [5, 10, 20];
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const getUsersHandler = (page, limit) => {
    setCurrentPage(page);
    setPageSize(limit);
  };

  const { data, isSuccess, isLoading, isFetching } = useGetUsersQuery({
    page: currentPage,
    limit: pageSize,
  });

  const navigate = useNavigate();
  const users =
    isSuccess &&
    data?.rows.map((user) => ({
      key: user.id,
      login: (
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
              <Link to={`/dashboard/users/view/${user.id}`}>{user.login}</Link>
            </div>
          </Avatar.Group>
        </>
      ),
      name: (
        <Link to={`/dashboard/companies/view/${user.company.id}`}>
          {user?.company?.name.length > 50
            ? user?.company?.name.slice(0, 50) + "..."
            : user?.company?.name}
        </Link>
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
                <Link to="/dashboard/users/add">
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    style={{
                      background: "#57b6c0",
                      borderColor: "#57b6c0",
                    }}
                  >
                    Добавить пользователя
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
