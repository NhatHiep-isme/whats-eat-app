import { Form, Input, message } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import "./ShopRegisterPage.css";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "Vui lòng nhập ${label}!",
  types: {
    email: "${label} không hợp lệ!",
    number: "${label} không hợp lệ!",
  },
};

const ShopRegisterPage = () => {
  const [shopName, setShopName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const token = useSelector((state) => state.auth.userInfo.token);
  const navigate = useNavigate();
  const handleSubmitShopRegister = () => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_ASP_API_KEY}/api/Store/register`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        shopName: shopName,
        email: email,
        phoneNumber: phoneNumber,
        address: address,
        description: description,
      },
    })
      .then((res) => {
        message.success("Thông tin đăng ký của hàng của bạn đã được ghi nhận!");
        navigate("/shop");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="shop-register">
      <div className="shop-register-fluid">
        <div className="shop-register-container">
          <h1 className="title-container">
            Đăng ký trở thành Người bán WhatsEat
          </h1>
          <div className="register-form">
            <Form
              {...layout}
              name="nest-messages"
              validateMessages={validateMessages}
            >
              <Form.Item
                className="input"
                name="name"
                label="Tên Shop"
                rules={[{ required: true }]}
              >
                <Input onChange={(e) => setShopName(e.target.value)} />
              </Form.Item>
              <Form.Item
                className="input"
                name="email"
                label="Email"
                rules={[{ type: "email", required: true }]}
              >
                <Input onChange={(e) => setEmail(e.target.value)} />
              </Form.Item>
              <Form.Item
                className="input"
                name="phone"
                label="Số điện thoại"
                rules={[{ required: true }]}
              >
                <Input onChange={(e) => setPhoneNumber(e.target.value)} />
              </Form.Item>
              <Form.Item
                className="input"
                name="address"
                label="Địa chỉ lấy hàng"
                rules={[{ required: true }]}
              >
                <Input onChange={(e) => setAddress(e.target.value)} />
              </Form.Item>
              <Form.Item className="input" name="description" label="Mô tả">
                <Input.TextArea
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                className="input"
                wrapperCol={{ ...layout.wrapperCol, offset: 8 }}
              >
                <button
                  className="btn submit-btn"
                  onClick={handleSubmitShopRegister}
                >
                  Đăng ký cửa hàng
                </button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShopRegisterPage;
