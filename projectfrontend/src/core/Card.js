import React, { useState } from "react";
import { Link } from "react-router-dom";
import ImageHelper from "./helper/ImageHelper";
import { addItemToCart, itemInCart } from "./helper/cartHelper";

const Card = ({
  product,
  AddToCart = true,
  removeFromCart = false,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [count, setCount] = useState(product.count);
  const cardTitle = product ? product.name : "A photo from pexels";
  const cardAuthor = product ? product.author : "Default Author";
  const cardPrice = product ? product.price : "Default Price";

  const addToCart = () => {
    addItemToCart(product);
    setReload(!reload);
  };
  const showAddToCart = (AddToCart) => {
    return (
      AddToCart && (
        <button
          disabled={product.stock === 0}
          onClick={addToCart}
          className="btn btn-warning"
        >
          {itemInCart(product._id)
            ? showGoToCart()
            : product.stock !== 0
            ? "Add to Cart"
            : "Out of Stock"}
        </button>
      )
    );
  };
  const showGoToCart = () => {
    return (
      <Link style={{ textDecoration: "none", color: "black" }} to="/cart">
        Go to cart
      </Link>
    );
  };
  return (
    <div className="row card text-white">
      <div className="col-10 my-3 ">
        <div className="py-2 card-hover rounded">
          <Link
            style={{ textDecoration: "none" }}
            to={`/products/${product._id}`}
          >
            <ImageHelper product={product} />
            <div className="text-white ms-1">{cardTitle}</div>
            <div className="text-white ms-1">
              By <span className="text-white-50"> {cardAuthor}</span>
            </div>
            <p className=" ms-2 fw-bold text-danger fs-4">$ {cardPrice}</p>
          </Link>
          <div className="col-12">
            <div>{showAddToCart(AddToCart)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
