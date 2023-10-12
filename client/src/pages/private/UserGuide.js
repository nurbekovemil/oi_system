import { Card, Row, Col, Typography, Space, List, Avatar } from "antd";
import React from "react";
// через класс или id не работает стили так как шаблон стили загружает динамически
const avatarStyle = {
  background: "#57b6c0",
  borderColor: "#57b6c0",
};
const { Title, Text } = Typography;
const guides = [
  {
    label: "Создание отчета и существенных фактов",
    content: {
      url: `${process.env.REACT_APP_SERVER_HOST}/reports/static/user_guides/create_document.mp4`,
    },
    description: [
      {
        value: "1. Перейти в меню Документы",
      },
      {
        value: "2. В правом верхнем углу нажать на кнопку Создать документ",
      },
      {
        value: "3. Выбрать соответствующую форму из списка",
      },
      {
        value:
          "4. Заполнить все пункты (Данные сохраняется автоматически после ввода данных)",
      },
    ],
  },
  {
    label: "Электронно-цифровая подпись (ЭЦП) и отправка документа",
    content: {
      url: `${process.env.REACT_APP_SERVER_HOST}/reports/static/user_guides/sign_and_send.mp4`,
    },
    description: [
      {
        value: "1. Перейти в меню Документы",
      },
      {
        value: "2. Нажмите кнопку подписать",
      },
      {
        value: "3. Выбрать тип ЭЦП",
      },
      {
        value: "4. Заполнить соответствующие пункты",
      },
      {
        value: "5. Подтвердить (Подписать документ)",
      },
    ],
  },
  {
    label: "Проверить (ЭЦП)",
    content: {
      url: `${process.env.REACT_APP_SERVER_HOST}/reports/static/user_guides/check_sign.mp4`,
    },
    description: [
      {
        value: "1. Перейти в меню Документы",
      },
      {
        value:
          "2. Наведите соответствующему документу курсор в столбце ЭЦП или открыть документ и внизу посмотреть",
      },
    ],
  },
  {
    label: "Обновить данные компании",
    content: {
      url: `${process.env.REACT_APP_SERVER_HOST}/reports/static/user_guides/update_profile.mp4`,
    },
    description: [
      {
        value: "1. Перейти в меню Профиль",
      },
      {
        value:
          "2. В колонке Информация компании можете поменять данные компании",
      },
      {
        value:
          "3. В колонке Информация пользователя можете поменять ваши данные",
      },
    ],
  },
];

const guideText = `Руководство содержит практический алгоритм использования программы ЗАО «Кыргызская фондовая биржа» (далее «фондовая биржа») для удаленной передачи информации, подлежащей раскрытию согласно Закона КР «О рынке ценных бумаг», Положения «О порядке представления отчетности (информации) и раскрытии информации субъектами финансового рынка» и Договора о раскрытии информации. В целях эффективного использования электронной системы эмитенту рекомендуется в процессе работы руководствоваться следующими далее пунктами, которые могут быть дополнены или изменены в случае модернизации системы.`;
const UserGuide = () => {
  return (
    <Row gutter={16}>
      <Col span={24}>
        <Card
          bordered={false}
          className="criclebox mb-24"
          title={<Title level={4}>Руководство пользователя</Title>}
        >
          <List itemLayout="vertical">
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    icon={"0"}
                    shape="square"
                    style={{ ...avatarStyle }}
                  />
                }
                title={""}
                description={
                  <Space direction="vertical">
                    <Text>{guideText}</Text>
                  </Space>
                }
              />
            </List.Item>
            {guides.map((guide, i) => (
              <List.Item
                key={i}
                extra={
                  <video
                    width={400}
                    style={{ borderRadius: "12px" }}
                    src={guide.content.url}
                    controls
                  />
                }
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      icon={i + 1}
                      shape="square"
                      style={{ ...avatarStyle }}
                    />
                  }
                  title={guide.label}
                  description={
                    <Space direction="vertical">
                      {guide.description.map(({ value }, i) => (
                        <Text key={i + i + 1}>{value}</Text>
                      ))}
                    </Space>
                  }
                />
              </List.Item>
            ))}
          </List>
        </Card>
      </Col>
    </Row>
  );
};
export default UserGuide;
