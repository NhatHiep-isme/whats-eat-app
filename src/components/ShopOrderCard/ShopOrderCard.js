import React, { useState, useContext } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useLocation } from "react-router-dom";

import AppContext from "../../context/AppContext";
import "./ShopOrderCard.css";
import ShopOrderItem from "./ShopOrderItem";

const ShopOrderCard = ({
  orderId,
  customer,
  orderDetails,
  paymentMethod,
  orderStatusHistories,
}) => {
  const [isAccepted, setIsAccepted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);
  const token = useSelector((state) => state.auth.userInfo.token);
  const location = useLocation();
  const { storeId } = location.state;

  const { triggerReload, setTriggerReload } = useContext(AppContext);

  const handleAcceptOrder = () => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_ASP_API_KEY}/api/Store/${storeId}/orders/accept`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        orderId: orderId,
        message: ".",
      },
    })
      .then((res) => {
        setIsAccepted(true);
        setTriggerReload(!triggerReload);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCompleteOrder = () => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_ASP_API_KEY}/api/Store/${storeId}/orders/complete`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        orderId: orderId,
        message: ".",
      },
    })
      .then((res) => {
        setIsComplete(true);
        setTriggerReload(!triggerReload);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancelOrder = () => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_ASP_API_KEY}/api/Store/${storeId}/orders/cancel`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        orderId: orderId,
        message: ".",
      },
    })
      .then((res) => {
        setTriggerReload(!triggerReload);
        setIsCanceled(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="order-card">
      <div className="order-card-nav">
        <p>Ng?????i mua: {customer.name ? customer.name : "Default name"}</p>
        <p>ID ????n h??ng: {orderId}</p>
      </div>
      {orderDetails.length > 0 &&
        orderDetails.map((order, idx) => (
          <>
            <ShopOrderItem
              key={idx}
              {...order}
              {...paymentMethod}
              id={orderId}
              status={
                orderStatusHistories.length > 0
                  ? orderStatusHistories
                  : "???? giao"
              }
            />
          </>
        ))}
      {orderStatusHistories.length > 0 &&
        orderStatusHistories[orderStatusHistories.length - 1].orderStatus
          .value === "waiting" && (
          <button onClick={handleAcceptOrder}>
            {isAccepted ? "???? nh???n ????n" : "Ch???p nh???n"}
          </button>
        )}

      {orderStatusHistories.length > 0 &&
        orderStatusHistories[orderStatusHistories.length - 1].orderStatus
          .value === "delivering" && (
          <button onClick={handleCompleteOrder}>
            {isComplete ? "???? giao h??ng" : "Giao h??ng"}
          </button>
        )}

      {orderStatusHistories.length > 0 &&
        orderStatusHistories[orderStatusHistories.length - 1].orderStatus
          .value === "waiting" && (
          <button onClick={handleCancelOrder}>
            {isCanceled ? "???? h???y ????n" : "H???y ????n"}
          </button>
        )}
    </div>
  );
};

export default ShopOrderCard;
