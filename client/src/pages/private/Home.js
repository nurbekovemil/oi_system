import { Card, Col, Row, Typography, Spin, Divider, Select } from "antd";
import {
  BankOutlined,
  ReconciliationOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import ReactApexChart from "react-apexcharts";
import moment from "moment";
import { useGetCompaniesQuery } from "../../store/services/company-service";
import { useGetReportsQuery } from "../../store/services/report-service";

function Home() {
  const { Title, Text } = Typography;
  const blockGap = 16;
  const currentYear = moment().year();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedTypeId, setSelectedTypeId] = useState("all");
  const {
    data: companiesData,
    isLoading: isCompaniesLoading,
    isFetching: isCompaniesFetching,
  } = useGetCompaniesQuery({ page: 1, limit: 1 });
  const {
    data: reportsData,
    isLoading: isReportsLoading,
    isFetching: isReportsFetching,
  } = useGetReportsQuery({ page: 1, limit: 100000 });

  const reportsRows = reportsData?.rows || [];
  const acceptedReports = reportsRows.filter((report) => report.status?.id === 4);
  const notAcceptedReports = reportsRows.filter((report) => report.status?.id !== 4);

  const availableYears = useMemo(() => {
    const years = new Set([currentYear]);
    acceptedReports.forEach((report) => {
      const year = moment(report.updatedAt).year();
      if (Number.isFinite(year)) years.add(year);
    });
    const sortedYears = Array.from(years).sort((a, b) => a - b);
    const minYear = sortedYears[0];
    const maxYear = sortedYears[sortedYears.length - 1];
    const range = [];
    for (let year = minYear; year <= maxYear; year += 1) {
      range.push(year);
    }
    return range.sort((a, b) => b - a);
  }, [acceptedReports, currentYear]);

  const reportTypeOptions = useMemo(() => {
    const uniqueTypes = new Map();
    acceptedReports.forEach((report) => {
      if (report?.type?.id && report?.type?.title) {
        uniqueTypes.set(report.type.id, report.type.title);
      }
    });
    return [
      { value: "all", label: "Все типы" },
      ...Array.from(uniqueTypes.entries()).map(([id, title]) => ({
        value: id,
        label: title,
      })),
    ];
  }, [acceptedReports]);

  const monthlyReports = useMemo(() => {
    const months = Array.from({ length: 12 }, (_, index) =>
      moment().year(selectedYear).startOf("year").add(index, "months")
    );
    const monthMap = months.reduce((acc, month) => {
      acc[month.format("YYYY-MM")] = 0;
      return acc;
    }, {});

    acceptedReports
      .filter((report) => {
        const isYearMatch = moment(report.updatedAt).year() === selectedYear;
        const isTypeMatch =
          selectedTypeId === "all" || report?.type?.id === selectedTypeId;
        return isYearMatch && isTypeMatch;
      })
      .forEach((report) => {
      const monthKey = moment(report.updatedAt).format("YYYY-MM");
      if (monthKey in monthMap) {
        monthMap[monthKey] += 1;
      }
      });

    return {
      categories: months.map((month) => month.format("MMM").toLowerCase()),
      series: months.map((month) => monthMap[month.format("YYYY-MM")] || 0),
    };
  }, [acceptedReports, selectedYear, selectedTypeId]);

  const chartOptions = {
    chart: {
      toolbar: { show: false },
      fontFamily: "Nunito, sans-serif",
      background: "#ffffff",
    },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 3 },
    colors: ["#2d8cf0"],
    xaxis: {
      categories: monthlyReports.categories,
      labels: { style: { colors: "#334155", fontSize: "12px", fontWeight: 600 } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: "#334155", fontSize: "12px", fontWeight: 600 },
        formatter: (value) => `${Math.round(value)}`,
      },
    },
    grid: { borderColor: "#d9e2ec", strokeDashArray: 4 },
    tooltip: { y: { formatter: (value) => `${value} отчет(ов)` } },
    fill: {
      type: "gradient",
      gradient: { shadeIntensity: 0.3, opacityFrom: 0.18, opacityTo: 0.02, stops: [0, 90, 100] },
    },
  };

  const cards = [
    {
      label: "Компании",
      value: String(companiesData?.count || 0),
      icon: <BankOutlined />,
      color: "#2d8cf0",
    },
    {
      label: "Принятые отчеты",
      value: String(acceptedReports.length),
      icon: <ReconciliationOutlined />,
      color: "#13c2c2",
    },
    {
      label: "Отчеты на рассмотрении",
      value: String(notAcceptedReports.length),
      icon: <ClockCircleOutlined />,
      color: "#fa8c16",
    },
  ];

  const isLoading =
    isCompaniesLoading || isCompaniesFetching || isReportsLoading || isReportsFetching;

  return (
    <div className="layout-content" style={{ padding: 0 }}>
      <Row gutter={[blockGap, blockGap]}>
        {cards.map((card) => (
          <Col key={card.label} xs={24} sm={12} lg={8}>
            <Card
              bordered={false}
              style={{
                borderRadius: 16,
                boxShadow: "0 10px 24px rgba(14, 30, 37, 0.06)",
              }}
              bodyStyle={{ padding: 20 }}
            >
              <Row justify="space-between" align="middle">
                <Col>
                  <Text style={{ color: "#7a8599" }}>{card.label}</Text>
                  <div style={{ fontSize: 30, fontWeight: 700, lineHeight: 1.2 }}>{card.value}</div>
                </Col>
                <Col>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      background: card.color,
                      fontSize: 20,
                    }}
                  >
                    {card.icon}
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[blockGap, blockGap]} style={{ marginTop: blockGap }}>
        <Col xs={24}>
          <Card
            bordered={false}
            style={{
              borderRadius: 16,
              boxShadow: "0 10px 24px rgba(14, 30, 37, 0.06)",
              height: "100%",
            }}
            bodyStyle={{ padding: 20 }}
          >
            <Title level={5} style={{ marginBottom: 0 }}>
              Динамика отчетности
            </Title>
            <Row justify="space-between" align="middle" style={{ marginTop: 6 }}>
              <Text style={{ color: "#7a8599" }}>Статистика за {selectedYear} год</Text>
              <div style={{ display: "flex", gap: 8 }}>
                <Select
                  value={selectedTypeId}
                  onChange={setSelectedTypeId}
                  style={{ width: 360 }}
                  options={reportTypeOptions}
                />
                <Select
                  value={selectedYear}
                  onChange={setSelectedYear}
                  style={{ width: 120 }}
                  options={availableYears.map((year) => ({ value: year, label: String(year) }))}
                />
              </div>
            </Row>
            <Divider style={{ margin: "14px 0 12px" }} />
            {isLoading ? (
              <div style={{ padding: 20, textAlign: "center" }}>
                <Spin />
              </div>
            ) : (
              <ReactApexChart
                className="home-analytics-chart"
                options={chartOptions}
                series={[{ name: "Отчеты", data: monthlyReports.series }]}
                type="area"
                height={320}
              />
            )}
          </Card>
        </Col>
      </Row>

    </div>
  );
}

export default Home;
