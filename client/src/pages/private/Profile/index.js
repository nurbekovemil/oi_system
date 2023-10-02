import { useSelector } from "react-redux";

import { Row, Col, Card, Avatar } from "antd";

import { UserOutlined } from "@ant-design/icons";

import ProfileCompany from "../../../components/profile/ProfileCompany";
import ProfileUser from "../../../components/profile/ProfileUser";
import ChangeUserPass from "../../../components/profile/ChangeUserPass";

const btnStyle = {
  background: "#57b6c0",
  borderColor: "#57b6c0",
};

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Row gutter={[18, 16]}>
      <Col span={24}>
        <Card
          bodyStyle={{ display: "none" }}
          title={
            <Row justify="space-between" align="middle" gutter={[24, 0]}>
              <Col
                span={24}
                md={12}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Avatar.Group>
                  <Avatar
                    size={50}
                    shape="square"
                    style={{
                      backgroundColor: "#57b6c0",
                    }}
                    icon={<UserOutlined />}
                  />

                  <div style={{ marginLeft: "16px" }}>
                    <h4 className="font-semibold m-0">
                      {user.firstName || user.login}
                    </h4>
                    <p>{user.roles[0].description}</p>
                  </div>
                </Avatar.Group>
              </Col>
            </Row>
          }
        ></Card>
      </Col>
      <Col span={8} xs={24} sm={24} md={8} lg={8}>
        <ProfileUser user={user} btnStyle={btnStyle} />
        <ChangeUserPass user={user} btnStyle={btnStyle} />
      </Col>
      <Col span={16} xs={24} sm={24} md={16} lg={16}>
        <ProfileCompany user={user} btnStyle={btnStyle} />
      </Col>
    </Row>
  );
};

export default Profile;
