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
    url: "https://fsa.gov.kg/wp-content/uploads/2024/11/%D0%9F%D0%BE%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BE-%D0%BF%D0%BE%D1%80%D1%8F%D0%B4%D0%BA%D0%B5-%D0%BF%D1%80%D0%B5%D0%B4%D1%81%D1%82%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D1%8F-%D0%BE%D1%82%D1%87%D0%B5%D1%82%D0%BD%D0%BE%D1%81%D1%82%D0%B8-%D0%B8%D0%BD%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%86%D0%B8%D0%B8-%D0%B8-%D1%80%D0%B0%D1%81%D0%BA%D1%80%D1%8B%D1%82%D0%B8%D0%B8-%D0%B8%D0%BD%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%86%D0%B8%D0%B8-%D1%81%D1%83%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D0%B0%D0%BC%D0%B8-%D1%84%D0%B8%D0%BD%D0%B0%D0%BD%D1%81%D0%BE%D0%B2%D0%BE%D0%B3%D0%BE-%D1%80%D1%8B%D0%BD%D0%BA%D0%B0-06.11.24-%D0%B3.pdf",
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
