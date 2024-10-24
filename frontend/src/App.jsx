import React from 'react';
import { Route, Routes} from 'react-router-dom'
import Header from './headers/Header';
import CartScreen from './screen/CartSreen';
import HomeSreen from "./screen/HomeSreen";
import PaymentMethodScreen from './screen/PaymentMethodScreen';
import PlaceOrderScreen from './screen/PlaceOrderScreen';
import ProductSreen from "./screen/ProductSreen";
import ShippingAddressScreen from './screen/ShippingAddressScreen';
import SigninScreen from './screen/SigninScreen';
import SignupScreen from './screen/SignupScreen';
import AdminProductScreen from './screen/AdminProductSreen';
import AdminUserScreen from './screen/AdminUserSreen';
import AdminOrderSreen from './screen/AdminOrderSreen';
import UserEditScreen from './screen/UserEditScreen';
import AdminProductCreate from './screen/AdminProductCreate';
import ProfileScreen from './screen/ProfileScreen';
import { Toaster } from "react-hot-toast";
import OrderScreen from './screen/OrderScreen';
import OrderHistoryScreen from './screen/OrderHistoryScreen';
import SearchScreen from './screen/SearchScreen';
import AdministratorSreen from './screen/AdministratorSreen';
import AdminDashboardScreen from './screen/AdminDashboardSreen';


function App() {
  
    return (
<>
  <div className="site-container">
    <Toaster />

    <Header />

    <main>
      <div className="mt-5 container mx-auto">
        <Routes>
          <Route path="/product/:slug" element={<ProductSreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/" element={<HomeSreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/search" element={<SearchScreen />} />
          <Route path="/admin" element={<AdministratorSreen />}>
          <Route path="/admin/dashboard" element={<AdminDashboardScreen />} />
            <Route path="/admin/products" element={<AdminProductScreen />} />
            <Route path="/admin/orders" element={<AdminOrderSreen />} />
            <Route path="/admin/users" element={<AdminUserScreen />} />
          </Route>
          <Route path="/signin" element={<SigninScreen />} />
          <Route path="/shipping" element={<ShippingAddressScreen />} />
          <Route path="/placeorder" element={<PlaceOrderScreen />} />
          <Route path="/payment" element={<PaymentMethodScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
          <Route path="/createproduct" element={<AdminProductCreate />} />
          <Route path="/order/:id" element={<OrderScreen />} />
          <Route path="/orderhistory" element={<OrderHistoryScreen />} />
          <Route path="/admin/user/:id" element={<UserEditScreen />} />
        </Routes>
      </div>
    </main>
  </div>
</>

    )

  }

export default App
