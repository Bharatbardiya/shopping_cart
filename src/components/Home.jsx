import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";

import Loading from "./Loading";

const Home = () => {
  const [ProductList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fatching = async () => {
      try {
        let { data } = await axios.get("https://fakestoreapi.com/products");
        setProductList(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(true);
      }
      // console.log(ProductList);
    };
    fatching();
  }, []);

  const dispatch = useDispatch();

  const addToCartHandler = (options) => {
    dispatch({ type: "addToCart", payload: options });
    dispatch({ type: "calculatePrice" });
    toast.success("Added To Cart");
  };

  if (error) {
    return <div className="error">Something Went Wrong</div>;
  }
  return (
    <div className="home">
      {loading ? (
        <Loading />
      ) : (
        <>
          {ProductList.map((i) => (
            <ProductCard
              key={i.id}
              imgSrc={i.image}
              name={i.title}
              price={i.price * 10}
              id={i.id}
              handler={addToCartHandler}
            />
          ))}
        </>
      )}
    </div>
  );
};

const ProductCard = ({ name, id, price, handler, imgSrc }) => (
  <div className="productCard">
    <img src={imgSrc} alt={name} />
    <p>{name}</p>
    <h4>${price}</h4>
    <button onClick={() => handler({ name, price, id, quantity: 1, imgSrc })}>
      Add to Cart
    </button>
  </div>
);
export default Home;
