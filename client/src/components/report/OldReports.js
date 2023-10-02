import { Table, Avatar, Typography, Tag, Spin, Button } from "antd";
import {
  CheckCircleOutlined,
  SyncOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { useGetOldReportsQuery } from "../../store/services/report-service";

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

function OldReports() {
  const {
    data: dataReports,
    isSuccess: isSuccessReports,
    isLoading: isLoadingReports,
  } = useGetOldReportsQuery();
  const reports =
    isSuccessReports &&
    dataReports.map((report) => ({
      key: report.id,
      report: (
        <>
          <Avatar.Group>
            <Avatar className="shape-avatar" shape="square" size={40}></Avatar>
            <div className="avatar-info">
              <Title level={5}>{report.company_name}</Title>
              <p>
                {report.typedoc.length > 35
                  ? report.typedoc.slice(0, 35) + "..."
                  : report.typedoc}
              </p>
            </div>
          </Avatar.Group>
        </>
      ),
      date: (
        <>
          <div className="author-info">
            <p>
              {report.datasend}/{report.confirmdate}
            </p>
          </div>
        </>
      ),
      status: (
        <>
          <StatusTag type={"confirm"} title={"принят"} />
        </>
      ),
      action: (
        <>
          <Button
            type="link"
            href={`http://www.kse.kg/${
              report.type == 2
                ? `files/BusinessReports/${report.linkkse}`
                : report.type == 1
                ? "ru/Listing"
                : `ru/RussianAllNewsBlog/${report.linkkse}`
            }`}
            target="_blank"
          >
            Посмотреть
          </Button>
        </>
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

export default OldReports;
