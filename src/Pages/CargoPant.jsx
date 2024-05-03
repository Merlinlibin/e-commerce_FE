import React, { useEffect } from "react";
import { useGlobalContext } from "../context";
import { useDispatch, useSelector } from "react-redux";
import { CARGO_PANTS } from "../reducers/actions/dataAction";
import ProductCard from "../components/ProductCard";

function CargoPant() {
  const { getData, getUser } = useGlobalContext();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data
        const data = await getData();
        // Dispatch action with fetched data
        dispatch(CARGO_PANTS(data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getUser();

    fetchData(); // Call fetchData when component mounts
  }, [dispatch]);
  return (
    <div className="mt-5 pt-2 mb-5 ">
      <div class="container mt-5">
        <div class="row">
          <h5 class="c1 fw-bold text-danger">CARGO PANTS</h5>
        </div>
      </div>
      <div class="container mt-3">
        <div className="row">
          {products &&
            products?.map((product) => (
              <ProductCard key={product?._id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default CargoPant;
