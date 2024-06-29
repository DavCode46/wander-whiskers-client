import React, { useContext, useEffect, useState } from "react";
import { Button, Empty, message } from "antd";
import { CartContext } from "@/context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "@/context/UserContext";
import { v4 as uuidv4 } from "uuid";
import DeleteFromCart from "./DeleteFromCart";
import Xanimation from "@/components/Animations/Xanimation/Xanimation";

import FadeAnimation from "@/components/Animations/FadeAnimation/FadeAnimation";
import useTheme from "@context/ThemeContext";

const CartPage = () => {
  const [cart, setCart] = useContext(CartContext);

  const [isLoading, setIsLoading] = useState(false);
  const [productsCart, setProductsCart] = useState([]);
  const [error, setError] = useState("Error al procesar el pago");
  const [messageApi, contextHolder] = message.useMessage();

  const { themeMode } = useTheme();

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  useEffect(() => {
    const fetchProductsCart = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_URL}/users/cart/${currentUser.id}`
        );

        // Obtener todos los identificadores de productos en el carrito
        const productIds = response?.data.reduce((ids, cartItem) => {
          return [...ids, ...cartItem.products];
        }, []);
        // Consultar los detalles de cada producto en el carrito
        const productDetailsPromises = productIds.map((productId) =>
          axios.get(
            `${import.meta.env.VITE_REACT_APP_URL}/products/${productId}`
          )
        );
        const productDetailsResponses = await Promise.all(
          productDetailsPromises
        );
        const productDetails = productDetailsResponses.map(
          (response) => response.data
        );
        setProductsCart(productDetails);
        setCart(productDetails);
      } catch (err) {
        // console.log(err);
      }
      setIsLoading(false);
    };
    fetchProductsCart();
  }, []);

  const handlePay = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_URL}/users/cart/checkout/${
          currentUser.id
        }`,
        {
          cartItems: cart,
        },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.url) {
        success();
        window.location.href = res.data.url; // Obtener la URL de pago de la respuesta
      }
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
      errorMessage();
    }
    setIsLoading(false);
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Procesando pago ...",
    });
  };
  const errorMessage = () => {
    messageApi.open({
      type: "error",
      content: error,
    });
  };

  return (
    <div className="flex flex-col justify-start items-center w-[90%] m-auto h-screen py-10 mt-10">
      {contextHolder}
      <Xanimation>
        <h1
          className={`${
            themeMode === "dark" ? "text-white" : ""
          } text-center font-bold text-2xl mb-5`}
        >
          Carrito de Compras
        </h1>
      </Xanimation>
      {productsCart.length ? (
        <div className="w-full md:w-3/4 lg:w-2/3">
          {productsCart.map((item) => (
            <FadeAnimation key={uuidv4()}>
              <>
                <div
                  key={uuidv4()}
                  className="flex flex-col border border-gray-200 rounded-md p-5 mb-5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h1
                        className={`${
                          themeMode === "dark" ? "text-white" : ""
                        } text-lg font-semibold`}
                      >
                        {item.name}
                      </h1>
                      <p
                        className={`${
                          themeMode === "dark"
                            ? "text-gray-300"
                            : "text-gray-500"
                        }`}
                      >
                        {item.description}
                      </p>
                      <p
                        className={`${
                          themeMode === "dark"
                            ? "text-gray-400"
                            : "text-gray-600"
                        }`}
                      >
                        Precio:{" "}
                        {`${
                          item.name === "Anual"
                            ? item.discountPrice
                            : item.price
                        }`}{" "}
                        €/ud Total:{" "}
                        {`${
                          item.name === "Anual"
                            ? (item.discountPrice * item.quantity).toFixed(2)
                            : (item.price * item.quantity).toFixed(2)
                        }`}{" "}
                        €
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <DeleteFromCart productId={item._id} />
                    </div>
                  </div>
                </div>
              </>
            </FadeAnimation>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[50vh] lg:h-[70vh]">
          <FadeAnimation delay={0.5}>
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{
                height: 100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem",
              }}
              description={
                <div>
                  <span
                    className={`${
                      themeMode === "dark" ? "text-[#ccc]" : ""
                    } mt-[3rem]`}
                  >
                    No se han encontrado{" "}
                    <span
                      className={`${
                        themeMode === "dark"
                          ? "text-dark-primary"
                          : "text-color-btn"
                      }`}
                    >
                      productos en el carro
                    </span>
                  </span>
                  <div className="mt-[3rem]">
                    {" "}
                    {/* Espaciado entre el texto y el botón */}
                    <Link
                      className={`${
                        themeMode === "dark"
                          ? "bg-a-6 hover:bg-a-7"
                          : "bg-color-btn hover:bg-color-btnHover"
                      }  text-white px-3 py-2 rounded-md hover:text-white transition-all duration-300`}
                      to="/"
                    >
                      Ir a inicio
                    </Link>
                  </div>
                </div>
              }
            />
          </FadeAnimation>
        </div>
      )}
      {productsCart.length > 0 && (
        <>
          <Xanimation>
            <Button
              type={`${themeMode === "dark" ? "primary" : "default"}`}
              className="mt-5"
              onClick={handlePay}
            >
              Pagar pedido
            </Button>
          </Xanimation>
        </>
      )}
    </div>
  );
};

export default CartPage;
