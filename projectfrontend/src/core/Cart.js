import React, { useEffect, useState } from "react";

import "../styles.css";
import Base from "./Base";
import BraintreePayment from "./BraintreePayment";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import StripeCheckout from "./StripeCheckout";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div className="row row-cols-xl-2  row-cols-md-2 row-cols-sm-1">
        {products.map((product, index) => (
          <Card
            key={index}
            product={product}
            AddToCart={false}
            removeFromCart={true}
            setReload={setReload}
            reload={reload}
          />
        ))}
      </div>
    );
  };

  return (
    <Base title="Your Basket">
      <div className="row text-center">
        <div className="col-6">
          {products && products.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <h3>No Products in Cart</h3>
          )}
        </div>
        <div className="row col-6 justify-content-center align-content-start">
          <StripeCheckout
            products={products}
            setReload={setReload}
            reload={reload}
          />
          <div className="text-center my-4 fs-3 fw-bold">or</div>
          <BraintreePayment products={products} setReload={setReload} />
        </div>
      </div>
    </Base>
  );
};

export default Cart;
