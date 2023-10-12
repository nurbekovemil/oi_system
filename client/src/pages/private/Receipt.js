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
            <Row
              gutter={[0, 16]}
              ref={printContentRef}
              align={"stretch"}
              style={{ height: "1200px" }}
            >
              <Col span={24}>
                <Meta
                  avatar={<img src={logo} />}
                  style={{ marginLeft: "50px", marginRight: "50px" }}
                ></Meta>
              </Col>
              <Col span={24}>
                <div
                  style={{
                    fontFamily: "Arial,Helvetica,sans-serif",
                    marginLeft: "50px",
                  }}
                >
                  <div style={{ fontSize: "14pt" }}>
                    {data?.report?.company?.name}
                  </div>
                  <div style={{ fontSize: "14pt" }}>
                    Основание документа : {data?.report?.type?.title}
                  </div>
                  <div style={{ fontSize: "14pt" }}>
                    Дата размещения : {data?.receipt?.createdAt}
                  </div>
                </div>
              </Col>
              <Col span={24}>
                <div
                  data-v-5b637425=""
                  style={{
                    flexDirection: "column",
                    border: "2px solid grey",
                    marginLeft: "50px",
                    padding: "10px",
                    color: "grey",
                    display: "flex",
                    fontFamily: "Andale Mono monospace",
                    overflowWrap: "break-word",
                    width: "40%",
                  }}
                >
                  <span data-v-5b637425="">
                    Подписан ЭЦП: {data.receipt.cert.commonName}
                  </span>
                  <span data-v-5b637425="">
                    Cрок действия ЭЦП: {data.receipt.createdAt}
                  </span>
                </div>
              </Col>
            </Row>
          )}
        </Card>
      </Col>
    </Row>
  );
};
export default Receipt;
