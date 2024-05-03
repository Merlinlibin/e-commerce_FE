import React, { useState, useEffect } from "react";
import "./Style/Home.css";
import { FaShippingFast } from "react-icons/fa";
import { TbTruckReturn } from "react-icons/tb";
import { RiCustomerService2Fill } from "react-icons/ri";
import { RiSecurePaymentLine } from "react-icons/ri";
import ProductCard from "../components/ProductCard";
import { useSelector } from "react-redux";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";
import Loadder from "../components/Loadder";

function Home() {
  const { products } = useSelector((state) => state.data);
  const { getData, getUser } = useGlobalContext();
  const [activeIndex, setActiveIndex] = useState(0);
  const { user, isAuthenticated, cartCount } = useSelector(
    (state) => state.account
  );
  const carouselItems = [
    {
      src: "https://nuzox.in/public/banner/banner%202%20fashion%20new.jpg",
      alt: "firstImg",
    },
    {
      src: "https://nuzox.in/public/banner/FASHION%20BANNER%20NEW.jpg",
      alt: "secondImg",
    },
  ];

  // Function to handle next slide
  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to handle previous slide
  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
    );
  };

  // Automatic sliding effect
  useEffect(() => {
    //function to get all data
    getData();
    getUser();

    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    // Change the interval (in milliseconds) as needed
    return () => clearInterval(interval);
  }, [ isAuthenticated,cartCount]);

  return (
    <section className="mt-5 pt-2">
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel">
        <div className="carousel-inner">
          {carouselItems.map((item, index) => (
            <div
              key={index}
              className={`carousel-item ${
                index === activeIndex ? "active" : ""
              }`}>
              <img src={item.src} className="d-block w-100" alt={item.alt} />
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev carousel-btn"
          type="button"
          onClick={prevSlide}>
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next carousel-btn"
          type="button"
          style={{ background: "black" }}
          onClick={nextSlide}>
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div class="container mt-5">
        <div class="row">
          <h5 class="c1 fw-bold text-danger">SHOP BY CATEGORY</h5>
        </div>
      </div>
      <div class="container mb-5 p-3  ">
        <div class="row ">
          <div class="col-lg-3 col-6 p-1 p-3 new-c-bx">
            <Link to="/t-shirts">
              <div class="c-main-element category ">
                <img
                  src="https://nuzox.in/public/images/tshirt-new.png"
                  style={{ height: "90px" }}
                  class="tshirt-new-img "
                  alt="tshirt"
                />
              </div>
            </Link>
            <p class="wrap-txt mt-3 c-text">T-SHIRTS</p>
          </div>
          <div class="col-lg-3 col-6 p-1 p-3 text-center new-c-bx">
            <Link to="/pant-casual">
              <div class="c-main-element category">
                <img
                  src="https://nuzox.in/public/images/c-pant.png"
                  style={{ height: "90px" }}
                  class="tshirt-new-img "
                  alt="tshirt"
                />
              </div>
            </Link>
            <p class="wrap-txt mt-3 c-text">CASUAL PANTS</p>
          </div>
          <div class="col-lg-3 col-6 p-1 p-3 text-center new-c-bx">
            <Link to="/pant-cargo">
              <div class="c-main-element category">
                <img
                  src="https://nuzox.in/public/images/cargo-new.png"
                  style={{ height: "90px" }}
                  class="tshirt-new-img "
                  alt="tshirt"
                />
              </div>
            </Link>
            <p class="wrap-txt mt-3 c-text">CARGO PANTS</p>
          </div>
          <div class="col-lg-3 col-6 p-1 p-3 text-center new-c-bx">
            <Link to="/pant-track">
              <div class="c-main-element category">
                <img
                  src="https://nuzox.in/public/images/new-trac.png"
                  style={{ height: "90px" }}
                  class="tshirt-new-img "
                  alt="tshirt"
                />
              </div>
            </Link>
            <p class="wrap-txt mt-3 c-text">TRACK PANTS</p>
          </div>
        </div>
        <div class="container mt-5">
          <div class="row">
            <h5 class="c1 fw-bold text-danger">OUR COLLECTIONS</h5>
          </div>

          {/* Collection List */}
          <div class="container mt-5 mb-5">
            <div className="row">
              {products ? (
                products?.map((product) => (
                  <ProductCard key={product?._id} product={product} />
                ))
              ) : (
                <Loadder />
              )}
            </div>
          </div>

          <div class="row  ">
            <div class="col-lg-3 col-6  mt-3 mt-lg-0">
              <div class="row">
                <div class="col-md-3 col-12  px-2 icon">
                  <FaShippingFast size={56} />
                </div>
                <div class="col-md-9 col-12 ">
                  <h5 class="fw-bold ">Free Shipping</h5>
                  <p>Free shipping is available for all products.</p>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-6  mt-3 mt-lg-0">
              <div class="row">
                <div class="col-md-3 col-12 icon px-2">
                  <TbTruckReturn size={56} />
                </div>
                <div class="col-md-9 col-12  ">
                  <h5 class="fw-bold ">Free Returns</h5>
                  <p>Returns are free within 9 days</p>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-6  mt-3 mt-lg-0">
              <div class="row">
                <div class="col-md-3 col-12  icon px-2">
                  <RiCustomerService2Fill size={56} />
                </div>
                <div class="col-md-9 col-12  ">
                  <h5 class="fw-bold ">Support 24/7</h5>
                  <p>Contact us 24 hours a day</p>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-6  mt-3 mt-lg-0">
              <div class="row">
                <div class="col-md-3 col-12  icon px-2">
                  <RiSecurePaymentLine size={56} />
                </div>
                <div class="col-md-9 col-12 ">
                  <h5 class="fw-bold ">100% Payment Secure</h5>
                  <p>Your payment are safe.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
