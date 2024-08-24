import {
    Row,
    Col,
    Card,
    Table,
    Avatar,
    Button,
    Typography,
    Dropdown,
    Space,
    Tooltip,
    Spin,
    Popover,
    Descriptions,
  } from "antd";
  import { Link, useNavigate } from "react-router-dom";
  import {
    PlusOutlined,
    UserOutlined,
    FormOutlined,
    DeleteOutlined,
    EyeOutlined,
    BarsOutlined,
    FileTextOutlined,
    AntDesignOutlined,
    SafetyOutlined,
    CloseOutlined,
  } from "@ant-design/icons";
  import { useGetUsersQuery } from "../../../store/services/user-service";
  import { Fragment, useState } from "react";
import { useGetContractsQuery } from "../../../store/services/contract-service";
import { useSelector } from "react-redux";
  
  const { Title, Text } = Typography;
  // через класс или id не работает стили так как шаблон стили загружает динамически
  const btnStyle = {
    background: "#57b6c0",
    borderColor: "#57b6c0",
  };
  const columns = [
    {
      title: "№",
      dataIndex: "contract_number",
      key: "contract_number",
    },
    {
      title: "Договор",
      dataIndex: "contract",
      key: "contract",
    },
    {
      title: "Дата",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Участники",
      dataIndex: "companies",
      key: "companies",
      width: "30%",
    },
    {
      title: "Действие",
      key: "action",
      dataIndex: "action",
      width: "15%",
      align: "center",
    },
  ];
  
  const items = [
    {
      key: "sign",
      label: "Подписать",
      icon: <SafetyOutlined />,
      description: "Подписать документ",
      color: "#40a9ff",
      status: [1, 3]
    },
    {
      key: "back",
      label: "Отклонить",
      icon: <CloseOutlined />,
      description: "Отменить отправку документа",
      color: "#f50",
      status: [1]
    },
  ];
  
  function Contracts() {
    const pageSizeOptions = [5, 10, 20];
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const { user } = useSelector((state) => state.auth);
    const getUsersHandler = (page, limit) => {
      setCurrentPage(page);
      setPageSize(limit);
    };
    const navigate = useNavigate();
    // const { data, isSuccess, isLoading, isFetching } = useGetUsersQuery({
    //   page: currentPage,
    //   limit: pageSize,
    // });
    const { data: contractList, isLoading: isLoadingContracts, isSuccess: isSuccessContracts, isFetching} = useGetContractsQuery()  
    const onAction = (key, id) => {
      // if (key === "view") {
      //   navigate(`/dashboard/users/view/${id}`);
      // }
      // if (key === "upd") {
      //   navigate(`/dashboard/users/upd/${id}`);
      // }
      // if (key === "delete") {
      //   // deleteCompany(id);
      // }
      if (key === "sign") {
        navigate(`/dashboard/contracts/eds/${id}`);
      }
    };
    const contracts =
      isSuccessContracts &&
      contractList.map((contract) => ({
        key: contract.id,
        contract_number: contract.id,
        contract: (
          <>
            <Avatar.Group>
              <Avatar
                className="shape-avatar"
                shape="square"
                size={40}
                icon={<FileTextOutlined />}
                style={{
                  backgroundColor: "#57b6c0",
                }}
              ></Avatar>
              <div className="avatar-info">
                <Title level={5} type="link">
                  <Link
                    to={`/dashboard/contracts/view/${contract.typeId}/${contract.id}`}
                  >
                    {contract.contractType.title}
                  </Link>
                </Title>
              </div>
            </Avatar.Group>
          </>
        ),
        date: (
          <>
            {contract.createdAt}
          </>
        ),
        companies: (
          <Avatar.Group>
            {
              contract.contractCompanies.map((company) => (
                <Popover
                  content={
                    <Descriptions style={{ width: "400px" }}>
                      <Descriptions.Item label="Название компании" span={3}>
                        {company.company.name}
                      </Descriptions.Item>
                      <Descriptions.Item label="Статус подписи" span={3}>
                        {company.status.title}
                      </Descriptions.Item>
                    </Descriptions>
                  }
                >
                  <Avatar
                    style={{
                      backgroundColor: (company?.status?.id === 2 && "#57b6c0") || (company?.status?.id === 3 && "#f50"),
                      cursor: "pointer",
                    }}
                    icon={<UserOutlined />}
                  />
                </Popover>
              ))
            }
          </Avatar.Group>
        ),
        action: (
          <Space>
            {items.map((action) => (
              <Fragment key={action.key}>
                {contract.contractCompanies.find((company) => action.status.includes(company.status.id) && company.companyId == user.companyId) && (
                  <Tooltip title={action.description}>
                    <Button
                      type="primary"
                      icon={action.icon}
                      style={{
                        background: action.color,
                        borderColor: action.color,
                        width: "120px",
                      }}
                      onClick={() => onAction(action.key, contract.id)}
                    >
                      {action.label}
                    </Button>
                  </Tooltip>
                )}
              </Fragment>
            ))}
          </Space>
        ),
      }));
    return (
      <>
        <div className="tabled">
          <Row gutter={[24, 0]}>
            <Col xs="24" xl={24}>
              <Card
                bordered={false}
                className="criclebox tablespace mb-24"
                title="Договор"
                extra={
                  <Link to="/dashboard/contracts/types">
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      style={{
                        ...btnStyle,
                      }}
                    >
                      Создать договор
                    </Button>
                  </Link>
                }
              >
                <div className="table-responsive">
                  {isLoadingContracts || isFetching ? (
                    <div
                      style={{ padding: "16px 25px" }}
                      className="d-flex justify-content-center"
                    >
                      <Spin />
                    </div>
                  ) : (
                    <Table
                      columns={columns}
                      dataSource={contracts}
                      className="ant-border-space"
                      // pagination={{
                      //   pageSize,
                      //   total: data?.count,
                      //   pageSizeOptions,
                      //   current: currentPage,
                      //   locale: {
                      //     items_per_page: " показано",
                      //   },
                      //   position: "bottomRight",
                      //   onChange: (page, pageSize) =>
                      //     getUsersHandler(page, pageSize),
                      // }}
                    />
                  )}
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
  
  export default Contracts;
  