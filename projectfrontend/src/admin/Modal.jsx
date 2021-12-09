import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/helper";
import { getOrderStatus, updateStatus } from "./helper/adminapicall";

const Modal = ({ order, reload, setReload }) => {
  const [orderStatus, setOrderStatus] = useState();
  const { user, token } = isAuthenticated();
  const [status, setStatus] = useState();
  //   console.log(order);

  const handleSubmit = () => {
    updateStatus(user._id, token, order._id, status)
      .then((data) => {
        // console.log(data);
        setReload(!reload);
        setStatus("");
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    setStatus(order?.status);
    // console.log(order);
  }, [order]);

  useEffect(() => {
    getOrderStatus(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrderStatus(data);
      }
    });
    // setStatus(order?.status);
  }, []);

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content text-dark">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Order Details
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="d-flex justify-content-between">
              <p>
                {" "}
                <span className="fw-bold">Order ID:</span> {order?._id}
              </p>
              <p>
                {" "}
                <span className="fw-bold">Order Date:</span>{" "}
                {new Date(order?.createdAt).toDateString()}
              </p>
            </div>
            <div>
              <p>
                <span className="fw-bold">Customer Name:</span>{" "}
                {order.user.name}
              </p>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total Price</th>
                </tr>
              </thead>
              <tbody>
                {order?.products.map((product) => (
                  <tr>
                    <td>{product.name}</td>
                    <td>{product.count}</td>
                    <td>{product.count * product.price}</td>
                  </tr>
                ))}
                <tr>
                  <th scope="row" colspan="2">
                    Total Price
                  </th>
                  <td className="fw-bold">$ {order?.amount}</td>
                </tr>
              </tbody>
            </table>
            <label className="fw-bold">Order Status: </label>
            <select
              className="form-select ms-2"
              style={{ width: "auto", display: "inline" }}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {orderStatus?.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={handleSubmit}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
