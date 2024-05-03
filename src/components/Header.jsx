import React, { useEffect, useRef, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa6";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { LuMenu } from "react-icons/lu";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartSuccess,
  addToWishlistSuccess,
  getUser,
  logOutUser,
} from "../reducers/actions/userAction";
import { toast } from "react-toastify";

function Header() {
  const [navToggle, setNavToggle] = useState(true);
  const { user, isAuthenticated, wishlistCount, cartCount } = useSelector(
    (state) => state.account
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("User");

    dispatch(addToCartSuccess(0));
    setNavToggle(true);
    dispatch(logOutUser());
    navigate("/");
    toast.success(`You have logged out successfully!`);
    window.scrollTo(0, 0);
  }
  const handleWishNav = () => {
    if (!isAuthenticated) {
      return toast.error("Please login and continue"), navigate("/login");
    } else {
      navigate("/wishlist");
    }
  };
  const handleCartNav = () => {
    if (!isAuthenticated) {
      return toast.error("Please login and continue"), navigate("/login");
    } else {
      navigate("/checkout");
    }
  };
  useEffect(() => {
    //function to get all user
    getUser();
   
  }),
    [isAuthenticated, wishlistCount, cartCount];

  return (
    <nav class="navbar navbar-expand-lg navbar-light fixed-top shadow ">
      <div class="container-fluid px-lg-5">
        <Link class="navbar-brand" to="/">
          <img
            src="https://nuzox.in/public/images/logo.png"
            className="logo"
            alt="Home_Logo"
            height="36"
          />
        </Link>

        <div className="d-flex">
          <a
            class="nav-link active mx-1 d-lg-none pt-1"
            onClick={handleWishNav}>
            <FaRegHeart />
          </a>

          <a
            class="nav-link active  mx-1 d-lg-none pt-1"
            onClick={handleCartNav}>
            {cartCount > 0 && <span class="cart-count-mob">{cartCount}</span>}
            <FaCartPlus />
          </a>

          <button
            class=" mx-1 d-lg-none"
            style={{ border: "none", backgroundColor: "white" }}
            type="button"
            onClick={() => {
              setNavToggle(!navToggle);
            }}>
            {navToggle ? <LuMenu /> : <AiOutlineClose />}
          </button>
        </div>
        <div
          class={`navbar-collapse  ${navToggle && "collapse"}`}
          id="navbarSupportedContent">
          <ul class="navbar-nav mx-auto mb-2 mb-lg-0 text-center">
            <li class="nav-item">
              <Link
                class="nav-link active"
                to="/"
                onClick={() => {
                  setNavToggle(!navToggle);
                }}>
                Home
              </Link>
            </li>
            <li class="nav-item">
              <Link
                class="nav-link active"
                to="/t-shirts"
                onClick={() => {
                  setNavToggle(!navToggle);
                }}>
                T-Shirt
              </Link>
            </li>
            <li class="nav-item dropdown text-center">
              <a class="nav-link active dropdown-toggle">Pants</a>
              <div class="dropdown-content1 ">
                <Link
                  to="/pant-casual"
                  onClick={() => {
                    setNavToggle(!navToggle);
                  }}>
                  <MdKeyboardDoubleArrowRight style={{ color: "red" }} />
                  Casual Pants
                </Link>
                <Link
                  to="/pant-cargo"
                  onClick={() => {
                    setNavToggle(!navToggle);
                  }}>
                  <MdKeyboardDoubleArrowRight style={{ color: "red" }} />
                  Cargo Pants
                </Link>
                <Link
                  to="/pant-track"
                  onClick={() => {
                    setNavToggle(!navToggle);
                  }}>
                  <MdKeyboardDoubleArrowRight style={{ color: "red" }} />
                  Track Pants
                </Link>
              </div>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link active dropdown-toggle">More</a>
              <div class="dropdown-content2 mx-auto">
                <Link>
                  <MdKeyboardDoubleArrowRight style={{ color: "red" }} />
                  About Us
                </Link>
                <Link>
                  <MdKeyboardDoubleArrowRight style={{ color: "red" }} />
                  Privacy Policy
                </Link>
                <Link>
                  <MdKeyboardDoubleArrowRight style={{ color: "red" }} />
                  Return Policy
                </Link>
                <Link>
                  <MdKeyboardDoubleArrowRight style={{ color: "red" }} />
                  Contact Us
                </Link>
              </div>
            </li>
            <li className=" d-lg-none">
              <hr />
              {!isAuthenticated ? (
                <Link
                  class="nav-link active mx-1 py-1 bg-secondary text-white px-2  cartCount"
                  to="/login"
                  onClick={() => {
                    setNavToggle(!navToggle);
                  }}>
                  Login
                </Link>
              ) : (
                <button
                  class="nav-link active mx-1 py-1 bg-secondary text-white px-2  cartCount w-100 rounded"
                  onClick={() => handleLogout()}>
                  Logout
                </button>
              )}
            </li>
          </ul>
          <div class="cart">
            <Link class="nav-link active d-lg-block d-none" to="/wishlist">
              <FaRegHeart />
            </Link>

            <Link class="nav-link active d-lg-block d-none" to="/checkout">
              {cartCount > 0 && <span class="cart-count">{cartCount}</span>}
              <FaCartPlus />
            </Link>

            {!isAuthenticated ? (
              <Link
                class="nav-link active d-lg-block d-none py-1 bg-secondary text-white px-2 rounded cartCount"
                to="/login"
                onClick={() => {
                  setNavToggle(!navToggle);
                }}>
                Login
              </Link>
            ) : (
              <button
                class="nav-link active d-lg-block d-none py-1 bg-secondary text-white px-2 rounded cartCount"
                onClick={() => handleLogout()}>
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
