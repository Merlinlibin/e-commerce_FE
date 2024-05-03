import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGlobalContext } from "../context";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Page404 from "../components/Page404";

function Payment() {
  const { user, isAuthenticated } = useSelector((state) => state.account);
  const { getUser, checkouProd, setCheckoutProd,API_URI } = useGlobalContext();

  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const confirmOrder = async () => {
    setLoading(true);
    const order = { ...checkouProd, paymentMode: paymentMethod };

    if (paymentMethod) {
      const token = JSON.parse(localStorage.getItem("token"));
      if (token) {
        const { data } = await axios.post(
          `${API_URI}/api/order`,
          {
            orderDetails: order,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const OrderDetail = data.myOrder;
        const paymentDetail = data.orderPaymentDetail;

        if (OrderDetail) {
          if (paymentMethod === "cashOnDelivery") {
            const { data } = await axios.post(
              `${API_URI}/api/handleCod`,
              { userId: user._id },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            if (data.success) {
              setLoading(false);
              toast.success("Your Order has been placed with COD");
              navigate("/");
            } else {
              setLoading(false);
              toast.error("error placing your order please try again");
              navigate("/");
            }
          } else {
            var options = {
              key: "rzp_test_tKLoJePvdHQVVV",
              amount: paymentDetail.amount,
              currency: paymentDetail.currency,
              name: "Mens wear",
              description: "Purchase Transaction",
              image: "https://example.com/your_logo",
              order_id: paymentDetail.id,
              handler: async function (response) {
                const body = {
                  ...response,
                  order_recipt_id: OrderDetail.order_recipt_id,
                  userId: user._id,
                };
                const { data } = await axios.post(
                  `${API_URI}/api/order/validate`,
                  body,
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                );

                if (data.success) {
                  setLoading(false);
                  toast.success(
                    "Your Payment is Successful, Your Order has been placed"
                  );
                  navigate("/");
                }
              },
              prefill: {
                name: OrderDetail.name,
                email: OrderDetail.email,
                contact: OrderDetail.contactDetail,
              },
              notes: {
                address: OrderDetail.address,
              },
              theme: {
                color: "#3399cc",
              },
            };
            var rzp1 = new window.Razorpay(options);
            rzp1.on("payment.failed", function (response) {
              alert(response.error.code);
              alert(response.error.description);
              alert(response.error.source);
              alert(response.error.step);
              alert(response.error.reason);
              alert(response.error.metadata.order_id);
              alert(response.error.metadata.payment_id);
            });
            rzp1.open();
            event.preventDefault();
          }
        }
      }
    } else {
      setLoading(false);
      toast.error("Please select a payment method.");
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return isAuthenticated ? (
    <div className="my-5 py-4">
      <div className="">
        <div className="container my-4 mb-0">
          <div className="row">
            <h5 className="c1 fw-bold text-danger">Payment</h5>
          </div>
        </div>
        <div className="container my-3 mb-3 d-flex flex-column flex-md-row align-items-center justify-content-center gap-3 fw-bold text-secondary">
          <div className="row">
            <div className="col-4 text-end">
              <input
                type="radio"
                name="payment"
                id="payonline"
                value="payOnline"
                onChange={handlePaymentChange}
              />
            </div>
            <div className="col-8">
              <label htmlFor="payonline">Pay Online</label>
            </div>

            <div className="col-4 text-end">
              <input
                type="radio"
                name="payment"
                id="cod"
                value="cashOnDelivery"
                onChange={handlePaymentChange}
              />
            </div>
            <div className="col-8">
              <label htmlFor="cod">Cash On Delivery</label>
            </div>
          </div>
          <button
            className="btn btn-primary d-flex align-items-center justify-content-center"
            onClick={confirmOrder}
            style={{ width: "154px" }}>
            {loading ? (
              <div>
                <Oval color="white" height="25" width="25" />
              </div>
            ) : (
              "Confirm Order"
            )}
          </button>
        </div>
      </div>
    </div>
  ) : (
    <Page404 />
  );
}

export default Payment;
