import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlistSuccess, getUser } from "../reducers/actions/userAction";
import { useGlobalContext } from "../context";

function ProductCard({ product }) {
  const { user, isAuthenticated, wishlistCount } = useSelector(
    (state) => state.account
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { API_URI } = useGlobalContext();

  function calculateOfferPrice(data) {
    const price = parseFloat(data.Price);
    const offerPercentage = parseFloat(data.offer.replace("%", ""));
    const discount = price * (offerPercentage / 100);
    const offerPrice = price - discount;
    return offerPrice.toFixed(2);
  }
  const offerPrice = calculateOfferPrice(product);

  async function addToWishlist(product) {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!isAuthenticated) {
      return toast.error("Please Login and continue"), navigate("/login");
    }
    if (token) {
      try {
        const { data } = await axios.post(
          `${API_URI}/api/auth/addToWishlist`,
          product,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (data.success) {
          dispatch(addToWishlistSuccess(wishlistCount + 1));

          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error("Error adding to wishlist:", error);
      }
    }
  }

  return (
    <div class="col-lg-3 col-md-4 col-sm-6 col-mb-12 rounded">
      <div className="px-1 py-2 ">
        <div class=" p-lg-2 p-1 card m-0 p-0 shadow  ">
          <div class="card-img">
            <Link to={`/product/${product._id}`}>
              <img
                src={product.image}
                alt="Product Image"
                className="card-img-top"
              />
            </Link>
          </div>
          <div class=" py-1 px-1 card-body ">
            <p
              class=" mb-0  p-0 fw-bold"
              style={{
                fontSize: "14px",
                textWrap: "nowrap",
                overflow: "hidden",
              }}>
              {product.name}
            </p>

            <div className="m-0 p-0">
              <span className="mx-1" style={{ fontSize: "11px" }}>
                ₹ {offerPrice}
              </span>{" "}
              {product.offer !== "0%" && (
                <span
                  class="text-secondary "
                  style={{ textDecoration: "line-through", fontSize: "11px" }}>
                  {product.Price}
                </span>
              )}
              <span
                class="text-danger mx-1"
                style={{ fontSize: "11px" }}>{`${product.offer} Off`}</span>
            </div>
          </div>
          <button
            class="btn heart"
            style={{
              border: "none",
            }}
            onClick={() => {
              addToWishlist(product);
            }}>
            <FaRegHeart />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
