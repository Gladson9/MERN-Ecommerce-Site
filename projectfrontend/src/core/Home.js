import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { API } from "../backend";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };
  useEffect(() => {
    loadAllProducts();
  }, []);
  return (
    <Base title="Popular Books" description="">
      {/* <h1 className="text-white">All of tshirts</h1> */}
      <div className="row row-cols-4 text-center">
        {products.map((product, index) => {
          return (
            <div
              key={index}
              className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-4"
            >
              <Card product={product} />
            </div>
          );
        })}
      </div>
    </Base>
  );
};

export default Home;
