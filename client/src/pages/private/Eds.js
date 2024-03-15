import { CheckOutlined, SyncOutlined } from "@ant-design/icons";
import {
  Card,
  Row,
  Col,
  Typography,
  Radio,
  Space,
  Input,
  Button,
  Spin,
  Select,
  notification,
} from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useConfirmPinCodeMutation,
  useSendPinCodeMutation,
  useSignRutokenMutation,
} from "../../store/services/eds-service";

import rutokenplugin from "@aktivco/rutoken-plugin";
import { useLazyGetReportByIdQuery } from "../../store/services/report-service";

const { Title, Text } = Typography;
const Eds = () => {
  const navigate = useNavigate();
  // report id
  const { reportId } = useParams();
  const [getReportById] = useLazyGetReportByIdQuery();
  // Eds
  const [eds, setEds] = useState();
  const [pin, setPin] = useState("");

  // RuToken
  const [plugin, setPlugin] = useState();
  const [currentRutoken, setCurrentRutoken] = useState({});
  const [deviceList, setDeviceList] = useState([]);
  const [currentCert, setCurrentCert] = useState({});
  const [certList, setCertList] = useState([]);
  const [signRutoken, { isSuccess: isSuccessSignRutoken }] =
    useSignRutokenMutation();

  // Eds handlers
  const [
    sendPinCode,
    { isSuccess: isSuccessSendPin, isLoading: isLoadingSendPin },
  ] = useSendPinCodeMutation();

  const [
    confirmEdsPinCode,
    { isLoading: isLoadingConfirmPin, isSuccess: isSuccessConfirmPin },
  ] = useConfirmPinCodeMutation();

  const confirmPinCodeHandler = () => {
    if (pin.trim() == "") return false;
    if (eds === 1) {
      confirmEdsPinCode({ pin, reportId });
    } else {
      confirmRotokenPinCide(pin);
    }
  };
  const onSetEds = (e) => {
    setEds(e.target.value);
  };

  // RuToken error handlers
  const handleError = (reason) => {
    let errorCodes = plugin.errorCodes;
    if (isNaN(reason.message)) {
      notification.error({ message: reason });
    }
    if (parseInt(reason.message) == errorCodes.PIN_INCORRECT) {
      notification.error({ message: "Неверный пин код" });
    }
  };

  const checkDevices = async () => {
    const devices = await plugin.enumerateDevices();
    if (devices && devices.length > 0) {
      const list = devices.map((device) => ({
        value: device,
        label: `Рутокен ЭЦП #${device}`,
      }));
      setDeviceList(list);
      setCurrentRutoken(list[0]);
    } else {
      notification.error({
        message: "Рутокен не обнаружен",
        description: "Подключите рутокен компьютеру",
      });
    }
  };
  const checkCerts = async () => {
    const certs = await plugin.enumerateCertificates(currentRutoken.value, 0);
    if (certs.length > 0) {
      let list = [];
      for (let cert of certs) {
        const { subject } = await plugin.parseCertificate(
          currentRutoken.value,
          cert
        );
        const parseCertList = subject.reduce((acc, item) => {
          acc[item.rdn] = item.value;
          return acc;
        }, {});
        list = [
          ...list,
          {
            value: cert,
            label: `${parseCertList.commonName} | ${parseCertList.organizationName}`,
            data: { ...parseCertList, cert },
          },
        ];
      }
      setCertList(list);
      setCurrentCert(list[0]);
    } else {
      notification.error({ message: "Сертификат на Рутокен не обнаружен" });
    }
  };
  const confirmRotokenPinCide = async (pin) => {
    const { data } = await getReportById(reportId);
    plugin.login(currentRutoken.value, pin).then(async () => {
      var options = {};
      const hash = await plugin.sign(
        currentRutoken.value,
        currentCert.value,
        JSON.stringify(data.content),
        plugin.DATA_FORMAT_PLAIN,
        options
      );
      signRutoken({ reportId, hash, cert: currentCert.data });
    }, handleError);
  };

  useEffect(() => {
    if (eds && eds === 1 && !isSuccessSendPin) {
      sendPinCode();
    }
    if (eds && eds === 2 && !isSuccessSignRutoken) {
      rutokenplugin.ready
        .then(function () {
          const isFirefox =
            !!window.navigator.userAgent.match(/firefox/i) &&
            !window.navigator.userAgent.match(/seamonkey/i);

          if (window.chrome || isFirefox) {
            return rutokenplugin.isExtensionInstalled();
          } else {
            return Promise.resolve(true);
          }
        })
        .then(function (result) {
          if (result) {
            return rutokenplugin.isPluginInstalled();
          } else {
            notification.info({
              message: "Расширение для Рутокен не установлено",
            });
          }
        })
        .then(function (result) {
          if (result) {
            return rutokenplugin.loadPlugin();
          } else {
            notification.info({ message: "Адаптер Рутокен Плагин не найдено" });
          }
        })
        .then(function (plugin) {
          setPlugin(plugin);
        });
    }
    if (
      (eds === 1 && isSuccessConfirmPin) ||
      (eds === 2 && isSuccessSignRutoken)
    ) {
      navigate("/dashboard/reports");
    }
  }, [eds, isSuccessConfirmPin, isSuccessSignRutoken]);
  return (
    <Row gutter={16}>
      <Col span={24}>
        <Card
          bordered={false}
          className="criclebox mb-24"
          title={<Title level={4}>Выберите тип электронной подписи</Title>}
        >
          <Radio.Group onChange={onSetEds} value={eds}>
            <Space direction="vertical">
              <Radio value={1}>Облачное ЭЦП</Radio>
              <Radio value={2}>Рутокен ЭЦП</Radio>
            </Space>
          </Radio.Group>
        </Card>
      </Col>

      {eds && eds == 1 && isSuccessSendPin && (
        <Col span={24}>
          <Card
            bordered={false}
            className="criclebox mb-24"
            title={<Title level={4}>Облачное ЭЦП</Title>}
          >
            <Row gutter={8}>
              <Col span={6}>
                <Input
                  style={{
                    width: "100%",
                  }}
                  placeholder="Введите пин код"
                  onChange={(e) => setPin(e.target.value)}
                />
              </Col>
              <Col span={6}>
                <Button
                  loading={isLoadingConfirmPin}
                  type="primary"
                  style={{
                    background: "#57b6c0",
                    borderColor: "#57b6c0",
                  }}
                  onClick={confirmPinCodeHandler}
                >
                  Подтвердить
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      )}
      {eds && eds == 2 && plugin && (
        <Col span={24}>
          <Card
            bordered={false}
            className="criclebox mb-24"
            title={<Title level={4}>Рутокен</Title>}
          >
            <Row gutter={8} style={{ marginBottom: "16px" }}>
              <Col span={8}>
                <Select
                  placeholder="Выберете устройства"
                  value={currentRutoken}
                  style={{
                    width: "100%",
                  }}
                  options={deviceList}
                  onChange={(value, option) => setCurrentRutoken(option)}
                />
              </Col>
              <Col span={6}>
                <Button
                  type="primary"
                  style={{
                    width: "100%",
                    background: "#57b6c0",
                    borderColor: "#57b6c0",
                  }}
                  onClick={checkDevices}
                  icon={<SyncOutlined />}
                >
                  Обновить список рутокенов
                </Button>
              </Col>
            </Row>
            {Object.keys(currentRutoken).length != 0 && (
              <Row gutter={8} style={{ marginBottom: "16px" }}>
                <Col span={8}>
                  <Select
                    value={currentCert}
                    style={{
                      width: "100%",
                    }}
                    options={certList}
                    onChange={(value, option) => setCurrentCert(option)}
                  />
                </Col>
                <Col span={6}>
                  <Button
                    icon={<SyncOutlined />}
                    type="primary"
                    style={{
                      width: "100%",
                      background: "#57b6c0",
                      borderColor: "#57b6c0",
                    }}
                    onClick={checkCerts}
                  >
                    Обновить список сертификатов
                  </Button>
                </Col>
              </Row>
            )}

            {Object.keys(currentCert).length != 0 && (
              <Row gutter={8}>
                <Col span={8}>
                  <Input
                    style={{
                      width: "100%",
                    }}
                    placeholder="Введите пин код"
                    onChange={(e) => setPin(e.target.value)}
                  />
                </Col>
                <Col span={6}>
                  <Button
                    type="primary"
                    onClick={confirmPinCodeHandler}
                    style={{
                      width: "100%",
                      background: "#57b6c0",
                      borderColor: "#57b6c0",
                    }}
                    icon={<CheckOutlined />}
                  >
                    Подтвердить пин код
                  </Button>
                </Col>
              </Row>
            )}
          </Card>
        </Col>
      )}
    </Row>
  );
};
export default Eds;
