import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css';
import Layout from './components/Layout/Layout.jsx'
import Home from './components/Home/Home.jsx'
import Brands from './components/Brands/Brands.jsx'
import Cart from './components/Cart/Cart.jsx'
import Categoris from './components/Categoris/Categoris.jsx'
import Login from './components/Login/Login.jsx'
import Notfound from './components/Notfound/Notfound.jsx'
import Products from './components/Products/Products.jsx'
import Register from './components/Register/Register.jsx'
import UserContextProvider from './Context/UserContext.jsx'
import ProtectRoute from './components/ProtectRoute/ProtectRoute.jsx'
import ProductsDetails from './components/ProductDetails/ProductDetails.jsx'
import CartContextProvider from './Context/CartContext.jsx'
import { ToastBar, Toaster } from 'react-hot-toast'
import CheckOut from './components/CheckOut/CheckOut.jsx';
import AllOrders from './components/AllOrders/AllOrders.jsx';

const routers = createBrowserRouter([
  {
    path: '', 
    element: <Layout />, 
    children: [
      { index: true, element: <ProtectRoute><Home /> </ProtectRoute>},
      { path: 'cart', element: <ProtectRoute><Cart /> </ProtectRoute> },
      { path: 'brands', element: <ProtectRoute><Brands /> </ProtectRoute>},
      { path: 'categories', element: <ProtectRoute><Categoris /> </ProtectRoute> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'products', element: <ProtectRoute><Products /> </ProtectRoute>},
      { path: 'checkout', element: <ProtectRoute><CheckOut /> </ProtectRoute>}, 
      { path: 'allorders', element: <ProtectRoute><AllOrders /> </ProtectRoute>},
      { path: 'ProductDetails/:id', element: <ProtectRoute><ProductsDetails /> </ProtectRoute>},
      { path: '*', element: <Notfound /> },
    ]
  }
]);



function App() {
  return (
    <>
<CartContextProvider>
  <UserContextProvider>
        <RouterProvider router={routers} />
        <Toaster/>
</UserContextProvider>
</CartContextProvider>
    </>
  );
}

export default App;
