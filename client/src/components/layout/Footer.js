import { Layout, Row, Col } from "antd";
const { Footer: AntFooter } = Layout;
const copyrightText = (
  <div className="copyright">
    ЗАО Кыргызская фондовая биржа © 2023 Центр раскрытия информации
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
