import {
  Row,
  Col,
  Card,
  Radio,
  Table,
  Avatar,
  Button,
  Typography,
  Tag,
} from "antd";
import {
  CheckCircleOutlined,
  SyncOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

const { Title } = Typography;

const columns = [
  {
    title: "Тип отчета",
    dataIndex: "report",
    key: "report",
    width: "32%",
  },
  {
    title: "Дата",
    dataIndex: "date",
    key: "date",
  },

  {
    title: "Статус",
    key: "status",
    dataIndex: "status",
  },
  {
    title: "Действие",
    key: "action",
    dataIndex: "action",
  },
];

const data = [
  {
    key: "1",
    report: (
      <>
        <Avatar.Group>
          <Avatar className="shape-avatar" shape="square" size={40}></Avatar>
          <div className="avatar-info">
            <Title level={5}>ОАО Банк "Бай-Тушум"</Title>
            <p>Существенный факт</p>
          </div>
        </Avatar.Group>
      </>
    ),
    date: (
      <>
        <div className="author-info">
          <p>23-04-2023/24-04-2023</p>
        </div>
      </>
    ),
    status: (
      <>
        <Tag icon={<CheckCircleOutlined />} color="success">
          принят
        </Tag>
      </>
    ),
    action: (
      <>
        <h1>edit</h1>
      </>
    ),
  },
  {
    key: "1",
    report: (
      <>
        <Avatar.Group>
          <Avatar className="shape-avatar" shape="square" size={40}></Avatar>
          <div className="avatar-info">
            <Title level={5}>ОАО Банк "Бай-Тушум"</Title>
            <p>Существенный факт</p>
          </div>
        </Avatar.Group>
      </>
    ),
    date: (
      <>
        <div className="author-info">
          <p>23-04-2023/24-04-2023</p>
        </div>
      </>
    ),
    status: (
      <>
        <Tag icon={<SyncOutlined spin />} color="processing">
          обработка
        </Tag>
      </>
    ),
    action: (
      <>
        <h1>edit</h1>
      </>
    ),
  },
];

function Reports() {
  const onChange = (e) => console.log(`radio checked:${e.target.value}`);

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Отчеты"
              extra={
                <Link to="/dashboard/reports/add">
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
                  dataSource={data}
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

export default Reports;
