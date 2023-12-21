import React from "react";
import { Descriptions, Row, Col } from "antd";
const descriptionFields = [
  {
    rows: [
      { label: "Названия компании", field: "name" },
      { label: "Деятельность", field: "activity" },
      { label: "Руководитель", field: "director" },
      { label: "Бухгалтер", field: "accounting" },
    ],
  },
  {
    rows: [
      { label: "Почта", field: "email" },
      { label: "Адрес", field: "address" },
      { label: "Телефон", field: "phone_number" },
      { label: "ИНН", field: "inn" },
    ],
  },
];
const AboutCompany = ({ data }) => {
  return (
    <Row>
      {descriptionFields.map(({ rows }, index) => (
        <Col
          span={12}
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 12 }}
          key={index}
        >
          <Descriptions>
            {rows.map(({ label, field }) => (
              <Descriptions.Item label={label} span={3} key={field}>
                {data[field]}
              </Descriptions.Item>
            ))}
          </Descriptions>
        </Col>
      ))}
    </Row>
  );
};

export default AboutCompany;
