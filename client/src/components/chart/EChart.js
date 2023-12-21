import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import eChart from "./configs/eChart";

const { Title, Paragraph } = Typography;
const { options, series } = eChart;

const ChartTitle = <Title level={5}>Аналитика по отчетам</Title>;
const ChartParagraph = (
  <Paragraph className="lastweek">
    Отчеты отправленные за каждый месяц
  </Paragraph>
);

const EChart = () => {
  return (
    <>
      <div className="chart-vistior">
        {ChartTitle}
        {ChartParagraph}
      </div>
      <div id="chart">
        <ReactApexChart
          className="bar-chart"
          options={options}
          series={series}
          type="bar"
          height={300}
        />
      </div>
    </>
  );
};

export default EChart;
