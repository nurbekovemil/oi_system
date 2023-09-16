import { Tag } from "antd";
import {
  CheckCircleOutlined,
  CheckOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
export const StatusTag = ({ type, title }) => {
  const statusToTag = {
    confirm: { icon: <CheckCircleOutlined />, color: "success" },
    processing: { icon: <CheckOutlined />, color: "processing" },
    saved: { icon: <ClockCircleOutlined />, color: "default" },
    rejected: { icon: <ExclamationCircleOutlined />, color: "warning" },
    sign: { icon: <SafetyOutlined />, color: "default" },
  };

  const tagData = statusToTag[type] || { icon: null, color: "default" };

  return (
    <Tag icon={tagData.icon} color={tagData.color} style={{ width: "100px" }}>
      {title}
    </Tag>
  );
};
