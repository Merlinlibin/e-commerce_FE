import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { T_SHIRT } from "../reducers/actions/dataAction";
import { useGlobalContext } from "../context";

function TShirt() {
  const { getData, getUser } = useGlobalContext();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data
        const data = await getData();
        // Dispatch action with fetched data
        dispatch(T_SHIRT(data)); // Dispatch action with fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getUser();
    fetchData(); // Call fetchData when component mounts
  }, [dispatch, getData]); // Add dispatch and getData to the dependency array

  return (
    <div className="mt-5 pt-2 mb-5 ">
      <div className="container mt-5">
        <div className="row">
          <h5 className="c1 fw-bold text-danger">T - SHIRTS</h5>
        </div>
      </div>
      <div className="container mt-3">
        <div className="row">
          {products &&
            products.map((product) => (
              <ProductCard key={product?._id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default TShirt;
