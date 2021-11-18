import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";

import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../backend";
import { createOrder } from "./helper/orderHelper";
import { emptyCart, loadCart } from "./helper/cartHelper";

const StripeCheckout = ({
  products = [],
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });
  const [shippingAddress, setShippingAddress] = useState({
    line1: "G L Compound, Near GPM College",
    line2: "",
    city: "Kasaragod",
    country: "India",
    postal_code: 671323,
  });
  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const getFinalPrice = () => {
    let amount = 0;
    products.map((product) => {
      amount = amount + product.price;
    });
    return amount;
  };

  const makePayment = (token) => {
    const body = {
      token,
      products,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log("Line 53 Responese", response);

        const { status } = response;
        console.log("STATUS", status);
        const orderData = {
          products: products,
          transaction_id: response.transaction.id,
          amount: response.transaction.amount,
        };
        createOrder(userId, token, orderData);
        emptyCart(() => {
          console.log("Crash check");
        });
        setReload(!reload);
      })
      .catch((err) => console.log("Stripe 68", err));
  };
  const showStripeButton = () => {
    return isAuthenticated() ? (
      <StripeCheckoutButton
        stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
        token={makePayment}
        amount={getFinalPrice() * 100}
        name="Buy Products"
        email="guest@bookbasket.com"
        // shippingAddress
      >
        <button className="btn btn-success">Pay with Stripe</button>
      </StripeCheckoutButton>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Signin</button>
      </Link>
    );
  };

  return (
    <div>
      <h3 className="text-white mb-5">Total Amount ${getFinalPrice()}</h3>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;
