import { Table, Avatar, Typography, Tag, Spin, Button } from "antd";
import {
  CheckCircleOutlined,
  SyncOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useGetOldReportsQuery } from "../../store/services/report-service";

const { Title, Text } = Typography;

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
    width: "10%",
  },
  {
    title: "Дата отправки / принятия",
    dataIndex: "date",
    key: "date",
    width: "20%",
  },

  {
    title: "Статус",
    key: "status",
    dataIndex: "status",
    width: "10%",
  },
  // {
  //   title: "Действие",
  //   key: "action",
  //   dataIndex: "action",
  // },
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
            <Avatar
              className="shape-avatar"
              shape="square"
              size={40}
              style={{
                backgroundColor: "#57b6c0",
              }}
              icon={<FileTextOutlined />}
            ></Avatar>
            <div className="avatar-info">
              <Title level={5}>
                <a
                  target="_blank"
                  href={`http://www.kse.kg/${
                    report.type == 2
                      ? `files/BusinessReports/${report.linkkse}`
                      : report.type == 1
                      ? "ru/Listing"
                      : `ru/RussianAllNewsBlog/${report.linkkse}`
                  }`}
                >
                  {report.company_name}
                </a>
              </Title>
              <Text type="secondary">
                {report.typedoc.length > 35
                  ? report.typedoc.slice(0, 35) + "..."
                  : report.typedoc}
              </Text>
            </div>
          </Avatar.Group>
        </>
      ),
      date: (
        <>
          <div className="author-info">
            <p>
              {report.datesend} | {report.confirmdate}
            </p>
          </div>
        </>
      ),
      status: (
        <>
          <StatusTag type={"confirm"} title={"принят"} />
        </>
      ),
      // action: (
      //   <>
      //     <Button
      //       type="link"
      //       href={`http://www.kse.kg/${
      //         report.type == 2
      //           ? `files/BusinessReports/${report.linkkse}`
      //           : report.type == 1
      //           ? "ru/Listing"
      //           : `ru/RussianAllNewsBlog/${report.linkkse}`
      //       }`}
      //       target="_blank"
      //     >
      //       Посмотреть
      //     </Button>
      //   </>
      // ),
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
          className="ant-border-space"
        />
      )}
    </>
  );
}

export default OldReports;
