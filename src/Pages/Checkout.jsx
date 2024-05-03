import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import axios from "axios";
import CartCard from "../components/CartCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { getUser, getData, setCheckoutProd,API_URI } = useGlobalContext();
  const [sortedCart, setSortedCart] = useState([]);
  const { cartCount } = useSelector((state) => state.account);
  const [mrp, setMrp] = useState();
  const [cartTotal, setCartTotal] = useState();
  const [discount, setDiscount] = useState();
  const navigate = useNavigate();

  const calcMrp = (items) => {
    let totalMRP = 0;
    let totalDiscount = 0;
    let totalPriceAfterDiscount = 0;

    // Iterate over each item
    items.forEach((item) => {
      // Parse the item price and quantity
      const price = parseFloat(item.Price);
      const quantity = item.quantity;

      // Calculate the total MRP for this item
      const itemMRP = price * quantity;
      totalMRP += itemMRP;

      // Calculate the discount for this item
      let itemDiscount = 0;
      if (item.offer && item.offer !== "0%") {
        const offerPercentage = parseFloat(item.offer.replace("%", ""));
        itemDiscount = ((price * offerPercentage) / 100) * quantity;
      }
      totalDiscount += itemDiscount;

      // Calculate the total price after discount for this item
      const itemPriceAfterDiscount = itemMRP - itemDiscount;
      totalPriceAfterDiscount += itemPriceAfterDiscount;
    });
    setMrp(totalMRP.toFixed(2));
    setDiscount(totalDiscount.toFixed(2));
    setCartTotal(totalPriceAfterDiscount.toFixed(2));
  };
  const handleBuyNow = () => {
    const purchasedProd = {
      products: sortedCart,
      totalMrp: mrp,
      totalDiscount: discount,
      totalPayableAmount: cartTotal,
    };
    setCheckoutProd(purchasedProd);
    navigate("/addressVerification");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch cart data
        const token = JSON.parse(localStorage.getItem("token"));
        if (token) {
          const { data } = await axios.get(
            `${API_URI}/api/auth/cartItems`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          processCartData(data.cartItems.cart); // Process the fetched cart data
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    const processCartData = (cart) => {
      if (cart) {
        const uniqueProducts = {};

        // Iterate through each item in the cart
        cart.forEach((product) => {
          // Check if the product already exists in the uniqueProducts object
          if (uniqueProducts[product._id]) {
            // If the product exists, increment its quantity by 1
            uniqueProducts[product._id].quantity++;
          } else {
            // If the product doesn't exist, add it to the uniqueProducts object with quantity 1
            uniqueProducts[product._id] = {
              ...product,
              quantity: 1,
            };
          }
        });

        // Convert the uniqueProducts object into an array of objects
        const processedCart = Object.values(uniqueProducts);
        setSortedCart(processedCart);
      }
    };

    getUser();
    getData();
    fetchData(); // Call the fetchData function
  }, [cartCount]);

  // Call calcMrp function when sortedCart is updated
  useEffect(() => {
    calcMrp(sortedCart);
  }, [sortedCart]);

  return (
    <div className="mt-5 pt-2   ">
      <div className="card">
        <div className="container my-4 mb-0 ">
          <div className="row">
            <h5 className="c1 fw-bold text-danger">SHOPPING CART</h5>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-lg-8">
            {sortedCart &&
              sortedCart?.map((item) => (
                <CartCard key={item._id} item={item} />
              ))}
          </div>
          <div className="col-12 col-lg-4">
            <div className="card my-3 mx-2 mx-lg-3 ">
              <h4 className="mt-3 mx-3">Price Details : </h4>
              <hr className="mx-3" />
              <div className="mx-3 d-flex align-items-center  justify-content-between ">
                <p className="fs-6">Total MRP :</p>
                <p className="w-50 text-end fs-6"> ₹{mrp}</p>
              </div>
              <div className="mx-3 d-flex align-items-center  justify-content-between ">
                <p className="fs-6">Shipping :</p>
                <p className="text-success w-50 text-end fs-6">Free</p>
              </div>
              <div className="mx-3 d-flex align-items-center  justify-content-between">
                <p className="fs-6">Discount :</p>
                <p className="text-danger w-50 text-end fs-6">{discount}</p>
              </div>
              <div className="mx-3 d-flex align-items-center  justify-content-between">
                <p className="fs-6">Cart Total :</p>
                <p className="w-50 fw-bold text-end fs-6"> ₹{cartTotal}</p>
              </div>
              <hr className="mx-3" />
              <div className="mx-3 d-flex align-items-center  justify-content-between">
                <p className="mx-0 fs-6">Total Price : </p>
                <p className="w-50 fw-bold text-end fs-6">₹{cartTotal}</p>
              </div>
              <button
                className="btn btn-success mx-3 my-3 fs-6"
                onClick={handleBuyNow}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
