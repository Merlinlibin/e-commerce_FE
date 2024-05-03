import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import CasualPant from "./Pages/CasualPant";
import TrackPant from "./Pages/TrackPant";
import TShirt from "./Pages/TShirt";
import CargoPant from "./Pages/CargoPant";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Wishlist from "./Pages/Wishlist";
import SingleProduct from "./Pages/SingleProduct";
import Checkout from "./Pages/Checkout";
import AddressVerification from "./Pages/AddressVerification";
import Payment from "./Pages/Payment";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/t-shirts" element={<TShirt />}></Route>
        <Route path="/pant-casual" element={<CasualPant />}></Route>
        <Route path="/pant-cargo" element={<CargoPant />}></Route>
        <Route path="/pant-track" element={<TrackPant />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/wishlist" element={<Wishlist />}></Route>
        <Route path="/product/:id" element={<SingleProduct />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route
          path="/addressVerification"
          element={<AddressVerification />}></Route>
        <Route path="/payment" element={<Payment />}></Route>
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Bounce
      />

      <Footer />
    </>
  );
}

export default App;
