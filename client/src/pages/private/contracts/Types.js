import { Card, Typography, List, Avatar, Button, Collapse } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { FileTextOutlined } from "@ant-design/icons";
import { useGetContractTypesQuery } from "../../../store/services/contract-service";


const { Title, Text } = Typography;
const { Panel } = Collapse;

const ContractTypes = () => {
  const navigate = useNavigate();
  const { data: dataContractTypes, isSuccess: isSuccessContractTypes } =
  useGetContractTypesQuery();
  return (
    <>
      {
        <Card
          bordered={false}
          className="criclebox mb-24"
          title={<Title level={4}>Выберите договор</Title>}
        >
                <List
                    itemLayout="horizontal"
                    dataSource={dataContractTypes}
                    renderItem={(item) => (
                      <List.Item
                        extra={
                          <Button
                            type="link"
                            onClick={() => navigate(`/dashboard/contracts/add/${item.id}`)}
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
                          description={<Text type="">{item.title}</Text>}
                        />
                      </List.Item>
                    )}
                  />
        </Card>
      }
    </>
  );
};

export default ContractTypes;
