import {
  Row,
  Col,
  Card,
  Table,
  Avatar,
  Button,
  Typography,
  Dropdown,
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

const { Title } = Typography;

const columns = [
  {
    title: "Пользователь",
    dataIndex: "firstName",
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

function Users() {
  const { data, isSuccess } = useGetUsersQuery("");
  const navigate = useNavigate();
  const users =
    isSuccess &&
    data.map((user) => ({
      key: user.id,
      firstName: (
        <>
          <Avatar.Group>
            <Avatar
              className="shape-avatar"
              shape="square"
              size={40}
              icon={<UserOutlined />}
            ></Avatar>
            <div className="avatar-info">
              <Title level={5}>{user.firstName}</Title>
            </div>
          </Avatar.Group>
        </>
      ),
      name: (
        <div className="author-info">
          <p>{user.company.name}</p>
        </div>
      ),
      action: (
        <Dropdown
          menu={{
            items,
            onClick: (event) => onAction(event.key, user.id),
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
              title="Пользователи"
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
                    Добавить
                  </Button>
                </Link>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={users}
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
}

export default Users;
