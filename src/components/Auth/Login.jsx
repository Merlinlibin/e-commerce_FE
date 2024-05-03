import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { LoginUser } from "../../reducers/actions/userAction";
import { useGlobalContext } from "../../context";

function Login() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.account);
  const dispatch = useDispatch();
    const { API_URI } = useGlobalContext();

  const handleLogin = async () => {
    try {
      event.preventDefault();
      setLoading(true);
      const userDetails = { password, email };

     
      const res = await axios
        .post(`${API_URI}/api/auth/login`, userDetails)
        .then((res) => res.data);

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
  };
  useEffect(() => {
    window.scrollTo(0,0)
  })
  return (
    <div className="my-5 py-5 container login">
      <div className="">
        <h1 className="heading">LOGIN</h1>

        <form
          className="container mt-5 d-flex flex-column justify-content-cente align-items-center"
          onSubmit={handleLogin}>
          <div className="">
            <label htmlFor="username" className="username my-3 fw-bold">
              Email
            </label>
            <div>
              <input
                required
                type="email"
                id="username"
                name="username"
                placeholder="Email "
                className="rounded p-1 form-control "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="">
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i
                onClick={(e) => setShowPassword(!showPassword)}
                className={
                  showPassword ? "bi bi-eye eye" : "bi bi-eye-slash eye"
                }></i>
            </div>
          </div>
          <div className="w-full text-left py-4">
            <button
              type="submit"
              placeholder="Password"
              className="btn btn-danger ">
              {loading ? (
                <div className="flex items-center justify-center">
                  <Oval color="white" height="25" width="25" />
                </div>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
        <div className="container d-flex flex-column justify-content-cente align-items-center">
          <p className="">
            <span className="">Don't have an account? </span>

            <Link to="/signup" className="">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
