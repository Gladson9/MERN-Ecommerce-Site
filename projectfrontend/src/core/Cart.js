import React, { useEffect, useState } from "react";

import "../styles.css";
import Base from "./Base";
import BraintreePayment from "./BraintreePayment";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import StripeCheckout from "./StripeCheckout";
import { isAuthenticated } from "./../auth/helper/index";
import { Link } from "react-router-dom";
import ProductCart from "./ProductCart";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const getFinalPrice = () => {
    let amount = 0;
    products.map((product) => {
      amount = amount + product.totalPrice;
    });
    return amount;
  };

  const loadAllProducts = (products) => {
    return (
      <>
        {products.map((product, index) => (
          <ProductCart
            key={product._id}
            product={product}
            setReload={setReload}
            reload={reload}
          />
        ))}
      </>
    );
  };

  return (
    <Base title="Your Basket">
      <div className="row text-center">
        <div className="col-8 text-white">
          {products && products.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <h3 className="text-white">No Products in Cart</h3>
          )}
        </div>
        <div className="row col-4 justify-content-center align-content-start">
          {isAuthenticated() ? (
            <>
              {/* <StripeCheckout
                products={products}
                setReload={setReload}
                reload={reload}
              />
              <div className="text-center my-4 fs-3 fw-bold">or</div> */}
              <h3 className="text-white mb-2">
                Total Amount{" "}
                <span className="text-danger"> ${getFinalPrice()} </span>
              </h3>
              <BraintreePayment products={products} setReload={setReload} />
            </>
          ) : (
            <>
              <h3>Please login to checkout</h3>
              <Link to="/signin">
                <button className="btn btn-warning">Sign In</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </Base>
  );
};

export default Cart;
