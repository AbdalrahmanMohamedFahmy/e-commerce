import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState(null);

  async function addProductTooCart(productId) {
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        {
          headers: {
            token: localStorage.getItem("usertaken"),
          },
        },
      );
      getProductsCart();
      toast.success(data.message);
    } catch (err) {
      console.log(err);
      toast.error("error");
    }
  }

  async function uptadeProductcountTooCart(productId, count) {
    try {
      let { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        {
          headers: {
            token: localStorage.getItem("usertaken"),
          },
        },
      );
      setCart(data);
      toast.success(data.status, {
        duration: 1000,
      });
    } catch (err) {
      console.log(err);
      toast.error("error");
    }
  }

  async function deleteProductCart(productId) {
    try {
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          headers: {
            token: localStorage.getItem("usertaken"),
          },
        },
      );
      setCart(data);
      toast.success("Product removed");
    } catch (err) {
      console.log(err);
      toast.error("error");
    }
  }

  async function getProductsCart() {
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("usertaken"),
          },
        },
      );
      console.log(data);
      setCart(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("usertaken")) {
      getProductsCart();
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        addProductTooCart,
        cart,
        deleteProductCart,
        uptadeProductcountTooCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
