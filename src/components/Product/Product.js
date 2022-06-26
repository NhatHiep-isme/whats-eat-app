import React, { useState } from "react";
import "./Product.css";
import { useNavigate } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../reducers/cart";
import { Modal } from "antd";

// const Product = ({ productId, name, basePrice, weightServing, images }) => {
const Product = (item) => {
  const { productId, name, basePrice, weightServing, images } = item;
  const [count, setCount] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.userInfo);

  const addToCart = (e) => {
    e.stopPropagation();
    if (auth.userName) {
      dispatch(addItemToCart({ productId, productDetail: item, count }));
      let secondsToGo = 3;
      const modal = Modal.success({
        title: "Sản phẩm đã được thêm vào giỏ hàng",
        okButtonProps: {
          disabled: true,
          className: "modal-footer-hiden-button",
        },
      });
      const timer = setInterval(() => {
        secondsToGo -= 1;
      }, 1000);
      setTimeout(() => {
        clearInterval(timer);
        modal.destroy();
      }, secondsToGo * 1000);
    } else {
      navigate(`/login`);
    }
  };

  return (
    <div
      className="item-container"
      onClick={() =>
        navigate(`/singleproduct/${productId}`, {
          state: {
            productId: productId,
          },
        })
      }
    >
      {images.length !== 0 && images[0].length !== 0 && (
        <img
          src={images[0][0].url ? images[0][0].url : ""}
          alt={name}
          className="item-img"
        />
      )}
      <h3 className="item-name">{name}</h3>
      <p className="item-quantity">{weightServing}</p>
      <p className="item-price">
        {basePrice?.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })}
      </p>
      <BsCartPlus className="icon" onClick={(e) => addToCart(e)} />
    </div>
  );
};

export default Product;
