import React from "react";
import { Descriptions, Row, Col } from "antd";
import { Link } from "react-router-dom";

const AboutUser = ({ dataUser, dataCompany }) => {
  return (
    <Row>
      <Col span={24}>
        <Descriptions>
          <Descriptions.Item label="Названия компании" span={3}>
            <Link to={`/dashboard/companies/view/${dataCompany.id}`}>
              {dataCompany.name}
            </Link>
          </Descriptions.Item>
          <Descriptions.Item label="Имя" span={3}>
            {dataUser.firstName}
          </Descriptions.Item>
          <Descriptions.Item label="Фамилия" span={3}>
            {dataUser.lastName}
          </Descriptions.Item>
          <Descriptions.Item label="ИНН" span={3}>
            {dataUser.inn}
          </Descriptions.Item>
        </Descriptions>
      </Col>
    </Row>
  );
};

export default AboutUser;
