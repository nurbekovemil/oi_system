import { useState } from "react";
import { Card, Typography, Button } from "antd";
import { useParams, Link } from "react-router-dom";
import {
  SolutionOutlined,
  TeamOutlined,
  ProjectOutlined,
  FormOutlined,
} from "@ant-design/icons";

import { useGetCompanyByIdQuery } from "../../../store/services/company-service";
import AboutCompany from "../../../components/company/AboutCompany";
const { Title } = Typography;

const CompanyView = () => {
  const { id } = useParams();
  const { data, isSuccess } = useGetCompanyByIdQuery(id);

  const tabList = [
    {
      key: "about",
      tab: (
        <span>
          <SolutionOutlined />
          Профиль компании
        </span>
      ),
    },
    {
      key: "employees",
      tab: (
        <span>
          <TeamOutlined />
          Сотрудники
        </span>
      ),
    },
    {
      key: "reports",
      tab: (
        <span>
          <ProjectOutlined />
          Отчеты
        </span>
      ),
    },
  ];

  const contentList = {
    about: <AboutCompany data={data} />,
    employees: <p>Сотрудники</p>,
    reports: <p>Отчеты</p>,
  };
  const [activeTab, setActiveTab] = useState("about");
  const onTabChange = (key) => {
    setActiveTab(key);
  };
  console.log("data", data, id);
  return (
    <>
      {isSuccess && (
        <Card
          bordered={false}
          className="criclebox mb-24"
          tabList={tabList}
          activeTabKey={activeTab}
          onTabChange={(key) => {
            onTabChange(key);
          }}
          extra={
            <Link to={`/dashboard/companies/upd/${data.id}`}>
              <Button type="link" icon={<FormOutlined />}>
                Изменить
              </Button>
            </Link>
          }
          title={<Title level={4}>Информация о компании</Title>}
        >
          {contentList[activeTab]}
        </Card>
      )}
    </>
  );
};

export default CompanyView;
