import React, { useContext } from "react";
import style from "./Home.module.css";
import { UserContext } from "../../Context/UserContext";
import RecentProducts from "../RecentpPoducts/RecentpPoducts.jsx";
import Cart from "../Cart/Cart.jsx";
import Products from "../Products/Products.jsx";
import Brands from "../Brands/Brands.jsx";
import Loading from "../Loading/Loading.jsx";
import MainSlider from "../MainSlider/MainSlider.jsx";
import CategorySlider from "../CategorySlider/CategorySlider.jsx";

export default function Home() {
  return (
    <>
      <MainSlider />
      <CategorySlider  />
      <RecentProducts />
    </>
  );
}
