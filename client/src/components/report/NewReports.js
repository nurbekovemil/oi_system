import {
  Table,
  Avatar,
  Button,
  Typography,
  Spin,
  Space,
  Tooltip,
  Popover,
  Descriptions,
  Popconfirm,
  message,
  Modal,
} from "antd";
import {
  FormOutlined,
  DeleteOutlined,
  SafetyOutlined,
  FileTextOutlined,
  CloseOutlined,
  SendOutlined,
  AuditOutlined,
  SafetyCertificateOutlined,
  CheckOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import {
  useGetReportsQuery,
  useRejectReportMutation,
  useRemoveReportMutation,
  useSendReportMutation,
} from "../../store/services/report-service";
import { StatusTag } from "./StatusTag";
import moment from "moment";
import { Fragment, useState } from "react";
import EdsCert from "../eds/EdsCert";
import { useSelector } from "react-redux";
// import { isRejected } from "@reduxjs/toolkit";
const { Title, Text } = Typography;
const { confirm } = Modal;

const columns = [
  {
    title: "Документ",
    dataIndex: "report",
    key: "report",
    width: "25%",
  },
  {
    title: "Дата отправки/принятия",
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
  {
    title: "ЭЦП",
    dataIndex: "eds",
    key: "eds",
    width: "10%",
  },
  {
    title: "Действие",
    key: "action",
    dataIndex: "action",
    width: "35%",
    align: "start",
  },
];

const items = [
  {
    key: "send",
    label: "Отправить",
    icon: <SendOutlined />,
    description: "Отправить документ",
    color: "#57b6c0",
    status: [5],
    roles: ["USER"],
  },
  {
    key: "sign",
    label: "Подписать",
    icon: <SafetyOutlined />,
    description: "Подписать документ",
    color: "#40a9ff",
    status: [1, 3],
    roles: ["USER"],
  },
  {
    key: "upd",
    label: "Изменить",
    icon: <FormOutlined />,
    description: "Изменить документ",
    color: "#ffa940",
    status: [1, 3],
    roles: ["USER"],
  },
  {
    key: "confirm",
    label: "Принять",
    icon: <CheckOutlined />,
    description: "Принять документа",
    color: "#57b6c0",
    status: [2],
    roles: ["ADMIN", "MODERATOR"],
  },

  {
    key: "receipt",
    label: "Квитанция",
    icon: <AuditOutlined />,
    description: "Посмотреть квитанцию",
    color: "#bfbfbf",
    status: [4],
    roles: ["USER", "ADMIN", "MODERATOR"],
  },
  {
    key: "remove",
    label: "Удалить",
    icon: <DeleteOutlined />,
    description: "Удалить документ",
    color: "#ff4d4f",
    status: [1, 3, 5],
    roles: ["USER", "ADMIN"],
  },
  // Изменить после подтверждение
  {
    key: "upd",
    label: "Изменить",
    icon: <FormOutlined />,
    description: "Изменить документ",
    color: "#ffa940",
    status: [2,4],
    roles: ["ADMIN","MODERATOR"],
  },
  {
    key: "back",
    label: "Отклонить",
    icon: <CloseOutlined />,
    description: "Отменить отправку документа",
    color: "#f50",
    status: [2, 5],
    roles: ["USER", "ADMIN", "MODERATOR"],
  },
  {
    key: "back",
    label: "Отклонить",
    icon: <CloseOutlined />,
    description: "Отменить документ",
    color: "#f50",
    status: [4],
    roles: ["ADMIN","MODERATOR"],
  },
  // // Удалить после подтверждение
  // {
  //   key: "remove",
  //   label: "Удалить",
  //   icon: <DeleteOutlined />,
  //   description: "Удалить документ",
  //   color: "#ff4d4f",
  //   status: [4],
  //   roles: ["ADMIN"],
  // },
];
function NewReports() {
  const pageSizeOptions = [5, 10, 15, 20, 30];
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const {
    data: dataReports,
    isSuccess: isSuccessReports,
    isLoading: isLoadingReports,
    isFetching,
  } = useGetReportsQuery({ page: currentPage, limit: pageSize });

  const [sendReport, {}] = useSendReportMutation();
  const [removeReport, {}] = useRemoveReportMutation();
  const [rejectReport, {}] = useRejectReportMutation();

  const getReportsHandler = (page, limit) => {
    setCurrentPage(page);
    setPageSize(limit);
  };

  const signReport = (id) => {
    navigate(`/dashboard/eds/${id}`);
  };

  const updateReport = (id, reportType, tempId) =>
    navigate(`/dashboard/reports/upd/${reportType}/${tempId}/${id}`);

  const deleteReport = (reportId) => {
    confirm({
      width: 500,
      title: "Вы уверены, что хотите удалить документ?",
      icon: <ExclamationCircleOutlined />,
      okText: "Удалить",
      okButtonProps: {
        type: "primary",
        danger: true,
      },
      cancelText: "Отмена",
      onOk() {
        removeReport({ reportId });
      },
    });
  };

  const backReport = (reportId) => {
    rejectReport({ id: reportId });
  };

  const onAction = (key, id, reportType, tempId, receiptId) => {
    if (key === "upd") {
      updateReport(id, reportType, tempId);
    }
    if (key === "sign") {
      signReport(id);
    }
    if (key === "send") {
      sendReport({ id });
    }
    if (key === "confirm") {
      signReport(id);
    }
    if (key === "remove") {
      deleteReport(id);
    }
    if (key === "receipt") {
      navigate(`/dashboard/receipt/${receiptId}`);
    }
    if (key === "back") {
      backReport(id);
    }
  };
  const reports =
    isSuccessReports &&
    dataReports?.rows.map((report) => ({
      key: report.id,
      report: (
        <Avatar.Group>
          <Avatar
            className="shape-avatar"
            shape="square"
            size={40}
            style={{
              backgroundColor: "#57b6c0",
            }}
            icon={<FileTextOutlined />}
          />
          <div className="avatar-info">
            <Tooltip
              placement="right"
              title={`${report.company.name} : ${report.type.title}`}
            >
              <Title level={5} type="link">
                <Link
                  to={`/dashboard/reports/view/${report.type.id}/${report.type.tempId}/${report.id}`}
                >
                  {report.company.name.length > 35
                    ? report.company.name.slice(0, 35) + "..."
                    : report.company.name}
                </Link>
              </Title>
              <Text type="secondary">
                {report.type.title.length > 35
                  ? report.type.title.slice(0, 35) + "..."
                  : report.type.title}
              </Text>
            </Tooltip>
          </div>
        </Avatar.Group>
      ),
      date: (
        <>
          <div className="author-info">
            <p>
              {report.status.id == 1 || report.status.id == 5 ? (
                moment(report.updatedAt).fromNow()
              ) : (
                <>
                  {report?.send_date != null && (
                    <Tooltip title="Дата отправки">
                      <Text>{report.send_date && report.send_date}</Text>
                    </Tooltip>
                  )}
                  {report?.confirm_date != null && (
                    <Tooltip title="Дата принятия">
                      <Text>
                          {" | "}{report.confirm_date && report.confirm_date}
                      </Text>
                    </Tooltip>
                  )}
                </>
              )}
            </p>
          </div>
        </>
      ),
      status: (
        <>
          <StatusTag type={report.status.type} title={report.status.title} />
        </>
      ),
      eds:
        report.eds.length > 0 ? (
          <Popover
            content={
              <EdsCert
                data={report.eds[0]?.cert}
                type={report.eds[0]?.typeId}
              />
            }
          >
            <Avatar
              size={30}
              style={{
                backgroundColor: "#40a9ff",
                cursor: "pointer",
              }}
              icon={<SafetyCertificateOutlined />}
            />
          </Popover>
        ) : (
          <Avatar size={30} icon={<SafetyCertificateOutlined />} />
        ),
      action: (
        <Space>
          {items.map((action) => (
            <Fragment key={action.key}>
              {action.status.includes(report.status.id) &&
                action.roles.includes(user.roles[0].title) && (
                  <Tooltip title={action.description}>
                    <Button
                      type="primary"
                      icon={action.icon}
                      style={{
                        background: action.color,
                        borderColor: action.color,
                        width: "120px",
                      }}
                      onClick={() =>
                        onAction(
                          action.key,
                          report.id,
                          report.type.id,
                          report.type.tempId,
                          report?.receipt?.id
                        )
                      }
                    >
                      {action.label}
                    </Button>
                  </Tooltip>
                )}
            </Fragment>
          ))}
        </Space>
      ),
    }));
  return (
    <>
      {isLoadingReports || isFetching ? (
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
          locale={{
            emptyText: "Пусто",
          }}
          pagination={{
            pageSize,
            total: dataReports?.count,
            pageSizeOptions,
            current: currentPage,
            locale: {
              items_per_page: " документ",
            },
            position: "bottomRight",
            onChange: (page, pageSize) => getReportsHandler(page, pageSize),
          }}
        />
      )}
    </>
  );
}

export default NewReports;
