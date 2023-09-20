import { useEffect, useState } from "react";
import { Card, Typography, List, Avatar, Button, Collapse } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { FileTextOutlined } from "@ant-design/icons";
import {
  useGetReportTypesQuery,
  useCreateReportMutation,
} from "../../../store/services/report-service";

const { Title, Text } = Typography;
const { Panel } = Collapse;

const ReportTypes = () => {
  const navigate = useNavigate();
  const [reportType, setReportType] = useState({});
  const { data: dataReportTypes, isSuccess: isSuccessReportTypes } =
    useGetReportTypesQuery();
  const [
    createReport,
    { data: dataCreateReport, isSuccess: isSuccessCreateReport },
  ] = useCreateReportMutation();

  const selectType = (typeId, tempId) => {
    setReportType({ typeId, tempId });
    createReport({ typeId, statusId: 1 });
  };

  useEffect(() => {
    if (isSuccessCreateReport) {
      navigate(
        `/dashboard/reports/add/${reportType.typeId}/${reportType.tempId}/${dataCreateReport}`
      );
    }
  }, [isSuccessCreateReport]);

  return (
    <>
      {
        <Card
          bordered={false}
          className="criclebox mb-24"
          title={<Title level={4}>Выберите тип документа</Title>}
        >
          <Collapse accordion defaultActiveKey={["1"]}>
            {isSuccessReportTypes &&
              dataReportTypes.map((type, i) => (
                <Panel
                  header={<Title level={5}>{type.title}</Title>}
                  key={i + 1}
                >
                  <List
                    itemLayout="horizontal"
                    dataSource={type.types}
                    renderItem={(item) => (
                      <List.Item
                        extra={
                          <Button
                            type="link"
                            onClick={() => selectType(item.id, item.tempId)}
                          >
                            Выбрать
                          </Button>
                        }
                      >
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              size={30}
                              style={{
                                backgroundColor: "#57b6c0",
                              }}
                              shape="square"
                              icon={<FileTextOutlined />}
                            />
                          }
                          // title={<Text type="secondary">{item.title}</Text>}
                          description={<Text type="">{item.title}</Text>}
                        />
                      </List.Item>
                    )}
                  />
                </Panel>
              ))}
          </Collapse>
        </Card>
      }
    </>
  );
};

export default ReportTypes;
