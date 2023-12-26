import { Layout, Row, Col } from "antd";
const { Footer: AntFooter } = Layout;
const currentYear = new Date().getFullYear();
const copyrightText = (
  <div className="copyright">
    Центр раскрытия информации ЗАО "Кыргызская фондовая биржа" © {currentYear}
  </div>
);
function Footer() {
  return (
    <AntFooter style={{ background: "#fafafa" }}>
      <Row className="just">
        <Col span={24}>{copyrightText}</Col>
      </Row>
    </AntFooter>
  );
}

export default Footer;
