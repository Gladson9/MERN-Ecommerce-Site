import { useState } from "react";
import Base from "../core/Base";
import { Redirect } from "react-router-dom";

import { signin, authenticate, isAuthenticated } from "../auth/helper";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;

  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      error: false,
      [name]: event.target.value,
    });
  };
  const onSubmit = (event) => {
    // console.log(values);
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch(console.log("signin request failed"));
  };

  const handleGuestLogin = (e) => {
    e.preventDefault();
    const email = "guest@bookbasket.com";
    const password = "guest@bookbasket123";
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch(console.log("signin request failed"));
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        // return <Redirect to="/user/dashboard" />;
        return <Redirect to="/" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };
  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
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

  const signInForm = () => {
    return (
      <div className="row justify-content-center">
        <div className="col-6">
          <form className="row justify-content-center">
            <div className="mb-4 p-0">
              <input
                onChange={handleChange("email")}
                value={email}
                className="form-control rounded-pill  px-4"
                type="email"
                placeholder="Email"
              />
            </div>
            <div className="mb-4 p-0">
              <input
                onChange={handleChange("password")}
                value={password}
                className="form-control rounded-pill  px-4"
                type="password"
                placeholder="Password"
              />
            </div>
            <button onClick={onSubmit} className="btn-success btn rounded-pill">
              Submit
            </button>
            <button
              onClick={handleGuestLogin}
              className="btn-primary btn rounded-pill mt-4"
            >
              Login as Guest
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="SignIn">
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
      {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
    </Base>
  );
};

export default Signin;
