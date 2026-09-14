import { Button, Col, Form, Input, Row, Select, notification } from "antd";
import { SyncOutlined, UserOutlined } from "@ant-design/icons";
import Link from "antd/lib/typography/Link";
import { useEffect, useState } from "react";
import {
  TOKEN_SOFTWARE,
  getTokenAdapter,
  loginWithToken,
  stopJcSession,
  tokenErrorText,
} from "../../features/auth/tokenHardware";
import {
  useGetTokenChallengeMutation,
  useLoginTokenMutation,
} from "../../store/services/auth-service";

const errorText = (error, fallback) => tokenErrorText(error, fallback);

const TokenLoginForm = ({ kind }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [deviceList, setDeviceList] = useState([]);
  const [currentDevice, setCurrentDevice] = useState({});
  const [certList, setCertList] = useState([]);
  const [currentCert, setCurrentCert] = useState({});
  const [getChallenge] = useGetTokenChallengeMutation();
  const [loginToken] = useLoginTokenMutation();
  const software = TOKEN_SOFTWARE[kind];
  const adapter = getTokenAdapter(kind);
  const title = kind === "jacarta" ? "JaCarta" : "EnoToken";

  const showPluginHelp = (error) => {
    notification.error({
      message: errorText(error, `${title} недоступен`),
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
          description: "Введите PIN-код и нажмите «Войти».",
        });
      }
      return;
    }
    const list = certs.map((cert) => ({
      value: cert.id,
      label: cert.label,
      data: cert,
    }));
    setCertList(list);
    setCurrentCert(list[0]);
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

  useEffect(() => () => {
    if (kind === "jacarta") stopJcSession();
  }, [kind]);

  const onLogin = async (values) => {
    const pinValue = values?.pin || form.getFieldValue("pin");
    const deviceId = currentDevice?.value;
    const certOption =
      currentCert?.data != null
        ? currentCert
        : certList.find((item) => item.value === currentCert?.value) ||
          currentCert;
    const certId = certOption?.value;
    if (deviceId == null) {
      notification.error({ message: "Выберите устройство" });
      return;
    }
    if (!pinValue) {
      notification.error({ message: "Введите PIN-код" });
      return;
    }
    setLoading(true);
    try {
      await loginWithToken(
        kind,
        deviceId,
        certId,
        pinValue,
        {
          getChallenge: async () => getChallenge().unwrap(),
          loginToken: (body) => loginToken(body).unwrap(),
        },
        certOption.data
      );
    } catch (error) {
      if (error?.status != null) return;
      notification.error({
        message: errorText(error, `Ошибка входа через ${title}`),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} layout="vertical" className="row-col" onFinish={onLogin}>
      <Row gutter={8}>
        <Col span={24}>
          <Form.Item>
            <Button
              htmlType="button"
              type="default"
              loading={scanning}
              className="auth-refresh-btn"
              style={{ width: "100%" }}
              onClick={checkDevices}
              icon={<SyncOutlined />}
            >
              Обновить список устройств
            </Button>
          </Form.Item>
          <Form.Item label="Выберите устройство">
            <Select
              placeholder="Выберите устройство"
              disabled={!deviceList.length}
              value={currentDevice.value}
              style={{ width: "100%" }}
              options={deviceList}
              onChange={(value, option) => {
                const selected = option || deviceList.find((item) => item.value === value);
                setCurrentDevice(selected || { value });
                setCertList([]);
                setCurrentCert({});
                if (value != null) {
                  loadCerts(value).catch((error) => {
                    notification.error({
                      message: errorText(error, "Ошибка чтения сертификатов"),
                    });
                  });
                }
              }}
            />
          </Form.Item>
        </Col>
        {currentDevice.value != null && (
          <Col span={24}>
            <Form.Item label="Выберите сертификат">
              <Select
                disabled={!certList.length}
                value={currentCert.value}
                style={{ width: "100%" }}
                options={certList}
                onChange={(value, option) => {
                  setCurrentCert(
                    option || certList.find((item) => item.value === value) || { value }
                  );
                }}
              />
            </Form.Item>
          </Col>
        )}
        {currentDevice.value != null && (
          <Col span={24}>
            <Form.Item
              label="Введите PIN-код токена"
              name="pin"
              rules={[{ required: true, message: "Введите PIN-код" }]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
        )}
      </Row>
      <Form.Item>
        <Button
          loading={loading}
          type="primary"
          htmlType="submit"
          icon={<UserOutlined />}
          style={{ width: "100%" }}
        >
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TokenLoginForm;
