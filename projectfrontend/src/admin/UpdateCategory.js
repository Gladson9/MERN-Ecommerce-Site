import React, { useState, useEffect } from "react";
import Base from "./../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "./../auth/helper/index";
import { updateCategory, getCategory } from "./helper/adminapicall";

export const UpdateCategory = ({ match }) => {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    name: "",
    loading: false,
    error: "",
    createdCategory: "",
    getaRedirect: false,
  });
  const { name, loading, error, createdCategory, getaRedirect } = values;

  const preload = (categoryId) => {
    // console.log("PRODUCT ID FROM PRELOAD :", productId);
    getCategory(categoryId).then((data) => {
      console.log("DATA: ", data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
        });
        // console.log("Values ", values);
        // console.log("Categories", categories);
      }
    });
  };

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  const successMessage = () => {
    return (
      <div
        className="alert alert-success mt-3"
        style={{ display: createdCategory ? "" : "none" }}
      >
        <h4>{createdCategory} updated successfully</h4>
      </div>
    );
  };
  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger mt-3"
        style={{ display: error ? "" : "none" }}
      >
        <h4>Error updating the Category</h4>
      </div>
    );
  };
  const handleChange = (event) => {
    const value = event.target.value;
    setValues({ name: value });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    updateCategory(match.params.categoryId, user._id, token, values).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            loading: false,
            createdCategory: data.name,
          });
        }
      }
    );
  };
  const createCategoryForm = () => {
    return (
      <form>
        <div className="input-group my-3">
          <input
            onChange={handleChange}
            name="name"
            className="form-control"
            placeholder="Category Name"
            value={name}
            required="required"
          />
        </div>
        <button
          type="submit"
          onClick={onSubmit}
          className="btn btn-outline-success mb-3"
        >
          Update Category
        </button>
      </form>
    );
  };
  return (
    <Base title="Update Category here!" className="container bg-info p-4">
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {errorMessage()}
          {successMessage()}
          {createCategoryForm()}
        </div>
      </div>
    </Base>
  );
};

// export default UpdateCategory;
