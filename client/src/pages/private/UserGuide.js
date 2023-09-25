import { CheckOutlined, SyncOutlined } from "@ant-design/icons";
import {
  Card,
  Row,
  Col,
  Typography,
  Radio,
  Space,
  Input,
  Button,
  Spin,
  Select,
  notification,
  Timeline,
  List,
  Avatar,
} from "antd";
import React, { useEffect, useState } from "react";

const { Title, Text } = Typography;
const UserGuide = () => {
  const guides = [
    {
      label: "Создание отчета и существенных фактов",
      content: {
        url: `${REACT_APP_SERVER_HOST}/reports/static/create_document.mp4`,
      },
      description: [
        {
          value: "1. Перейти в меню Документы",
        },
        {
          value: "2. В правом верхнем углу нажать на кнопку Создать документ",
        },
        {
          value: "3. Выбрать соответствующую форму из списка",
        },
        {
          value:
            "4. Заполнить все пункты (Данные сохраняется автоматически после ввода данных)",
        },
      ],
    },
  ];
  return (
    <Row gutter={16}>
      <Col span={24}>
        <Card
          bordered={false}
          className="criclebox mb-24"
          title={<Title level={4}>Руководство пользователя</Title>}
        >
          <List itemLayout="vertical">
            {guides.map((guide, i) => (
              <List.Item
                key={i}
                extra={
                  <video
                    width={400}
                    style={{ borderRadius: "12px" }}
                    src={guide.content.url}
                    controls
                  />
                }
              >
                <List.Item.Meta
                  avatar={<Avatar icon={i + 1} />}
                  title={guide.label}
                  description={
                    <Space direction="vertical">
                      {guide.description.map(({ value }, i) => (
                        <Text key={i + i + 1}>{value}</Text>
                      ))}
                    </Space>
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
export default UserGuide;
