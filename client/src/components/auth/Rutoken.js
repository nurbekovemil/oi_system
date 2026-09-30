import { Button, Col, Form, Input, Row, Select, notification,} from "antd";
import { useRutokenMutation } from "../../store/services/auth-service";
import { SyncOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import Link from "antd/lib/typography/Link";
import {
  listRutokenDevices,
  loadRutokenPlugin,
  rutokenFailText,
} from "../../features/auth/rutokenPlugin";

const Rutoken = () => {
  const [pin, setPin] = useState("");

  const [plugin, setPlugin] = useState();
  const [currentRutoken, setCurrentRutoken] = useState({});
  const [deviceList, setDeviceList] = useState([]);
  const [currentCert, setCurrentCert] = useState({});
  const [certList, setCertList] = useState([]);

  const [rutoken] = useRutokenMutation()
  const [scanning, setScanning] = useState(false);

  const showFail = (error) => {
    const text = rutokenFailText(error);
    notification.error({
      message: text.message,
      description: text.href ? (
        <span>
          {text.description}{" "}
          <Link href={text.href} target="_blank">
            {text.hrefText}
          </Link>
        </span>
      ) : (
        text.description
      ),
      duration: 10,
    });
  };

    const handleError = (reason) => {
      let errorCodes = plugin.errorCodes;
      if (isNaN(reason.message)) {
        notification.error({ message: reason });
      }
      if (parseInt(reason.message) == errorCodes.PIN_INCORRECT) {
        notification.error({ message: "Неверный пин код" });
      }
    };

  const checkDevices = async (instance = plugin, isActive = () => true) => {
    if (!instance) return;
    setScanning(true);
    try {
      const devices = await listRutokenDevices(instance);
      if (!isActive()) return;
      if (devices.length > 0) {
        const list = devices.map((device) => ({
          value: device,
          label: `Рутокен ЭЦП #${device}`,
        }));
        setDeviceList(list);
        setCurrentRutoken(list[0]);
      } else {
        setDeviceList([]);
        setCurrentRutoken({});
        showFail(new Error("DEVICE_MISSING"));
      }
    } catch (error) {
      showFail(error);
    } finally {
      setScanning(false);
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

  const confirmRotokenPinCide = async () => {
    plugin.login(currentRutoken.value, pin).then(async () => {
        const {INN: user_inn, serialNumber: company_inn} = currentCert.data
        const props = {
          user_inn,
          company_inn
        }
        await rutoken(props)

    }, handleError);
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const instance = await loadRutokenPlugin();
        if (cancelled) return;
        setPlugin(instance);
        await checkDevices(instance, () => !cancelled);
      } catch (error) {
        if (!cancelled) showFail(error);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 
  return (
    <>
      <Form layout="vertical" className="row-col" onFinish={confirmRotokenPinCide}>
        <Row gutter={8}>
          <Col span={24}>
            <Form.Item>
              <Button
                disabled={!plugin}
                loading={scanning}
                type="default"
                className="auth-refresh-btn"
                style={{ width: "100%" }}
                onClick={() => checkDevices()}
                icon={<SyncOutlined />}
              >
                            Обновить список рутокенов
                </Button>
            </Form.Item>
            <Form.Item label="Выберете устройства">
              <Select
                      placeholder="Выберете устройства"
                      disabled={!deviceList.length}
                      value={currentRutoken.value ?? null}
                      style={{
                        width: "100%",
                      }}
                      options={deviceList}
                      onChange={(value, option) => setCurrentRutoken(option)}
              />
            </Form.Item>
          </Col>
          {
            Object.keys(currentRutoken).length != 0 && <Col span={24}>
            <Form.Item>
              <Button
                      icon={<SyncOutlined />}
                      type="default"
                      className="auth-refresh-btn"
                      style={{ width: "100%" }}
                      onClick={checkCerts}
                    >
                      Обновить список сертификатов
                    </Button>
            </Form.Item>
            <Form.Item label="Выберите сертификат">
              <Select
                disabled={!certList.length}
                value={currentCert.value ?? null}
                style={{
                  width: "100%",
                }}
                options={certList}
                onChange={(value, option) => setCurrentCert(option)}
              />
            </Form.Item>
          </Col>
          }
          {
            Object.keys(currentCert).length != 0 && <Col span={24}>
            <Form.Item label="Введите PIN-код">
              <Input type="text" onChange={(e) => setPin(e.target.value)}/>
            </Form.Item>
          </Col>
          }
        </Row>
      <Form.Item>
        <Button
          disabled={!pin.length > 0}
          type="primary"
          htmlType="submit"
          icon={<UserOutlined />}
          style={{ width: "100%" }}
        >
          Войти
        </Button>
      </Form.Item>
  </Form>
    </>
  );
};

export default Rutoken;
