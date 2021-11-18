import React from "react";
import {
  decreaseItemCount,
  increaseItemCount,
  removeItemFromCart,
} from "./helper/cartHelper";
import ImageHelper from "./helper/ImageHelper";

// import {} from "bootstrap-icons/icons";

const ProductCart = ({ product, reload, setReload }) => {
  return (
    <div className="row mt-4 card-color rounded">
      <div className="col mt-3">
        <ImageHelper
          product={product}
          styles={{ maxHeight: "70%", maxWidth: "70%" }}
        />
      </div>
      <div className="col d-flex flex-column align-items-center justify-content-center">
        <p className="fw-bold fs-5">{product.name}</p>
        <p className="">By {product.author}</p>
        <p className="">Price: ${product.price}</p>
      </div>
      <div className="col d-flex align-items-center justify-content-center">
        <button
          className="fw-bold btn  btn-warning"
          onClick={() => {
            increaseItemCount(product._id);
            setReload(!reload);
          }}
        >
          <i className="bi bi-plus fw-bold"></i>
        </button>
        <p className="px-3 m-0">{product.count}</p>
        <button
          className="btn fw-bold btn-warning"
          onClick={() => {
            decreaseItemCount(product._id);
            setReload(!reload);
          }}
        >
          <i class="bi bi-dash fw-bold"></i>
        </button>
      </div>
      <div className="col d-flex flex-column align-items-center justify-content-center">
        <p className="fw-bold fs-5">$ {product.totalPrice}</p>
      </div>
      <div className="col d-flex flex-column align-items-center justify-content-center">
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className="btn btn-danger px-2"
        >
          Remove from cart
        </button>
      </div>
    </div>
  );
};

export default ProductCart;
