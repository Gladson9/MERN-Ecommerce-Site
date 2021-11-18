import React, { useEffect, useState } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(false);

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
  }, [reload]);

  return (
    <Base title="Popular Books" description="">
      <div className="row row-cols-4 text-center">
        {products.map((product, index) => {
          return (
            <div
              key={index}
              className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-4"
            >
              <Card product={product} setReload={setReload} reload={reload} />
            </div>
          );
        })}
      </div>
    </Base>
  );
};

export default Home;
