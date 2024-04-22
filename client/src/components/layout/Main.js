import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Layout, Drawer, Affix, Modal, Col, Row, Typography } from "antd";
import Sidenav from "./Sidenav";
import Header from "./Header";
import Footer from "./Footer";
// через класс или id не работает стили так как шаблон стили загружает динамически
const btnStyle = {
  background: "#57b6c0",
  borderColor: "#57b6c0",
};
const { Title } = Typography;
const { Header: AntHeader, Content, Sider } = Layout;

function Main({ children }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState("right");
  const [sidenavColor, setSidenavColor] = useState("#57b6c0");
  const [sidenavType, setSidenavType] = useState("transparent");
  const [fixed, setFixed] = useState(false);

  const openDrawer = () => setVisible(!visible);
  const handleSidenavType = (type) => setSidenavType(type);
  const handleSidenavColor = (color) => setSidenavColor(color);
  const handleFixedNavbar = (type) => setFixed(type);

  let { pathname } = useLocation();
  pathname = pathname.replace("/", "");

  // Если пользователя стандартный пароль и руководство
  // useEffect(() => {
  //   if (user?.changePass) {
  //     navigate("/dashboard/change-pass");
  //   }
  //   if (!localStorage.getItem("info")) {
  //     Modal.info({
  //       title: (
  //         <Title level={5}>
  //           Рекомендуем ознакомиться с правилами программы
  //         </Title>
  //       ),
  //       content:
  //         "Руководство содержит практический алгоритм использования электронной системы ЗАО «Кыргызская фондовая биржа»",
  //       onOk() {
  //         localStorage.setItem("info", true);
  //         navigate("/dashboard/user-guide");
  //       },
  //       okText: "Перейти",
  //       okButtonProps: {
  //         style: {
  //           ...btnStyle,
  //         },
  //       },
  //       maskClosable: true,
  //     });
  //   }
  // }, []);
  return (
    <Layout className={`layout-dashboard`}>
      <Drawer
        title={false}
        placement={placement === "right" ? "left" : "right"}
        closable={false}
        onClose={() => setVisible(false)}
        open={visible}
        key={placement === "right" ? "left" : "right"}
        width={250}
        className="drawer-sidebar"
      >
        <Layout className="layout-dashboard">
          <Sider
            trigger={null}
            width={250}
            theme="light"
            className={`sider-primary ant-layout-sider-primary ${
              sidenavType === "#fff" ? "active-route" : ""
            }`}
            style={{ background: sidenavType }}
          >
            <Sidenav color={sidenavColor} />
          </Sider>
        </Layout>
      </Drawer>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        trigger={null}
        width={250}
        theme="light"
        className={`sider-primary ant-layout-sider-primary ${
          sidenavType === "#fff" ? "active-route" : ""
        }`}
        style={{ background: sidenavType }}
      >
        <Sidenav color={sidenavColor} />
      </Sider>
      <Layout>
        <Affix>
          <AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}>
            <Header
              onPress={openDrawer}
              name={pathname}
              subName={pathname}
              handleSidenavColor={handleSidenavColor}
              handleSidenavType={handleSidenavType}
              handleFixedNavbar={handleFixedNavbar}
            />
          </AntHeader>
        </Affix>
        <Content className="content-ant">{children}</Content>
        <Footer />
      </Layout>
    </Layout>
  );
}

export default Main;
