import React, { useEffect, useState } from "react";
import Base from "./../core/Base";
import { Link } from "react-router-dom";
import { getAllOrders } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
import Modal from "./Modal";

const ManageOrder = () => {
  const [allOrders, setAllOrders] = useState(null);
  const { user, token } = isAuthenticated();
  const [orderData, setOrderData] = useState();
  const [reload, setReload] = useState(false);
  const preload = () => {
    getAllOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setAllOrders(data);
        // console.log(allOrders);
      }
    });
  };

  const openModal = (order) => {
    setOrderData(order);
  };

  useEffect(() => {
    preload();
  }, [reload]);

  return (
    <Base title="Manage Orders">
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>

      <table className="table table-hover table-dark table-striped text-white w-100 text-center">
        <thead>
          <tr>
            <th scope="col">Order ID</th>
            <th scope="col">Username</th>
            <th scope="col">Order Date</th>
            <th scope="col">Quantity</th>
            <th scope="col">Amount</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {allOrders &&
            allOrders.map((order, index) => (
              <tr
                key={order._id}
                onClick={() => openModal(order)}
                style={{ cursor: "pointer" }}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <th scope="row">{order._id}</th>
                <td>{order.user.name}</td>
                <td>{new Date(order.createdAt).toDateString()}</td>
                <td>{order.products.length}</td>
                <td>$ {order.amount}</td>
                <td className={order.status.toLowerCase()}>{order.status}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <Modal order={orderData} reload={reload} setReload={setReload} />
    </Base>
  );
};

export default ManageOrder;
