import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SINGLE_PROD } from "../reducers/actions/dataAction";
import axios from "axios";
import { useGlobalContext } from "../context";
import { FaCartPlus } from "react-icons/fa6";
import { IoBagHandle } from "react-icons/io5";
import ProductCard from "../components/ProductCard";
import { addToCartSuccess } from "../reducers/actions/userAction";
import { toast } from "react-toastify";

function SingleProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { products, singleProd } = useSelector((state) => state.data);
  const { user, cartCount } = useSelector((state) => state.account);
  const { getUser, getData ,API_URI} = useGlobalContext();
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  function calculateOfferPrice(data) {
    if (data) {
      const price = parseFloat(data?.Price);
      const offerPercentage = parseFloat(data?.offer?.replace("%", ""));
      const discount = price * (offerPercentage / 100);
      const offerPrice = price - discount;
      return offerPrice.toFixed(2);
    }
  }
  const offerPrice = calculateOfferPrice(singleProd);

  async function handleSingleProd(id) {
    const { data } = await axios.get(`${API_URI}/api/data/${id}`);
    dispatch(SINGLE_PROD(data));
  }

  async function addToCart() {
    const token = JSON.parse(localStorage.getItem("token"));

    if (token) {
      try {
        const { data } = await axios.post(
          `${API_URI}/api/auth/addTocart`,
          {
            product: singleProd,
            quantity: +qty,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (data.success) {
          dispatch(addToCartSuccess(parseInt(cartCount) + +qty));

          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error("Error adding to cart:", error.response.data);
      }
    }
  }

  useEffect(() => {
    // Fetch single product data when component mounts

    handleSingleProd(id);
    getUser();
    getData();
    window.scrollTo(0, 0);
    setQty(1);
    setSize("");
  }, [id, cartCount]);

  return (
    singleProd && (
      <div className="my-5 pt-5">
        <div className="row m-0 p-0 mb-5">
          <div className="col-12 col-md-6 d-flex align-items-center justify-content-center mb-3">
            <img
              src={singleProd.image}
              alt=""
              style={{ width: "80%", overflow: "hidden" }}
            />
          </div>
          <div className="col-12 col-md-6 px-4 ">
            <div className="text-center text-md-start">
              <h3>{singleProd.name}</h3>
              <div>
                <h4>
                  ₹{offerPrice}
                  <span
                    className="mx-3 text-secondary"
                    style={{ textDecoration: "line-through" }}>
                    ₹{singleProd?.Price}
                  </span>
                  <span className="text-danger">{singleProd?.offer}</span>
                </h4>
              </div>

              <p className="text-success">
                Inclusive of All Taxes + Free Shipping
              </p>
            </div>
            <div className="container ">
              <p>Sizes :</p>
              <div className="mb-3">
                {singleProd?.sizes?.map((item, i) => (
                  <button
                    type="button"
                    value={item}
                    key={i}
                    style={{
                      margin: "5px",
                      borderRadius: "50%",
                      width: "45px",
                      height: "45px",
                      border: "1px solid #2874F0",
                      backgroundColor: size === item ? "lightblue" : "white",
                    }}
                    onClick={() => setSize(item)}>
                    {item}
                  </button>
                ))}
              </div>
              <div className="d-flex align-items-center justify-content-start mb-3">
                <p className="mx-2 pt-3">Quantity : </p>
                <button
                  className="d-flex justift-content-center align-items-center "
                  style={{
                    width: "25px",
                    height: "25px",
                    border: "1px solid #2874F0",
                    borderRadius: "50%",
                  }}
                onClick={()=>setQty(qty+1)}>
                  +
                </button>
                <input
                  type="number"
                  value={qty}
                  min={1}
                  max={9}
                  step={1}
                  onChange={(e) => setQty(e.target.value)}
                  className="mx-2 "
                  style={{
                    width: "50px",
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
                  onClick={() => setQty(qty -1)}>
                  -
                </button>
              </div>
              <div className="d-flex mb-3">
                <p>Stock : </p>
                <span className="text-success mx-2">in stock </span>
              </div>
              <div className="d-flex align-items-center justify-content-start mb-3">
                <button
                  type="button"
                  class="btn btn-dark  mx-2"
                  style={{
                    backgroundColor: "#F7A317",
                    border: "none",
                    width: "150px",
                    height: "70px",
                  }}
                  onClick={addToCart}>
                  <FaCartPlus className="mx-1" />
                  Add To Cart
                </button>

                <button
                  type="button"
                  class="btn btn-danger mx-2"
                  style={{
                    border: "none",
                    width: "150px",
                    height: "70px",
                  }}
                  onClick={() => {
                    addToCart();
                    navigate("/checkout");
                  }}>
                  <IoBagHandle />
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <h4 className="text-danger my-4">SIMILAR PRODUCTS</h4>
          <div className="row">
            {products &&
              products?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </div>
      </div>
    )
  );
}

export default SingleProduct;
