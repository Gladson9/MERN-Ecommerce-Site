import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { emptyCart, loadCart } from "./helper/cartHelper";
import { getToken, processPayment } from "./helper/paymentBraintreeHelper";
import { createOrder } from "./helper/orderHelper";
import { isAuthenticated } from "../auth/helper/index";
import DropIn from "braintree-web-drop-in-react";

const BraintreePayment = ({
  products = [],
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
          // console.log("PAYMENT SUCCESS");
          const orderData = {
            products: products,
            transaction_id: response.transaction.id,
            amount: response.transaction.amount,
          };

          createOrder(userId, token, orderData);
          emptyCart(() => {
            // console.log("Crash check");
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
            <div className="card-color rounded py-3 text-center">
              <p className="fw-bold">USE THESE DETAILS</p>
              <p className="d-flex justify-content-center align-items-center">
                <b className="me-1">Card No:</b> 37828224631000
                <button
                  className="btn ms-2"
                  onClick={() =>
                    navigator.clipboard.writeText("378282246310005")
                  }
                >
                  <i class="bi bi-clipboard text-white fw-bold"></i>
                </button>
              </p>

              <p>
                <b className="me-1">Date:</b> Any future date
              </p>
            </div>
            <h3>Braintree Payment</h3>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button onClick={onPurchase}>Buy</button>
          </div>
        ) : (
          <h3>Add something to cart</h3>
        )}
      </div>
    );
  };

  useEffect(() => {
    getaToken(userId, token);
  }, []);

  return <div className="col-10">{showBraintreeBtnDropIn()}</div>;
};

export default BraintreePayment;
