import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { toast } from "react-toastify";
import Page404 from "../components/Page404";

function AddressVerification() {
  const { getUser, getData, checkouProd, setCheckoutProd } = useGlobalContext();
  const { user, isAuthenticated } = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userA, setUserA] = useState(user);

  const handleVerify = () => {
    setLoading(true);
    const shipDetatis = {
      name: userA?.username,
      email: userA?.email,
      ...checkouProd,
      address: userA?.address,
      pincode: userA?.pincode,
      state: userA?.state,
      contactDetail: userA?.phone,
    };
    setCheckoutProd(shipDetatis);

    setLoading(false);
    navigate("/payment");
  };
  useEffect(() => {
    getUser();
  }, []);
  return isAuthenticated ? (
    <div className="mt-5 pt-4   ">
      <div className="">
        <div className="container my-4 mb-0 ">
          <div className="row">
            <h5 className="c1 fw-bold text-danger">VERIFY ADDRESS</h5>
          </div>
          <div>
            <div className="container mt-5 row">
              <div className="col-6">
                <label htmlFor="username" className="username my-3 fw-bold">
                  User Name
                </label>
                <div>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder={user.username}
                    className="rounded p-1 form-control"
                    value={userA.username}
                    onChange={() =>
                      setUserA({ ...userA, username: event.target.value })
                    }
                  />
                </div>
              </div>
              <div className="col-6">
                <label htmlFor="email" className="username my-3 fw-bold">
                  Email
                </label>
                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder={user.email}
                    className="rounded p-1 form-control"
                    value={userA.email}
                    onChange={() =>
                      setUserA({ ...userA, email: event.target.value })
                    }
                  />
                </div>
              </div>

              <div className="col-12">
                <label htmlFor="address" className="password my-3 fw-bold">
                  Address
                </label>
                <div className="pass">
                  <textarea
                    type="text"
                    id="address"
                    name="address"
                    placeholder={user.address}
                    className="rounded p-1 form-control"
                    style={{ width: "100%" }}
                    value={userA.address}
                    onChange={() =>
                      setUserA({ ...userA, address: event.target.value })
                    }
                  />
                </div>
              </div>

              <div className="col-6">
                <label htmlFor="state" className="username my-3 fw-bold">
                  State
                </label>
                <div>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    placeholder={user.state}
                    className="rounded p-1 form-control"
                    value={userA.state}
                    onChange={() =>
                      setUserA({ ...userA, state: event.target.value })
                    }
                  />
                </div>
              </div>
              <div className="col-6">
                <label htmlFor="PhoneNumber" className="username my-3 fw-bold">
                  Phone
                </label>
                <div>
                  <input
                    type="number"
                    id="phoneNumber"
                    name="PhoneNumber"
                    className="rounded p-1 form-control"
                    placeholder={user.phone}
                    value={userA.phone}
                    onChange={() =>
                      setUserA({ ...userA, phone: event.target.value })
                    }
                  />
                </div>
              </div>
              <div className="col-6">
                <label htmlFor="pincode" className="username my-3 fw-bold">
                  Pin Code
                </label>
                <div>
                  <input
                    type="number"
                    id="pincode"
                    name="pincode"
                    placeholder={user.pincode}
                    className="rounded p-1 form-control"
                    value={userA.pincode}
                    onChange={() =>
                      setUserA({ ...userA, pincode: event.target.value })
                    }
                  />
                </div>
              </div>
              <div className="w-full py-4 col-12 d-flex justify-content-center">
                <button
                  type="submit"
                  placeholder="Password"
                  className="btn btn-danger w-50  "
                  onClick={handleVerify}>
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <Oval color="white" height="25" width="25" />
                    </div>
                  ) : (
                    "Proceed To payment"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Page404 />
  );
}

export default AddressVerification;
