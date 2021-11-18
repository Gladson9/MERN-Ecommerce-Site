import React from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
const Base = ({
  title = "My title",
  className = "bg-dark text-white p-4",
  children,
}) => {
  return (
    <>
      <Link to="/" className="text-decoration-none">
        <h2 className="text-white text-center fw-light my-4 logo ">
          BookBasket
        </h2>
      </Link>
      <Menu />
      <div className="container">
        <div className="jumbotron text-white text-center">
          <h2 className="display-6">{title}</h2>
        </div>
        <div className={className}>{children}</div>
      </div>
    </>
  );
};
export default Base;
