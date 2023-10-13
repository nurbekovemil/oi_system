import { FileTextOutlined } from "@ant-design/icons";
import { Card, Row, Col, Typography, Space, List, Avatar } from "antd";
import React from "react";
import { Link } from "react-router-dom";
// через класс или id не работает стили так как шаблон стили загружает динамически
const avatarStyle = {
  background: "#57b6c0",
  borderColor: "#57b6c0",
};
const { Title, Text } = Typography;
const regulations = [
  {
    label: "Закон КР О рынке ценных бумаг",
    url: `${process.env.REACT_APP_SERVER_HOST}/reports/static/doc1.docx`,
  },
  {
    label: "Закон КР Об акционерных обществах",
    url: `${process.env.REACT_APP_SERVER_HOST}/reports/static/doc2.docx`,
  },
  {
    label:
      "Положение О порядке представления отчетности (информации) и раскрытии информации субъектами финансового рынка",
    url: `${process.env.REACT_APP_SERVER_HOST}/reports/static/doc3.docx`,
  },
  {
    label:
      "Правонарушения против порядка управления по регулированию небанковского финансового рынкаг",
    url: `${process.env.REACT_APP_SERVER_HOST}/reports/static/doc4.docx`,
  },
];

const Regulations = () => {
  return (
    <Row gutter={16}>
      <Col span={24}>
        <Card
          bordered={false}
          className="criclebox mb-24"
          title={<Title level={4}>Нормативные акты</Title>}
        >
          <List itemLayout="vertical">
            {regulations.map((reg, i) => (
              <List.Item key={i}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      icon={<FileTextOutlined />}
                      shape="square"
                      style={{ ...avatarStyle }}
                    />
                  }
                  description={
                    <Text level={5}>
                      <a href={reg.url} target="_blank">
                        {reg.label}
                      </a>
                    </Text>
                  }
                />
              </List.Item>
            ))}
          </List>
        </Card>
      </Col>
    </Row>
  );
};
export default Regulations;
