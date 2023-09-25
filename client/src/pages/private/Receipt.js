import {
  CheckOutlined,
  PrinterOutlined,
  SafetyCertificateOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import {
  Card,
  Row,
  Col,
  Typography,
  Avatar,
  Descriptions,
  Divider,
  Spin,
  Button,
  Popover,
} from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import logo from "../../assets/images/kse_img.png";
import { useGetReceiptByIdQuery } from "../../store/services/receipt-service";
import { useReactToPrint } from "react-to-print";
const { Title, Text } = Typography;
const Receipt = () => {
  const { receiptId } = useParams();
  const printContentRef = useRef();
  const printHandler = useReactToPrint({
    content: () => printContentRef.current,
  });
  const { data, isLoading, isSuccess } = useGetReceiptByIdQuery(receiptId);

  useEffect(() => {}, []);
  return (
    <Row gutter={16}>
      <Col span={24}>
        <Card
          bordered={false}
          className="criclebox mb-24"
          title={<Title level={4}>Квитанция</Title>}
          extra={
            <Button
              type="primary"
              icon={<PrinterOutlined />}
              onClick={printHandler}
              style={{
                background: "#57b6c0",
                borderColor: "#57b6c0",
              }}
            >
              Печать
            </Button>
          }
        >
          {isLoading && (
            <Col span={24} className="d-flex justify-content-center">
              <Spin />
            </Col>
          )}
          {isSuccess && (
            <Row gutter={[0, 16]} ref={printContentRef}>
              <Col span={24}>
                <Meta avatar={<img src={logo} />}></Meta>
              </Col>
              <Col span={24}>
                <Descriptions>
                  <Descriptions.Item label="Названия компании" span={3}>
                    {data?.report?.company?.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Основание документа" span={3}>
                    {data?.report?.type?.title}
                  </Descriptions.Item>
                  <Descriptions.Item label="Дата размещения" span={3}>
                    {data?.receipt?.createdAt}
                  </Descriptions.Item>
                </Descriptions>
              </Col>
              <Col>
                <Button
                  type="dashed"
                  style={{}}
                  icon={<SafetyCertificateOutlined />}
                >
                  Подписан ЭЦП: {data?.receipt?.cert.commonName}
                </Button>
              </Col>
            </Row>
          )}
        </Card>
      </Col>
    </Row>
  );
};
export default Receipt;
