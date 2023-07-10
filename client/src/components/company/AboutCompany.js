import React from "react";
import { Card, Descriptions, Row, Col } from "antd";

const AboutCompany = ({ data }) => {
  return (
    <Row>
      <Col
        span={12}
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={{ span: 12 }}
        lg={{ span: 12 }}
      >
        <Descriptions>
          <Descriptions.Item label="Названия компании" span={3}>
            {data.name}
          </Descriptions.Item>
          <Descriptions.Item label="Деятельность" span={3}>
            {data.activity}
          </Descriptions.Item>
          <Descriptions.Item label="Руководитель" span={3}>
            {data.director}
          </Descriptions.Item>
          <Descriptions.Item label="Бухгалтер" span={3}>
            {data.accounting}
          </Descriptions.Item>
        </Descriptions>
      </Col>
      <Col
        span={12}
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={{ span: 12 }}
        lg={{ span: 12 }}
      >
        <Descriptions>
          <Descriptions.Item label="Почта" span={3}>
            {data.email}
          </Descriptions.Item>
          <Descriptions.Item label="Адрес" span={3}>
            {data.address}
          </Descriptions.Item>
          <Descriptions.Item label="Телефон" span={3}>
            {data.phone_number}
          </Descriptions.Item>

          <Descriptions.Item label="ИНН" span={3}>
            {data.inn}
          </Descriptions.Item>
        </Descriptions>
      </Col>
    </Row>
  );
};

export default AboutCompany;
