import { useState } from "react";
import { Card, Typography, Button } from "antd";
import { useParams, Link } from "react-router-dom";
import {
  SolutionOutlined,
  ProjectOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { useGetUserByIdQuery } from "../../../store/services/user-service";
import { useGetCompanyByIdQuery } from "../../../store/services/company-service";
import AboutUser from "../../../components/user/AboutUser";

const { Title } = Typography;

const UserView = () => {
  const { id } = useParams();
  const { data: dataUser, isSuccess: isSuccessUser } = useGetUserByIdQuery(id);
  const { companyId } = isSuccessUser && dataUser;
  const { data: dataCompany, isSuccess: isSuccessCompany } =
    useGetCompanyByIdQuery(companyId, {
      skip: !isSuccessUser,
    });
  const tabList = [
    {
      key: "about",
      tab: (
        <span>
          <SolutionOutlined />
          Профиль пользователя
        </span>
      ),
    },
    // {
    //   key: "reports",
    //   tab: (
    //     <span>
    //       <ProjectOutlined />
    //       Отчеты
    //     </span>
    //   ),
    // },
  ];
  const contentList = {
    about: <AboutUser dataUser={dataUser} dataCompany={dataCompany} />,
    reports: <p>Отчеты</p>,
  };
  const [activeTab, setActiveTab] = useState("about");
  const onTab1Change = (key) => {
    setActiveTab(key);
  };
  return (
    <>
      {isSuccessCompany && (
        <Card
          bordered={false}
          className="criclebox mb-24"
          tabList={tabList}
          activeTabKey={activeTab}
          onTabChange={(key) => {
            onTab1Change(key);
          }}
          extra={
            <Link to={`/dashboard/users/upd/${dataUser.id}`}>
              <Button type="link" icon={<FormOutlined />}>
                Изменить
              </Button>
            </Link>
          }
          title={<Title level={4}>Информация о пользователя</Title>}
        >
          {contentList[activeTab]}
        </Card>
      )}
    </>
  );
};

export default UserView;
