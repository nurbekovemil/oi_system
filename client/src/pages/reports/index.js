import { useState } from "react";

import { Row, Col, Card, Button } from "antd";
import {
  PlusOutlined,
  BarsOutlined,
  ContainerOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import NewReports from "../../components/report/NewReports";
import OldReports from "../../components/report/OldReports";

const tabList = [
  {
    key: "new",
    tab: (
      <span>
        <BarsOutlined />
        Новые
      </span>
    ),
  },
  {
    key: "old",
    tab: (
      <span>
        <ContainerOutlined />
        Архив
      </span>
    ),
  },
];

const contentList = {
  new: <NewReports />,
  old: <OldReports />,
};

function Reports() {
  const [activeTab, setActiveTab] = useState("new");
  const onTabChange = (key) => {
    setActiveTab(key);
  };
  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Документы"
              tabList={tabList}
              onTabChange={(key) => {
                onTabChange(key);
              }}
              extra={
                <Link to="/dashboard/reports/types">
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    style={{
                      background: "#57b6c0",
                      borderColor: "#57b6c0",
                    }}
                  >
                    Создать документ
                  </Button>
                </Link>
              }
            >
              <div className="table-responsive">{contentList[activeTab]}</div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Reports;
