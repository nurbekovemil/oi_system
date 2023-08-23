import {
  Row,
  Col,
  Card,
  Table,
  Avatar,
  Button,
  Typography,
  Tag,
  Spin,
  Dropdown,
} from "antd";
import {
  CheckCircleOutlined,
  SyncOutlined,
  PlusOutlined,
  ClockCircleOutlined,
  BarsOutlined,
  FormOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useGetReportsQuery } from "../../store/services/report-service";

const { Title } = Typography;

const StatusTag = ({ type, title }) => {
  const statusToTag = {
    confirm: { icon: <CheckCircleOutlined />, color: "success" },
    processing: { icon: <SyncOutlined spin />, color: "processing" },
    saved: { icon: <ClockCircleOutlined />, color: "default" },
  };

  const tagData = statusToTag[type] || { icon: null, color: "default" };

  return (
    <Tag icon={tagData.icon} color={tagData.color}>
      {title}
    </Tag>
  );
};

const columns = [
  {
    title: "Документ",
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
    width: "15%",
    align: "center",
  },
];

const items = [
  {
    key: "upd",
    label: "Изменить",
    icon: <FormOutlined />,
  },
];
function NewReports() {
  const navigate = useNavigate();
  const {
    data: dataReports,
    isSuccess: isSuccessReports,
    isLoading: isLoadingReports,
  } = useGetReportsQuery();

  const onAction = (key, id, reportType, tempId) => {
    if (key === "upd") {
      navigate(`/dashboard/reports/upd/${reportType}/${tempId}/${id}`);
    }
  };
  const reports =
    isSuccessReports &&
    dataReports.map((report) => ({
      key: report.id,
      report: (
        <>
          <Avatar.Group>
            <Avatar className="shape-avatar" shape="square" size={40}></Avatar>
            <div className="avatar-info">
              <Title level={5}>{report.company.name}</Title>
              <p>{report.type.title}</p>
            </div>
          </Avatar.Group>
        </>
      ),
      date: (
        <>
          <div className="author-info">
            <p>
              {report.sendDate}/{report.confirmDate}
            </p>
          </div>
        </>
      ),
      status: (
        <>
          <StatusTag type={report.status.type} title={report.status.title} />
        </>
      ),
      action: (
        <Dropdown
          menu={{
            items,
            onClick: (event) =>
              onAction(
                event.key,
                report.id,
                report.type.id,
                report.type.tempId
              ),
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
  return (
    <>
      {isLoadingReports ? (
        <div
          style={{ padding: "16px 25px" }}
          className="d-flex justify-content-center"
        >
          <Spin />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={reports}
          pagination={false}
          className="ant-border-space"
        />
      )}
    </>
  );
}

export default NewReports;
