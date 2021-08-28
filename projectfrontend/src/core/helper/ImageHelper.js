import React from "react";
import { API } from "../../backend";

const ImageHelper = ({ product }) => {
  const imageURL = product
    ? `${API}/product/photo/${product._id}`
    : "https://images.pexels.com/photos/2148743/pexels-photo-2148743.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260";
  return (
    <div className="rounded border border-success p-2">
      <img
        src={imageURL}
        alt="photo"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        className="mb-3 rounded"
        height="200rem"
        width="300rem"
      />
    </div>
  );
};

export default ImageHelper;
