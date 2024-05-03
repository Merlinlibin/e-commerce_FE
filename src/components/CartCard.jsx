import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCartSuccess } from "../reducers/actions/userAction";
import { useGlobalContext } from "../context";

function CartCard({ item }) {
  const [qty, setqty] = useState(item.quantity);
  const dispatch = useDispatch();
  const { cartCount } = useSelector((state) => state.account);
  const { API_URI } = useGlobalContext();

  const minusCart = async (id) => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      if (token) {
        const { data } = await axios.post(
          `${API_URI}/api/auth/removecart/${id}`,
          { quantity: 1 },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        dispatch(addToCartSuccess(data.cartItems.cart.length));
        if (data.success) {
          dispatch(addToCartSuccess(parseInt(cartCount) - 1));
          setqty(qty - 1);

          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
  const plusCart = async () => {
    const token = JSON.parse(localStorage.getItem("token"));

    if (token) {
      try {
        const { data } = await axios.post(
          `${API_URI}/api/auth/addTocart `,
          {
            product: item,
            quantity: 1,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (data.success) {
          dispatch(addToCartSuccess(parseInt(cartCount) + 1));
          setqty(qty + 1);

          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }
  };

  const RemoveAll = async (id) => {
    const token = JSON.parse(localStorage.getItem("token"));
    console.log("Hello");
    if (token) {
      const { data } = await axios.post(
        `${API_URI}/api/auth/removecart/${id}`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("req");
      dispatch(addToCartSuccess(data.cartItems.cart.length));
    }
  };
  return (
    <div class="card  my-3 mx-2 mx-lg-3">
      <div class="card-body ">
        <div class="row  d-flex justify-content-between align-items-center">
          <div class="col-md-2 col-lg-2 col-xl-2 my-2">
            <Link>
              <img
                src={item.image}
                className=""
                alt=""
                style={{ width: "70px", height: "70px" }}
              />
            </Link>
          </div>

          <div className="col-md-6 col-lg-3 col-xl-3 py-2 d-flex justift-content-center align-items-center">
            <button
              className="d-flex justift-content-center align-items-center"
              style={{
                width: "25px",
                height: "25px",
                border: "1px solid #2874F0",
                borderRadius: "50%",
              }}
              onClick={plusCart}>
              +
            </button>
            <input
              type="number"
              value={qty}
              min={1}
              max={9}
              step={1}
              onChange={(e) => setqty(e.target.value)}
              className="mx-2 text-center"
              style={{
                width: "35px",
                border: "1px solid #2874F0",
                borderRadius: "8px",
              }}
            />

            <button
              className="d-flex justift-content-center align-items-center"
              style={{
                width: "25px",
                height: "25px",
                border: "1px solid #2874F0",
                borderRadius: "50%",
              }}
              onClick={() => minusCart(item._id)}>
              -
            </button>
          </div>
          <div class="col-md-6 col-lg-2 col-xl-2 col-6 py-2 ">
            <RiDeleteBinLine
              color="red"
              role="button"
              onClick={() => RemoveAll(item._id)}
            />
          </div>
        </div>
        <div class="d-flex justify-content between py-2">
          <h6 class="text-black mb-0 w-75">{item.name}</h6>
          {item.offer === "0%" ? (
            <p class="text-success mb-0 w-25 ">
              ₹ {parseFloat(item.Price * qty).toFixed(2)}
            </p>
          ) : (
            <p class="text-success mb-0 w-25 ">
              ₹{" "}
              {parseFloat(
                (parseFloat(item.offer) / 100) * item.Price * qty
              ).toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartCard;
