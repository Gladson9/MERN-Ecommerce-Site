import { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getUserOrders } from "./helper/userapicalls";
import Order from "./Order";

const UserDashBoard = () => {
  const {
    user: { name, email, _id },
    token,
  } = isAuthenticated();
  const [orders, setOrders] = useState();

  const preload = () => {
    getUserOrders(_id, token)
      .then((data) => {
        setOrders(data);
        // console.log(data);
      })
      .catch((err) => console.log("Fetch Orders", err));
  };

  useEffect(() => {
    preload();
  }, []);

  const userInformation = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header bg-info">User Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge bg-info mr-2 p-2">Name:</span> {name}
          </li>
          <li className="list-group-item">
            <span className="badge bg-info mr-2 p-2">Email:</span> {email}
          </li>
        </ul>
      </div>
    );
  };

  const userOrders = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header bg-info">Your Orders</h4>
        <div className="bg-light">
          {orders &&
            orders.map((order, index) => (
              <Order key={index} orderDetails={order} />
            ))}
        </div>
      </div>
    );
  };
  return (
    <Base title="User DashBoard" className="container p-4">
      <div className="row">
        <div className="col-12">{userInformation()}</div>
        <div className="col-12">{userOrders()}</div>
      </div>
    </Base>
  );
};

export default UserDashBoard;
