import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { emptyCart, loadCart } from "./helper/cartHelper";
import { getToken, processPayment } from "./helper/paymentBraintreeHelper";
import { createOrder } from "./helper/orderHelper";
import { isAuthenticated } from "../auth/helper/index";
import DropIn from "braintree-web-drop-in-react";

const BraintreePayment = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;
  const getaToken = (userId, token) => {
    getToken(userId, token).then((info) => {
      if (info.error) {
        setInfo({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
      //   console.log("INFO ", info);
    });
  };

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then((data) => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount(),
      };
      processPayment(userId, token, paymentData)
        .then((response) => {
          setInfo({ ...info, success: response.success, loading: false });
          console.log("PAYMENT SUCCESS");
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
        .catch((error) => {
          setInfo({ loading: false, success: false });
          console.log("PAYMENT FAILED");
        });
    });
  };
  const getAmount = () => {
    let amount = 0;
    products.map((product) => {
      amount = amount + product.price;
    });
    return amount;
  };

  const showBraintreeBtnDropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button onClick={onPurchase}>Buy</button>
          </div>
        ) : (
          <h3>Please login or add something to cart</h3>
        )}
      </div>
    );
  };

  useEffect(() => {
    getaToken(userId, token);
  }, []);

  return (
    <div>
      <h3>TEST Braintree</h3>
      {showBraintreeBtnDropIn()}
    </div>
  );
};

export default BraintreePayment;
