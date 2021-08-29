import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import ImageHelper from "./helper/ImageHelper";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";

const Card = ({
  product,
  AddToCart = true,
  removeFromCart = false,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [redirect, setredirect] = useState(false);
  const [count, setCount] = useState(product.count);
  const cardTitle = product ? product.name : "A photo from pexels";
  const cardAuthor = product ? product.author : "Default Author";
  const cardPrice = product ? product.price : "Default Price";

  const addToCart = () => {
    addItemToCart(product, () => setredirect(true));
  };
  const getRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };
  const showAddToCart = (AddToCart) => {
    return (
      AddToCart && (
        <button onClick={addToCart} className="btn btn-warning">
          Add to Cart
        </button>
      )
    );
  };
  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className="btn btn-danger"
        >
          Remove from cart
        </button>
      )
    );
  };
  return (
    <div className="row card text-white">
      <div className="col-10 my-3">
        {getRedirect(redirect)}
        <ImageHelper product={product} />
        <div className=" ms-1">{cardTitle}</div>
        <div className=" ms-1">
          By <span className="text-white-50"> {cardAuthor}</span>
        </div>
        <p className=" ms-2 fw-bold text-danger fs-4">$ {cardPrice}</p>
        <div className="col-12">
          <div>{showAddToCart(AddToCart)}</div>
          <div>{showRemoveFromCart(removeFromCart)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
