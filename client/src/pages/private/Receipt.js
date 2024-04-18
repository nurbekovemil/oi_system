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
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import logo from "../../assets/images/kse_img.png";
import { useGetReceiptByIdQuery } from "../../store/services/receipt-service";
import { useReactToPrint } from "react-to-print";
import { useCustomDateFormat } from "../../hooks/useCustomDate";
const { Title, Text } = Typography;

const Receipt = () => {
  const { receiptId } = useParams();
  const printContentRef = useRef();
  const [periodTitle, setPeriodTitle] = useState('')
  const [companyTitle, setCompanyTitle] = useState('')
  const printHandler = useReactToPrint({
    content: () => printContentRef.current,
  });
  const [periodDate, setPeriodDate] = useCustomDateFormat()
  const { data, isLoading, isSuccess } = useGetReceiptByIdQuery(receiptId);
  const reportPeriod = () => {
    const { report, receipt} = data
    setCompanyTitle(report?.company?.name)
    setPeriodDate(receipt?.createdAt)

    // Листинговый отчет
    if(report?.type?.groupId == 1 && report?.type?.tempId == 2){
      let { listing_period, listing_year } = report.content
      // Если не указан период
      if(!listing_period || !listing_year) setPeriodTitle(`${report.type.title} (Не указан период)`)
      // Годовой отчет
      if (listing_period == 5) setPeriodTitle(`${report.type.title} (Годовой отчет ${listing_year} года)`)
      // Квартальный отчет
      if (listing_period != 5) setPeriodTitle(`${report.type.title} (${listing_period} квартал ${listing_year})`)
    }
    // Приложенте 2-1
    else if(report?.type?.groupId == 1 && report?.type?.tempId == 1) {
      let {period, year} = report.content
      // Если не указан период
      if(!period || !year) setPeriodTitle(`${report.type.title} (Не указан период)`)
      // Годовой отчет
      if(period == 5) setPeriodTitle(`${report.type.title} ${report.type.title} (Годовой отчет ${year} года)`)
      // Квартальный отчет
      if(period != 5) setPeriodTitle(`${report.type.title} (${period} квартал ${year})`)
    } else {
      setPeriodTitle(report.type.title)
    }
  }
  useEffect(() => {
    if(data && isSuccess){
      reportPeriod()
    }
  },[isSuccess])

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
                    {companyTitle}
                  </div>
                  <div style={{ fontSize: "14pt" }}>
                    Основание документа : { periodTitle }
                  </div>
                  <div style={{ fontSize: "14pt" }}>
                    Дата размещения : {periodDate()}
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
                    Подписан ЭЦП: {data?.receipt?.cert?.commonName}
                  </span>
                  <span data-v-5b637425="">
                    Cрок действия ЭЦП:{" "}
                    {data?.receipt?.cert?.validNotAfter?.split(" ")[0]}
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
