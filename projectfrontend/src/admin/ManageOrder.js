import React from "react";
import Base from "./../core/Base";
import { Link } from "react-router-dom";

const ManageOrder = () => {
  return (
    <Base title="Manage Orders">
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <h1 className="text-white text-center">Under Development</h1>
    </Base>
  );
};

export default ManageOrder;
