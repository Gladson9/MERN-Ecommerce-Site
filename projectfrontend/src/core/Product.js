import React, { useEffect, useState } from "react";
import { getProduct } from "../admin/helper/adminapicall";
import Menu from "./Menu";
import ImageHelper from "./helper/ImageHelper";
import { addItemToCart } from "./helper/cartHelper";

const Product = ({ match }) => {
  const [values, setValues] = useState({
    _id: "",
    name: "",
    author: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    catogories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getaRedirect: false,
    formData: "",
  });
  const {
    _id,
    name,
    author,
    description,
    price,
    stock,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getaRedirect,
    formData,
  } = values;
  const [reload, setReload] = useState(false);

  const preload = (productId) => {
    getProduct(productId).then((data) => {
      console.log("DATA: ", data);
      if (data?.error) {
        setValues({ ...values, error: data.error });
      } else {
        // preloadCategories();
        setValues({
          ...values,
          _id: data._id,
          name: data.name,
          author: data.author,
          description: data.description,
          price: data.price,
          category: data.category._id,
          stock: data.stock,
          formData: new FormData(),
        });
        console.log("Values ", values);
        // console.log("Categories", categories);
      }
    });
  };

  const addToCart = () => {
    addItemToCart(values);
    setReload(!reload);
  };

  useEffect(() => {
    preload(match.params.productId);
  }, [reload]);

  return (
    <div>
      <Menu />
      <div className="container text-white">
        <div className="row">
          <div className="col-md-2">
            <ImageHelper product={values} styles={{ width: "100%" }} />
          </div>
          <div className="col-md-8">
            <h1>{name}</h1>
            <h2 className="fs-5 pb-2 border-bottom fst-italic">
              By <span className="text-info">{author}</span>
            </h2>
            <p>{description}</p>
          </div>
          <div className="col-md-2">
            <div className="border p-3 rounded">
              <p className="fs-3 fw-bold" style={{ color: "#e63f30" }}>
                Price: ${price}
              </p>
              <p className="fw-bold">
                {stock !== 0 ? (
                  <span className="text-success">In Stock</span>
                ) : (
                  <span className="text-danger">Out of Stock</span>
                )}
              </p>
              <button
                disabled={stock === 0}
                onClick={addToCart}
                className="btn btn-warning rounded-pill"
                style={{ width: "100%" }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
