import React from "react";
import ImageHelper from "../core/helper/ImageHelper";

const Order = ({ orderDetails }) => {
  return (
    <div className="d-flex border-bottom justify-content-between m-3">
      <div>
        <p className="mb-3">
          <span className="fw-bold">Order Date: </span>
          {new Date(orderDetails.createdAt).toDateString()}
        </p>
        {orderDetails.products.map((product) => (
          <div className="d-flex">
            <ImageHelper
              product={product}
              styles={{ height: "10rem", width: "6rem" }}
            />
            <div className="d-flex flex-column mx-4">
              <p className="fw-bold">{product.name}</p>
              <p>
                <span className="fw-bold">Quantity: </span>
                {product.count}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex flex-column justify-content-between align-items-center">
        <p className="fs-5">
          Order Status : <span className="fw-bold">{orderDetails.status}</span>
        </p>
        <p className="fs-5 fw-bold">Order Total: ${orderDetails.amount}</p>
      </div>
    </div>
  );
};

export default Order;
