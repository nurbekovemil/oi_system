import { Card, Col, Row, Typography, List } from "antd";
import {
  BankOutlined,
  TeamOutlined,
  ReconciliationOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

import Echart from "../components/chart/EChart";

const data = [
  {
    company_name: 'ОАО Банк "Бай-Тушум"',
    report: "Существенный факт",
  },
  {
    company_name: "ОАО Тест (ЗАО КФБ)",
    report: "Квартальный отчет",
  },
  {
    company_name: 'ОАО Банк "Бай-Тушум"',
    report: "Существенный факт",
  },
  {
    company_name: 'ОАО Микрофинансовая компания "АБН"',
    report: "Отчет листинговых компаний",
  },
  {
    company_name: "ОАО Оптима Банк",
    report: "Годовой отчет",
  },
];

function Home() {
  const { Title } = Typography;

  const count = [
    {
      today: "Компании",
      title: "150",
      persent: "+30%",
      icon: <BankOutlined />,
      bnb: "bnb2",
    },
    {
      today: "Пользователи",
      title: "150",
      persent: "+20%",
      icon: <TeamOutlined />,
      bnb: "bnb2",
    },
    {
      today: "Отчеты",
      title: "1600",
      persent: "-20%",
      icon: <ReconciliationOutlined />,
      bnb: "redtext",
    },
  ];

  return (
    <>
      <div className="layout-content">
        <Row className="rowgap-vbox" gutter={[24, 0]}>
          {count.map((c, index) => (
            <Col
              key={index}
              xs={24}
              sm={24}
              md={12}
              lg={8}
              xl={8}
              className="mb-24"
            >
              <Card bordered={false} className="criclebox ">
                <div className="number">
                  <Row align="middle" gutter={[24, 0]}>
                    <Col xs={18}>
                      <span>{c.today}</span>
                      <Title level={3}>
                        {c.title} <small className={c.bnb}></small>
                      </Title>
                    </Col>
                    <Col xs={6}>
                      <div className="icon-box">{c.icon}</div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={16} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <Echart />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={8} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <div className="timeline-box">
                <Title level={5}>Последние отчеты</Title>
              </div>
              <div className="table-responsive">
                <List
                  itemLayout="horizontal"
                  dataSource={data}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<FileTextOutlined />}
                        title={
                          <a href="https://ant.design">{item.company_name}</a>
                        }
                        description={item.report}
                      />
                    </List.Item>
                  )}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Home;
