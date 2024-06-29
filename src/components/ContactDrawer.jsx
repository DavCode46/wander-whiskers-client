import { useState } from "react";
import LOGO from "@images/logo/1.svg";
import DARK_LOGO from "@images/logo/3.svg";
import emailjs from "@emailjs/browser";
import Confetti from "react-confetti";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import useTheme from "@context/ThemeContext";

import Yanimation from "@/components/Animations/Yanimation/Yanimation";
import FadeAnimation from "@/components/Animations/FadeAnimation/FadeAnimation";
import {
  Form,
  Button,
  Col,
  Drawer,
  Input,
  FloatButton,
  Row,
  Space,
  message
} from "antd";
import { QuestionOutlined } from "@ant-design/icons";

const ContactDrawer = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("Ha ocurrido un error");
  const { themeMode } = useTheme();

  const [messageApi, contextHolder] = message.useMessage();

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
    if (isSent) setIsSent(false);
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content:
        "Mensaje enviado con éxito, responderemos a la mayor brevedad posible",
    });
    onClose();
  };

  const errorMessage = () => {
    messageApi.open({
      type: "error",
      content: error || "Ha ocurrido un error al enviar el mensaje",
    });
  };

  const handleSubmit = () => {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;

    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const templateEmailParams = {
      from_name: name,
      from_email: email,
      contact_number: phone,
      to_name: "Wander Whiskers",
      message: contactMessage,
    };

    emailjs
      .send(serviceId, templateId, templateEmailParams, publicKey)
      .then(() => {
        setName("");
        setEmail("");
        setContactMessage("");
        setPhone("");
        setIsSent(true);
      });
    success().catch((err) => {
      // console.log("Error sending email:", err);
      setError("Ha ocurrido un error al enviar el mensaje");
      errorMessage();
    });
  };

  return (
    <>
      {contextHolder}

      <FloatButton
        type={`${themeMode === "dark" ? "primary" : ""}`}
        onClick={showDrawer}
        icon={<QuestionOutlined />}
        shape="square"
      />

      <Drawer
        className={`${themeMode === "dark" ? "darkMode" : "lightMode"}`}
        title={
          <Yanimation>
            <div
              className={`${
                themeMode === "dark" ? "text-[#ccc]" : ""
              } flex items-center mt-4`}
            >
              Formulario de contacto
              {themeMode === "light" ? (
                <img
                  src={LOGO}
                  alt="wander whiskers logo"
                  className="w-[4rem] h-auto"
                />
              ) : (
                <img
                  src={DARK_LOGO}
                  alt="wander whiskers logo"
                  className="w-[4rem] h-auto"
                />
              )}
            </div>
          </Yanimation>
        }
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <FadeAnimation>
          {!isSent ? (
            <Form layout="vertical" onFinish={handleSubmit}>
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="username"
                    label="Tu nombre completo"
                    rules={[
                      {
                        required: true,
                        message: "Introduce tu nombre",
                      },
                    ]}
                  >
                    <Input
                      addonBefore={
                        <FaRegUser
                          className={`${
                            themeMode === "dark" ? "text-dark-white" : ""
                          }`}
                        />
                      }
                      placeholder="Introduce tu nombre"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="phone"
                    label="Teléfono"
                    rules={[
                      {
                        type: "tel",
                        message: "Por favor introduce un teléfono válido",
                      },
                      {
                        required: true,
                        message: "Por favor introduce tu teléfono",
                      },
                    ]}
                  >
                    <Input
                      addonBefore={
                        <FaPhone
                          className={`${
                            themeMode === "dark" ? "text-dark-white" : ""
                          } text-md`}
                        />
                      }
                      placeholder="Introduce tu teléfono"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      {
                        type: "email",
                        message: "Por favor introduce un email válido",
                      },
                      {
                        required: true,
                        message: "Por favor introduce tu email",
                      },
                    ]}
                  >
                    <Input
                      addonBefore={
                        <MdOutlineMail
                          className={`${
                            themeMode === "dark" ? "text-dark-white" : ""
                          } text-lg`}
                        />
                      }
                      placeholder="Introduce tu email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="message"
                    label="Mensaje"
                    rules={[
                      {
                        required: true,
                        message: "Por favor introduzca su mensaje",
                      },
                    ]}
                  >
                    <Input.TextArea
                      placeholder="Su mensaje"
                      resize="none"
                      rows={6}
                      value={message}
                      onChange={(e) => setContactMessage(e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item>
                <Space>
                  <button
                    className={`${
                      themeMode === "dark"
                        ? " bg-gray-400 hover:bg-transparent text-white"
                        : "text-color-dark"
                    } border rounded-md py-1 px-3 transition-all duration-300`}
                    onClick={onClose}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className={`${
                      themeMode === "dark"
                        ? "bg-dark-primary hover:bg-a-6"
                        : "bg-color-btn hover:bg-color-btnHover"
                    } transition-all duration-300  text-white px-3 py-1 rounded-md mt-5'`}
                  >
                    ¡Enviar mensaje!
                  </button>
                </Space>
              </Form.Item>
            </Form>
          ) : (
            <div className="flex flex-col items-center justify-center h-[50vh]">
              <Confetti width={window.innerWidth} height={window.innerHeight} />
              <h3 className="text-green-500 text-xl font-bold mb-4">
                ¡Mensaje enviado con éxito!
              </h3>
              <p
                className={`${
                  themeMode === "dark" ? "text-dark-white" : ""
                } mb-5`}
              >
                ¡Gracias por contactarnos!
              </p>
              <p
                className={`${
                  themeMode === "dark" ? "text-dark-white" : ""
                } mb-5`}
              >
                Responderemos a la mayor brevedad posible
              </p>
              <Button
                className={`${
                  themeMode === "dark"
                    ? "bg-dark-primary hover:bg-a-6"
                    : "bg-color-btn hover:bg-color-btnHover"
                } transition-all duration-300  text-white px-3 py-1 rounded-md mt-5'`}
                onClick={onClose}
              >
                Cerrar
              </Button>
            </div>
          )}
        </FadeAnimation>
      </Drawer>
    </>
  );
};
export default ContactDrawer;
