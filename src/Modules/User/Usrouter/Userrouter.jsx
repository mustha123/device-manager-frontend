import React from 'react'
import Header from '../Uscomponent/Header'
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from '../Uscomponent/Login';
import Register from '../Uscomponent/Register';
import Home from '../Uscomponent/Home';
import Devicecontents from '../Uscomponent/Devicecontents';
import Manageprofile from '../Uscomponent/Manageprofile';
import ContentsDetails from '../Uscomponent/ContentsDetails';
import Updatecontents from '../Uscomponent/Updatecontents';
import Checkout from '../Uscomponent/Checkout';
import Carts from '../Uscomponent/Carts';
import About from '../Uscomponent/About';
import Contact from '../Uscomponent/Contact';
import OrderSuccess from '../Uscomponent/Ordersuccess';
import MyOrderDetails from '../Uscomponent/MyOrderDetails';
import MyOrders from '../Uscomponent/MyOrder';

export default function Userrouter() {
  const location= useLocation();
  const noheaderroutes=location.pathname==='/login'||location.pathname==='/register';
  return (
    <div>
     {!noheaderroutes && <Header/>}
      <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/*" element={<Home/>} />
      <Route path="/devicecontents" element={<Devicecontents/>} />
      <Route path="/manageprofile" element={<Manageprofile/>} />
      <Route path="/updatecontents" element={<Updatecontents/>} />
      <Route path="/contentsdetails/:id" element={<ContentsDetails/>} />
      <Route path="/checkout" element={<Checkout/>} />
      <Route path="/carts" element={<Carts/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="/ordersuccess" element={<OrderSuccess/>} />
      <Route path="/myorders" element={<MyOrders />} />
      <Route path="/orderdetails/:orderId" element={<MyOrderDetails />} />

      

      </Routes>
    </div>
  )
}
