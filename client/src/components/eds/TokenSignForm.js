import { Button, Col, Input, Row, Select, notification } from "antd";
import { CheckOutlined, SyncOutlined } from "@ant-design/icons";
import Link from "antd/lib/typography/Link";
import { useEffect, useState } from "react";
import {
  TOKEN_SOFTWARE,
  getTokenAdapter,
  signWithToken,
  stopJcSession,
  tokenErrorText,
} from "../../features/auth/tokenHardware";
import { useLazyGetReportSignPayloadQuery } from "../../store/services/report-service";
import { useSignTokenMutation } from "../../store/services/eds-service";

const TokenSignForm = ({ kind, reportId, onSuccess }) => {
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [deviceList, setDeviceList] = useState([]);
  const [currentDevice, setCurrentDevice] = useState({});
  const [certList, setCertList] = useState([]);
  const [currentCert, setCurrentCert] = useState({});
  const [getSignPayload] = useLazyGetReportSignPayloadQuery();
  const [signToken] = useSignTokenMutation();
  const adapter = getTokenAdapter(kind);
  const software = TOKEN_SOFTWARE[kind];
  const title = kind === "jacarta" ? "JaCarta" : "EnoToken";

  const showPluginHelp = (error) => {
    notification.error({
      message: tokenErrorText(error, `${title} недоступен`),
      description: (
        <span>
          Установите{" "}
          <Link href={software.href} target="_blank">
            {software.name}
          </Link>
          {software.pluginHref && (
            <>
              {" "}
              и{" "}
              <Link href={software.pluginHref} target="_blank">
                расширение для Chrome
              </Link>
            </>
          )}
          {kind === "jacarta" &&
            ". Откройте https://localhost:24738 и примите сертификат."}
        </span>
      ),
      duration: 10,
    });
  };

  const loadCerts = async (deviceId, { silent } = {}) => {
    const certs = await adapter.listCerts(deviceId);
    if (!certs.length) {
      setCertList([]);
      setCurrentCert({});
      if (!silent) {
        notification.warning({
          message: `Сертификат на ${title} пока не виден`,
          description: "Введите PIN-код и нажмите «Подписать».",
        });
      }
      return;
    }
    const options = certs.map((cert) => ({
      value: cert.id,
      label: cert.label,
      data: cert,
    }));
    setCertList(options);
    setCurrentCert(options[0]);
  };

  const checkDevices = async () => {
    setScanning(true);
    try {
      const devices = await adapter.listDevices();
      if (!devices.length) {
        setDeviceList([]);
        setCurrentDevice({});
        setCertList([]);
        setCurrentCert({});
        notification.error({
          message: `${title} не обнаружен`,
          description:
            kind === "enotoken"
              ? "Подключите токен и запустите ESMART PKI Client."
              : "Подключите токен к компьютеру",
        });
        return;
      }
      const list = devices.map((device) => ({
        value: device.id,
        label: device.label,
      }));
      setDeviceList(list);
      setCurrentDevice(list[0]);
      setCertList([]);
      setCurrentCert({});
      await loadCerts(list[0].value, { silent: true });
    } catch (error) {
      showPluginHelp(error);
    } finally {
      setScanning(false);
    }
  };

  useEffect(() => {
    checkDevices();
    return () => {
      if (kind === "jacarta") stopJcSession();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind]);

  const onSign = async () => {
    const deviceId = currentDevice?.value;
    if (deviceId == null) {
      notification.error({ message: "Выберите устройство" });
      return;
    }
    if (!pin) {
      notification.error({ message: "Введите PIN-код" });
      return;
    }
    setLoading(true);
    try {
      const { payload } = await getSignPayload(reportId).unwrap();
      const { signature, cert } = await signWithToken(
        kind,
        deviceId,
        currentCert.value,
        pin,
        payload,
        currentCert.data
      );
      await signToken({
        reportId,
        tokenKind: kind,
        signature,
        payload,
        cert,
      }).unwrap();
      onSuccess?.();
    } catch (error) {
      if (error?.data || error?.status) return;
      notification.error({
        message: tokenErrorText(error, `Ошибка подписания ${title}`),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Row gutter={8} style={{ marginBottom: "16px" }}>
        <Col span={8}>
          <Select
            placeholder="Выберите устройство"
            disabled={!deviceList.length}
            value={currentDevice.value}
            style={{ width: "100%" }}
            options={deviceList}
            onChange={async (value, option) => {
              const selected =
                option || deviceList.find((item) => item.value === value);
              setCurrentDevice(selected || { value });
              setCertList([]);
              setCurrentCert({});
              if (value == null) return;
              try {
                await loadCerts(value);
              } catch (error) {
                notification.error({
                  message: tokenErrorText(error, "Ошибка чтения сертификатов"),
                });
              }
            }}
          />
        </Col>
        <Col span={6}>
          <Button
            type="primary"
            loading={scanning}
            style={{ width: "100%", background: "#57b6c0", borderColor: "#57b6c0" }}
            onClick={checkDevices}
            icon={<SyncOutlined />}
          >
            Обновить список устройств
          </Button>
        </Col>
      </Row>
      {currentDevice.value != null && (
        <Row gutter={8} style={{ marginBottom: "16px" }}>
          <Col span={8}>
            <Select
              placeholder="Выберите сертификат"
              disabled={!certList.length}
              value={currentCert.value}
              style={{ width: "100%" }}
              options={certList}
              onChange={(value, option) => {
                setCurrentCert(
                  option ||
                    certList.find((item) => item.value === value) ||
                    { value }
                );
              }}
            />
          </Col>
          <Col span={6}>
            <Button
              icon={<SyncOutlined />}
              type="primary"
              style={{ width: "100%", background: "#57b6c0", borderColor: "#57b6c0" }}
              onClick={() =>
                loadCerts(currentDevice.value).catch((error) => {
                  notification.error({
                    message: tokenErrorText(error, "Ошибка чтения сертификатов"),
                  });
                })
              }
            >
              Обновить список сертификатов
            </Button>
          </Col>
        </Row>
      )}
      {currentDevice.value != null && (
        <Row gutter={8}>
          <Col span={8}>
            <Input.Password
              placeholder="Введите PIN-код"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
          </Col>
          <Col span={6}>
            <Button
              type="primary"
              loading={loading}
              disabled={!pin}
              onClick={onSign}
              style={{ width: "100%", background: "#57b6c0", borderColor: "#57b6c0" }}
              icon={<CheckOutlined />}
            >
              Подписать
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
};

export default TokenSignForm;
