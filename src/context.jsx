import { ALL_PRODUCT } from "./reducers/actions/dataAction";
import axios from "axios";
import { toast } from "react-toastify";
import { createContext, useContext, useState } from "react";
import {
  LoginUser,
  addToCartSuccess,
  addToWishlistSuccess,
} from "./reducers/actions/userAction";
import { useDispatch } from "react-redux";

const AppContext = createContext();


export const AppProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [checkouProd, setCheckoutProd] = useState({});
  const API_URI = "https://e-commerce-be-unjf.onrender.com";

  const getData = async () => {
    try {
      const { data } = await axios.get(`${API_URI}/api/data`);
      if (data) {
        dispatch(ALL_PRODUCT(data));
        return data; // Return the fetched data
      } else {
        throw new Error("No data fetched");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error(error);
      throw error;
    }
  };
  const getUser = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      const res = await axios.get(
       `${API_URI}/api/auth/loggedinUser`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data.success) {
        dispatch(LoginUser(res.data.user));
        dispatch(addToWishlistSuccess(res.data.user.wishlist.length));
        dispatch(addToCartSuccess(res.data.user.cart.length));
      } else {
        toast.error(res.data.message);
      }
    }
  };

  return (
    <AppContext.Provider
      value={{ getData, getUser, checkouProd, setCheckoutProd,API_URI }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
