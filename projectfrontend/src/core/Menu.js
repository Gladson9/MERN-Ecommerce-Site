import React from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/helper";
import { cartItemsCount } from "./helper/cartHelper";

const currentTab = (history, path) => {
  //history is provided by Link
  if (history.location.pathname === path) {
    return { color: "#ffc107" };
  } else {
    return { color: "#FFFFFF" };
  }
};

const Menu = ({ history }) => {
  return (
    <nav className="my-5">
      <ul className="nav justify-content-center ">
        <li className="nav-item mx-2">
          <Link style={currentTab(history, "/")} className="nav-link" to="/">
            HOME
          </Link>
        </li>
        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className="nav-item mx-2">
            <Link
              style={currentTab(history, "/user/dashboard")}
              className="nav-link"
              to="/user/dashboard"
            >
              DASHBOARD
            </Link>
          </li>
        )}
        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className="nav-item mx-2">
            <Link
              style={currentTab(history, "/admin/dashboard")}
              className="nav-link"
              to="/admin/dashboard"
            >
              A. DASHBOARD
            </Link>
          </li>
        )}
        <li className="nav-item mx-2 position-relative">
          <Link
            style={currentTab(history, "/cart")}
            className="nav-link"
            to="/cart"
          >
            CART
            <span className="position-absolute top-5 start-100 translate-middle badge rounded-pill bg-danger">
              {cartItemsCount()}
            </span>
          </Link>
        </li>
        {!isAuthenticated() && (
          <>
            <li className="nav-item mx-2">
              <Link
                style={currentTab(history, "/signup")}
                className="nav-link"
                to="/signup"
              >
                SIGNUP
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link
                style={currentTab(history, "/signin")}
                className="nav-link"
                to="/signin"
              >
                SIGNIN
              </Link>
            </li>
          </>
        )}

        {isAuthenticated() && (
          <li className="nav-item mx-2">
            <span
              className="signout nav-link text-danger"
              onClick={() => {
                signout(() => {
                  history.push("/");
                });
              }}
            >
              SIGNOUT
            </span>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default withRouter(Menu);
