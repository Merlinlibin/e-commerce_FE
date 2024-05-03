import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { LoginUser } from "../../reducers/actions/userAction";
import { useGlobalContext } from "../../context";

function Signup() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { API_URI } = useGlobalContext();
  const [user, setUser] = useState({
    username: "",
    email: "",
    address: "",
    password: "",
    state: "",
    phone: "",
    pincode: "",
  });

  async function handleSignup() {
    try {
      event.preventDefault();
      setLoading(true);

      console.log(user);

      const res = await axios
        .post(`${API_URI}/api/auth/signup`, user)
        .then((res) => res.data);

      console.log(res);
      if (res.success) {
        toast.success(res.message);

        localStorage.setItem("token", JSON.stringify(res.token));
        localStorage.setItem("User", JSON.stringify(res));
        dispatch(LoginUser(res));

        setLoading(false);
        navigate("/");
      } else {
        toast.error(res.message);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error logging in");
      console.log(error);
      setLoading(false);
    }
  }
  return (
    <div className="mt-5 pt-2 container">
      <div className="my-5 pt-2">
        <h1 className="heading">SIGNUP</h1>

        <form className="container mt-5 row" onSubmit={handleSignup}>
          <div className="col-6">
            <label htmlFor="username" className="username my-3 fw-bold">
              User Name
            </label>
            <div>
              <input
                required
                type="text"
                id="username"
                name="username"
                placeholder="Username "
                className="rounded p-1 form-control"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
            </div>
          </div>
          <div className="col-6">
            <label htmlFor="email" className="username my-3 fw-bold">
              Email
            </label>
            <div>
              <input
                required
                type="email"
                id="email"
                name="email"
                placeholder="Email "
                className="rounded p-1 form-control"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
          </div>

          <div className="col-12">
            <label htmlFor="address" className="password my-3 fw-bold">
              Address
            </label>
            <div className="pass">
              <textarea
                required
                type="text"
                id="address"
                name="address"
                placeholder="Enter your Address"
                className="rounded p-1 form-control"
                style={{ width: "100%" }}
                value={user.address}
                onChange={(e) => setUser({ ...user, address: e.target.value })}
              />
            </div>
          </div>
          <div className="col-6">
            <label htmlFor="password" className="password my-3 fw-bold">
              Password
            </label>
            <div className="pass">
              <input
                required
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Password"
                className="rounded p-1 form-control"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
              <i
                onClick={(e) => setShowPassword(!showPassword)}
                className={
                  showPassword ? "bi bi-eye eye" : "bi bi-eye-slash eye"
                }></i>
            </div>
          </div>
          <div className="col-6">
            <label htmlFor="state" className="username my-3 fw-bold">
              State
            </label>
            <div>
              <input
                required
                type="text"
                id="state"
                name="state"
                placeholder="State "
                className="rounded p-1 form-control"
                value={user.state}
                onChange={(e) => setUser({ ...user, state: e.target.value })}
              />
            </div>
          </div>
          <div className="col-6">
            <label htmlFor="PhoneNumber" className="username my-3 fw-bold">
              Phone
            </label>
            <div>
              <input
                required
                type="number"
                id="phoneNumber"
                name="PhoneNumber"
                placeholder="Phone number "
                className="rounded p-1 form-control"
                value={user.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
              />
            </div>
          </div>
          <div className="col-6">
            <label htmlFor="pincode" className="username my-3 fw-bold">
              Pin Code
            </label>
            <div>
              <input
                required
                type="number"
                id="pincode"
                name="pincode"
                placeholder="Pincode "
                className="rounded p-1 form-control"
                value={user.pincode}
                onChange={(e) => setUser({ ...user, pincode: e.target.value })}
              />
            </div>
          </div>
          <div className="w-full text-left py-4 col-12">
            <button
              type="submit"
              placeholder="Password"
              className="btn btn-danger ">
              {loading ? (
                <div className="flex items-center justify-center">
                  <Oval color="white" height="25" width="25" />
                </div>
              ) : (
                "Signup"
              )}
            </button>
          </div>
        </form>
        <div className="container d-flex flex-column justify-content-cente align-items-center">
          <p className="">
            <span className="">Already have an account? </span>

            <Link to="/login" className="">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
