import { Button, Col, Form, Input, Row, Select, notification,} from "antd";
import { useLoginMutation, useRutokenMutation } from "../../store/services/auth-service";
import { SyncOutlined, UserOutlined } from "@ant-design/icons";
import rutokenplugin from "@aktivco/rutoken-plugin";
import { useEffect, useState } from "react";
import Link from "antd/lib/typography/Link";

const Rutoken = () => {
  const [pin, setPin] = useState("");

  const [plugin, setPlugin] = useState();
  const [currentRutoken, setCurrentRutoken] = useState({});
  const [deviceList, setDeviceList] = useState([]);
  const [currentCert, setCurrentCert] = useState({});
  const [certList, setCertList] = useState([]);

  const [rutoken] = useRutokenMutation()
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
    try {
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
    } catch (error) {
      notification.info({ message: error});
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

  useEffect( () => {
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
          notification.error({
            message: "Адаптер Рутокен Плагин не установлен в браузере",
            btn: <Link href="https://chromewebstore.google.com/detail/%D0%B0%D0%B4%D0%B0%D0%BF%D1%82%D0%B5%D1%80-%D1%80%D1%83%D1%82%D0%BE%D0%BA%D0%B5%D0%BD-%D0%BF%D0%BB%D0%B0%D0%B3%D0%B8%D0%BD/ohedcglhbbfdgaogjhcclacoccbagkjg?hl=ru" target="_blank">
            Установить плагин для браузера
          </Link>,
          duration: 8
          });
        }
      })
      .then(function (result) {
        if (result) {
          return rutokenplugin.loadPlugin();
        } else {
          notification.error({ message: "Рутокен Плагин не установлено в компьютере", btn: <Link href="https://download.rutoken.ru/Rutoken_Plugin/4.8.0.0/Windows/RutokenPlugin.msi">Скачать плагин для ОС</Link> });
        }
      })
      .then(function (plugin) {
        setPlugin(plugin);
      })
  }, []); 
  return (
    <>
      <Form layout="vertical" className="row-col" onFinish={confirmRotokenPinCide}>
        <Row gutter={8}>
          <Col span={24}>
            <Form.Item label="Выберете устройства">
            <Select
                    placeholder="Выберете устройства"
                    value={currentRutoken}
                    style={{
                      width: "100%",
                    }}
                    options={deviceList}
                    onChange={(value, option) => setCurrentRutoken(option)}
            />
            </Form.Item>
            <Form.Item>
            <Button
              disabled={!plugin}
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
            </Form.Item>
          </Col>
          {
            Object.keys(currentRutoken).length != 0 && <Col span={24}>
            <Form.Item label="Выберите сертификат">
              <Select
                value={currentCert}
                style={{
                  width: "100%",
                }}
                options={certList}
                onChange={(value, option) => setCurrentCert(option)}
              />
            </Form.Item>
            <Form.Item>
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
            </Form.Item>
          </Col>
          }
          {
            Object.keys(currentCert).length != 0 &&           <Col span={24}>
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
          style={{
            width: "100%",
            background: "#57b6c0",
            borderColor: "#57b6c0",
          }}
        >
          Войти
        </Button>
      </Form.Item>
  </Form>
    </>
  );
};

export default Rutoken;
