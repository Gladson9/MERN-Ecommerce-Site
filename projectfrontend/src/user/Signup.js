import { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";
const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: "",
    success: false,
  });
  const { name, email, password, confirmPassword, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      error: false,
      [name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setValues({
        ...values,
        error: "Please make sure your passwords match",
        success: false,
      });
    } else {
      setValues({ ...values, error: false });
      signup({ name, email, password })
        .then((data) => {
          if (data.error) {
            setValues({ ...values, error: data.error, success: false });
          } else {
            setValues({
              ...values,
              name: "",
              email: "",
              password: "",
              error: "",
              success: true,
            });
          }
        })
        .catch(console.log("error in signup"));
    }
  };

  const signUpForm = () => {
    return (
      <div className="row justify-content-center">
        <div className="col-6">
          <form className="row justify-content-center">
            <div className="mb-4 p-0">
              <input
                className="form-control rounded-pill  px-4"
                onChange={handleChange("name")}
                type="text"
                value={name}
                placeholder="Name"
              />
            </div>
            <div className="mb-4 p-0">
              <input
                className="form-control rounded-pill px-4"
                onChange={handleChange("email")}
                type="email"
                value={email}
                placeholder="Email"
              />
            </div>
            <div className="mb-4 p-0">
              <input
                className="form-control rounded-pill px-4"
                onChange={handleChange("password")}
                type="password"
                value={password}
                placeholder="Password"
              />
            </div>
            <div className="mb-4 p-0">
              <input
                className="form-control rounded-pill px-4"
                onChange={handleChange("confirmPassword")}
                type="password"
                value={confirmPassword}
                placeholder="Confirm Password"
              />
            </div>
            <button onClick={onSubmit} className="btn-success btn rounded-pill">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New Account was created successfully .Please{" "}
            <Link to="/signin">Login Here</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign Up">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}

      {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
    </Base>
  );
};

export default Signup;
