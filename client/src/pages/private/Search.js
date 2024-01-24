import { FileTextOutlined } from "@ant-design/icons";
import { Card, Row, Col, Typography, Space, List, Avatar } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import SearchList from "../../components/search/List";
// через класс или id не работает стили так как шаблон стили загружает динамически
const avatarStyle = {
  background: "#57b6c0",
  borderColor: "#57b6c0",
};
const { Title, Text } = Typography;

const Saerch = () => {
  return (
    <Row gutter={16}>
      <Col span={24}>
        <Card
          bordered={false}
          className="criclebox tablespace mb-24"
          title={<Title level={4}>Результаты поиска</Title>}
        >
          <SearchList />
        </Card>
      </Col>
    </Row>
  );
};
export default Saerch;
