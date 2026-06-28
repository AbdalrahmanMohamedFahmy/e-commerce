import React, { useContext, useState, useEffect } from "react";
import style from "./Navbar.module.css";
import logo from "../../assets/images/freshcart-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dark, setDark] = useState(false);

  let { userToken, setuserToken } = useContext(UserContext);
  let { cart } = useContext(CartContext);
  let navigate = useNavigate();



useEffect(() => {
  const savedMode = localStorage.getItem("theme");

  if (savedMode === "dark") {
    document.documentElement.classList.add("dark");
    setDark(true);
  } else {
    document.documentElement.classList.remove("dark");
    setDark(false);
  }
}, []);



 function toggleDarkMode() {
  setDark((prev) => {
    if (prev) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    return !prev;
  });
}
  function LogOut() {
    localStorage.removeItem("usertaken");
    setuserToken(null);
    navigate("/login");
  }

  return (
    <>
      <header className=" dark:bg-gray-950 bg-white  fixed inset-x-0 top-0 z-50 transition">
        <nav className="flex items-center justify-between px-6 py-3 lg:px-8">
          
         
          <Link to={"/"} className="lg:pe-4">
            <img src={logo} width={120} alt="FreshCart Logo" />
          </Link>

         
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(true)}
              className="p-2.5 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
            >
              ☰
            </button>
          </div>

         
          {userToken && (
            <div className="hidden lg:flex lg:gap-x-4 capitalize">
              <NavLink to={"/"} className="text-gray-900 dark:text-white">
                home
              </NavLink>
              <NavLink to={"brands"} className="text-gray-900 dark:text-white">
                brands
              </NavLink>
              <NavLink to={"categories"} className="text-gray-900 dark:text-white">
                categories
              </NavLink>
              <NavLink to={"products"} className="text-gray-900 dark:text-white">
                products
              </NavLink>
            </div>
          )}

        
          <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center space-x-3">
            
           
            <button
              onClick={toggleDarkMode}
              className="px-3 py-1 rounded bg-white text-white dark:bg-black dark:text-black transition"
            >
              {dark ? "☀️" : "🌙"}
            </button>

            {/* Social */}
            <ul className="flex space-x-2 text-gray-800 dark:text-white">
              <li><i className="fab fa-facebook-f"></i></li>
              <li><i className="fab fa-x-twitter"></i></li>
              <li><i className="fab fa-instagram"></i></li>
              <li><i className="fab fa-telegram-plane"></i></li>
            </ul>

            {userToken ? (
              <>
                <NavLink to={"cart"} className="relative text-gray-900 dark:text-white">
                  🛒  
                  <span className="absolute -bottom-1 left-3 text-xs text-white bg-green-500 px-1 rounded">
                    {cart?.numOfCartItems}
                  </span>
                </NavLink>

                <span
                  onClick={LogOut}
                  className="cursor-pointer text-gray-900 dark:text-white"
                >
                  Log Out
                </span>
              </>
            ) : (
              <>
                <NavLink to={"register"} className="text-gray-900 dark:text-white">
                  Register
                </NavLink>
                <NavLink to={"login"} className="text-gray-900 dark:text-white">
                  Login →
                </NavLink>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className={isOpen ? "lg:hidden" : "hidden"}>
          <div className="fixed inset-y-0 right-0 w-full sm:max-w-sm bg-white dark:bg-gray-900 p-6 z-50">
            
            <div className="flex justify-between items-center">
              <img src={logo} width={120} />
              <button onClick={() => setIsOpen(false)} className="text-gray-700 dark:text-white">
                ✕
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {userToken && (
                <>
                  <NavLink to={"/"} className="block text-gray-900 dark:text-white">home</NavLink>
                  <NavLink to={"cart"} className="block text-gray-900 dark:text-white">cart</NavLink>
                  <NavLink to={"brands"} className="block text-gray-900 dark:text-white">brands</NavLink>
                  <NavLink to={"categories"} className="block text-gray-900 dark:text-white">categories</NavLink>
                  <NavLink to={"products"} className="block text-gray-900 dark:text-white">products</NavLink>
                </>
              )}

              {userToken ? (
                <span onClick={LogOut} className="block text-gray-900 dark:text-white">
                  Log Out
                </span>
              ) : (
                <>
                  <NavLink to={"register"} className="block text-gray-900 dark:text-white">Register</NavLink>
                  <NavLink to={"login"} className="block text-gray-900 dark:text-white">Login</NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}