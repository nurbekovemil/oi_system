import { Descriptions } from "antd";
import React from "react";

const EdsCert = ({ data, type }) => {
  const isCloud = type === 1;
  return (
    <Descriptions style={{ width: "400px" }}>
      <Descriptions.Item label="Название организации" span={3}>
        {data?.organizationName}
      </Descriptions.Item>
      <Descriptions.Item label="ИНН организации" span={3}>
        {isCloud ? data?.organizationInn : data?.INN || data?.organizationInn}
      </Descriptions.Item>
      <Descriptions.Item label="ФИО" span={3}>
        {data?.commonName}
      </Descriptions.Item>
      {data?.tokenKind && (
        <Descriptions.Item label="Токен" span={3}>
          {data.tokenKind === "jacarta" ? "JaCarta" : "EnoToken"}
        </Descriptions.Item>
      )}
      {isCloud && (
        <Descriptions.Item label="Cрок действия" span={3}>
          {data?.validNotAfter}
        </Descriptions.Item>
      )}
      <Descriptions.Item label="Сертификат" span={3}>
        {isCloud ? data?.keyIdentifier : data?.cert}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default EdsCert;
