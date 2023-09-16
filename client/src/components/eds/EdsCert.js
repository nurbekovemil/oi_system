import { Descriptions } from "antd";
import React from "react";

const EdsCert = ({ data, type }) => {
  return (
    <Descriptions style={{ width: "400px" }}>
      <Descriptions.Item label="Название организации" span={3}>
        {type == 1 ? data?.organizationName : data?.organizationName}
      </Descriptions.Item>
      <Descriptions.Item label="ИНН организации" span={3}>
        {type == 1 ? data?.organizationInn : data?.INN}
      </Descriptions.Item>
      <Descriptions.Item label="ФИО" span={3}>
        {type == 1 ? data?.commonName : data?.commonName}
      </Descriptions.Item>
      {type == 1 && (
        <Descriptions.Item label="Cрок действия" span={3}>
          {data?.validNotAfter}
        </Descriptions.Item>
      )}
      <Descriptions.Item label="Сертификат" span={3}>
        {type == 1 ? data?.keyIdentifier : data?.cert}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default EdsCert;
