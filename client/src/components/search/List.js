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
  UserOutlined,
} from "@ant-design/icons";

import { Link, useNavigate } from "react-router-dom";
import {
  useGetReportsQuery,
  useRejectReportMutation,
  useRemoveReportMutation,
  useSendReportMutation,
} from "../../store/services/report-service";
import { StatusTag } from "../report/StatusTag";
import moment from "moment";
import { Fragment, useState } from "react";
import EdsCert from "../eds/EdsCert";
import { useSelector } from "react-redux";
// import { isRejected } from "@reduxjs/toolkit";
const { Title, Text } = Typography;
const { confirm } = Modal;

const columnsReports = [
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

const itemsReports = [
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
    key: "back",
    label: "Отклонить",
    icon: <CloseOutlined />,
    description: "Отменить отправку документа",
    color: "#ffa940",
    status: [2, 5],
    roles: ["USER", "ADMIN", "MODERATOR"],
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
    key: "upd",
    label: "Изменить",
    icon: <FormOutlined />,
    description: "Изменить документ",
    color: "#ffa940",
    status: [4],
    roles: ["ADMIN"],
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
];

const columnsUsers = [
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
    align: "right",
  },
];

const itemsUsers = [
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
function SearchList() {
  const { user } = useSelector((state) => state.auth);
  const { reports: dataReports, users: dataUsers } = useSelector(
    (state) => state.search
  );
  const navigate = useNavigate();

  const [sendReport, {}] = useSendReportMutation();
  const [removeReport, {}] = useRemoveReportMutation();
  const [rejectReport, {}] = useRejectReportMutation();

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

  const onReportAction = (key, id, reportType, tempId, receiptId) => {
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
  const onUserAction = (key, id) => {
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
  const reports =
    dataReports &&
    dataReports?.rows &&
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
                        | {report.confirm_date && report.confirm_date}
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
          {itemsReports.map((action) => (
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
                        onReportAction(
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
  const users =
    dataUsers &&
    user.roles[0].title == "ADMIN" || user.roles[0].title == "MODERATOR" &&
    dataUsers?.rows &&
    dataUsers?.rows.map((user) => ({
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
          {itemsUsers.map((action) => (
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
                  onClick={() => onUserAction(action.key, user.id)}
                >
                  {action.label}
                </Button>
              </Tooltip>
            </Fragment>
          ))}
        </Space>
      ),
    }));

  return (
    <div className="table-responsive">
      {user.roles[0].title == "ADMIN" || user.roles[0].title == "MODERATOR" && (
        <>
          <Space align="center" style={{ marginLeft: "24px" }}>
            <Title level={5}> Пользователи: {dataUsers?.count}</Title>
          </Space>
          <Table
            columns={columnsUsers}
            dataSource={users}
            className="ant-border-space"
            pagination={false}
          />
        </>
      )}
      <Space align="center" style={{ marginLeft: "24px" }}>
        <Title level={5}>Документы: {dataReports?.count}</Title>
      </Space>
      <Table
        columns={columnsReports}
        dataSource={reports}
        className="ant-border-space"
        locale={{
          emptyText: "Пусто",
        }}
        pagination={false}
      />
    </div>
  );
}

export default SearchList;
