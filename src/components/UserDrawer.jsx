import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";

import axios from "axios";

import LOGO from "@images/logo/1.svg";
import DARK_LOGO from "@images/logo/3.svg";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { MdOutlineEmail } from "react-icons/md";
import { Button, Col, Drawer, Form, message, Input, Row, Space } from "antd";
import { UserContext } from "@/context/UserContext";
import FadeAnimation from "./Animations/FadeAnimation/FadeAnimation";
import Yanimation from "./Animations/Yanimation/Yanimation";
import useTheme from "@context/ThemeContext";

const UserDrawer = ({ isRegistering, openButton, email }) => {
  const [open, setOpen] = useState(false);

  const [error, setError] = useState("Ha ocurrido un error");
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const { themeMode } = useTheme();
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // Función para manejar los cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };


  const register = async (values) => {
    const { username, email, password, confirmPassword } = values;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_URL}/users/register`,
        { username, email, password, confirmPassword }
      );
      const newUser = await response.data;
      if (!newUser) {
        setError("No se pudo registrar el usuario");
      }
      success();
    } catch (err) {
    
      setError(err.response.data.message);
    
        errorMessage(err.response.data.message);
    
    }
  };

  const updateProfile = async (values) => {
    const {
      username,
      email,
      currentPassword,
      newPassword,
      confirmNewPassword,
    } = values;
    try {
      const data = new FormData();
      data.set("username", username);
      data.set("email", email);
      data.set("currentPassword", currentPassword);
      data.set("newPassword", newPassword);
      data.set("confirmNewPassword", confirmNewPassword);

      const res = await axios.patch(
        `${import.meta.env.VITE_REACT_APP_URL}/users/edit`,
        data,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 200) {
        success();
        setTimeout(() => {
          navigate("/logout");
        }, 1000);
      }
    } catch (err) {
      setError(err.response.data.message);
      errorMessage();
    }
  };

  const handleSetError = () => {
    setError("");
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: `${
        isRegistering
          ? "Registro realizado con éxito"
          : "Usuario actualizado con éxito"
      }`,
    });
    onClose(); // Cierra el Drawer
  };

  const errorMessage = () => {
    messageApi.open({
      type: "error",
      content: error || 'Revisa las credenciales, contraseña poco segura',
    });
  };


  return (
    <>
      {contextHolder}
      <Button
        type={`${themeMode === "dark" ? "primary" : "default"}`}
        className={`${
          themeMode !== "dark"
            ? "text-blue-400 hover:text-blue-500 hover:underline "
            : ""
        } text-[.85rem] ${isRegistering ? "w-[12rem]" : "w-[13rem]"}`}
        onClick={showDrawer}
        icon={isRegistering ? <PlusOutlined /> : <EditOutlined />}
      >
        {openButton}
      </Button>
      <Drawer
        className={`${themeMode === "dark" ? "darkMode" : "lightMode"}`}
        title={
          <Yanimation>
            <div
              className={`${
                themeMode === "dark" ? "text-[#ccc]" : ""
              } flex items-center mt-4`}
            >
              {isRegistering
                ? "Registrarse en Wander Whiskers"
                : "Editar perfil"}
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
          <Form
            layout="vertical"
            onFinish={isRegistering ? register : updateProfile}
          >
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="username"
                  initialValue={`${!isRegistering ? currentUser.username : ""}`}
                  label="Nombre de usuario"
                  rules={[
                    {
                      required: true,
                      message: "Por favor introduce tu nombre",
                    },
                  ]}
                >
                  <Input
                    addonBefore={
                      <FaRegUser
                        className={`${
                          themeMode === "dark" ? "text-white" : ""
                        }`}
                      />
                    }
                    placeholder="Por favor introduce tu nombre"
                    onChange={(e) => {
                      {
                        handleChange(e);
                      }
                      handleSetError();
                    }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  initialValue={`${!isRegistering ? email : ""}`}
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
                    style={{
                      width: "100%",
                    }}
                    addonBefore={
                      <MdOutlineEmail
                        className={`${
                          themeMode === "dark" ? "text-white" : ""
                        }`}
                      />
                    }
                    onChange={(e) => {
                      {
                        handleChange(e);
                      }
                      handleSetError();
                    }}
                    placeholder="Por favor introduce tu email"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                {isRegistering ? (
                  <Form.Item
                    name="password"
                    label="Contraseña"
                    rules={[
                      {
                        required: true,
                        message: "Por favor introduce una contraseña",
                      },
                    ]}
                  >
                    <Input.Password
                      style={{
                        width: "100%",
                      }}
                      addonBefore={
                        <RiLockPasswordLine
                          className={`${
                            themeMode === "dark" ? "text-white" : ""
                          }`}
                        />
                      }
                      onChange={(e) => {
                        handleChange(e);
                        handleSetError();
                      }}
                      placeholder="Por favor introduce tu contraseña"
                    />
                  </Form.Item>
                ) : (
                  <Form.Item
                    name="currentPassword"
                    label="Contraseña actual"
                    rules={[
                      {
                        required: true,
                        message: "Por favor introduce tu contraseña",
                      },
                    ]}
                  >
                    <Input.Password
                      style={{
                        width: "100%",
                      }}
                      addonBefore={
                        <RiLockPasswordLine
                          className={`${
                            themeMode === "dark" ? "text-white" : ""
                          }`}
                        />
                      }
                      value={formData.currentPassword}
                      onChange={(e) => {
                        handleChange(e);
                        handleSetError();
                      }}
                      placeholder="Por favor introduce tu contraseña"
                    />
                  </Form.Item>
                )}
              </Col>
              <Col xs={24} sm={12}>
                {isRegistering ? (
                  <Form.Item
                    name="confirmPassword"
                    label="Confirmar contraseña"
                    dependencies={["password"]}
                    rules={[
                      {
                        required: true,
                        message: "Por favor confirma tu contraseña",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject("Las contraseñas no coinciden");
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      style={{
                        width: "100%",
                      }}
                      addonBefore={
                        <RiLockPasswordLine
                          className={`${
                            themeMode === "dark" ? "text-white" : ""
                          }`}
                        />
                      }
                      onChange={(e) => {
                        handleChange(e);
                        handleSetError();
                      }}
                      placeholder="Por favor confirma tu contraseña"
                    />
                  </Form.Item>
                ) : (
                  <Form.Item
                    name="newPassword"
                    label="Nueva contraseña"
                    rules={[
                      {
                        required: true,
                        message: "Por favor introduce tu nueva contraseña",
                      },
                    ]}
                  >
                    <Input.Password
                      style={{
                        width: "100%",
                      }}
                      addonBefore={
                        <RiLockPasswordLine
                          className={`${
                            themeMode === "dark" ? "text-white" : ""
                          }`}
                        />
                      }
                      value={formData.newPassword}
                      onChange={(e) => {
                        handleChange(e);
                        handleSetError();
                      }}
                      placeholder="Por favor confirma tu contraseña"
                    />
                  </Form.Item>
                )}
              </Col>
            </Row>
            <Row glutter={16}>
              <Col span={24}>
                {!isRegistering && (
                  <Form.Item
                    name="confirmNewPassword"
                    label="Confirma tu nueva contraseña"
                    dependencies={["newPassword"]}
                    rules={[
                      {
                        required: true,
                        message:
                          "Por favor vuelve a introducir tu nueva contraseña",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (
                            !value ||
                            getFieldValue("newPassword") === value
                          ) {
                            return Promise.resolve();
                          }
                          return Promise.reject("Las contraseñas no coinciden");
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      style={{
                        width: "100%",
                      }}
                      addonBefore={
                        <RiLockPasswordLine
                          className={`${
                            themeMode === "dark" ? "text-white" : ""
                          }`}
                        />
                      }
                      value={formData.confirmNewPassword}
                      onChange={(e) => {
                        handleChange(e);
                        handleSetError();
                      }}
                      placeholder="Por favor confirma tu nueva contraseña"
                    />
                  </Form.Item>
                )}
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
                  {isRegistering ? "Registrarse" : "Actualizar perfil"}
                </button>
              </Space>
            </Form.Item>
          </Form>
        </FadeAnimation>
      </Drawer>
    </>
  );
};
export default UserDrawer;
