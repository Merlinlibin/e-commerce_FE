import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { T_SHIRT } from "../reducers/actions/dataAction";
import { useGlobalContext } from "../context";
import axios from "axios";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link } from "react-router-dom";

function Wishlist() {
  const { getData, getUser, API_URI } = useGlobalContext();
  const dispatch = useDispatch();
  const [wishlist, setWishlist] = useState([]);

  const fetchWishList = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      const { data } = await axios.get(`${API_URI}/api/auth/wishlistItems`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setWishlist(data.wishlistItems.wishlist);
    }
  };
  const RemoveItem = async (id) => {
    const token = JSON.parse(localStorage.getItem("token"));

    if (token) {
      const { data } = await axios.post(
        `${API_URI}/api/auth/removewishlist/${id}`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setWishlist(data.wishlistItems.wishlist);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        // Fetch data
        const data = await getData();
        // Dispatch action with fetched data
        dispatch(T_SHIRT(data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getUser();
    fetchData(); // Call fetchData when component mounts
    fetchWishList();
  }, [dispatch, getData]); // Add dispatch and getData to the dependency array

  return (
    <div className="mt-5 pt-2   ">
      <div className="card">
        <div className="container my-4 mb-0 ">
          <div className="row">
            <h5 className="c1 fw-bold text-danger">WISHLIST</h5>
          </div>
        </div>

        {wishlist?.length > 0 ? (
          wishlist?.map((item) => (
            <div class="card  my-3 " key={item._id}>
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
                  <div class="col-md-3 col-lg-3 col-xl-3 py-2">
                    <h6 class="text-black mb-0">{item.name}</h6>
                  </div>
                  <div class="col-md-2 col-lg-2 col-xl-2 d-flex col-4 align-items-center">
                    <p class=" m-0  text-success"> In Stock</p>
                  </div>
                  <div class="col-md-3 col-lg-2 col-xl-2 col-5 py-2 ">
                    <RiDeleteBinLine
                      color="red"
                      role="button"
                      onClick={() => RemoveItem(item._id)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div
            className=" d-flex align-items-center justify-content-center "
            style={{ height: "50vh" }}>
            No items in your wishlist
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
