import { Form, Input, message, Modal } from "antd";
import "antd/dist/antd.css";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Footer from "../../components/Footer/Footer";
import ShopSidebar from "../../components/ShopSidebar/ShopSidebar";
import "./ShopProfile.css";

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

const ShopProfile = () => {
  const token = useSelector((state) => state.auth.userInfo.token);

  const onFormFinish = (values) => {
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_ASP_API_KEY}/api/Store/info`,
      headers: { Authorization: `Bearer ${token}` },
      data: values,
    })
      .then((res) => {
        message.success("Thay đổi thông tin thành công!");
      })
      .catch((err) => {
        console.log(err);
        message.error("Thay đổi thông tin thất bại!");
      });
  };

  return (
    <div className="shop-profile">
      <div className="shop-profile-fluid">
        <div className="shop-profile-container">
          <ShopSidebar />
          <div className="content-container">
            <h1 className="title">Hồ Sơ Shop</h1>
            <p className="note">
              Xem tình trạng Shop và cập nhật hồ sơ Shop của bạn
            </p>
            <div className="basic-info">
              <h3>Thông tin cơ bản</h3>
              <div className="detail-info">
                <div className="register-form">
                  <Form
                    {...layout}
                    name="nest-messages"
                    validateMessages={validateMessages}
                    onFinish={onFormFinish}
                  >
                    <Form.Item
                      className="input"
                      name="shopName"
                      label="Tên Shop"
                    >
                      <Input placeholder="Nhập tên shop mới..." />
                    </Form.Item>
                    <Form.Item
                      className="input"
                      name="phoneNumber"
                      label="Số điện thoại"
                    >
                      <Input placeholder="Nhập số điện thoại mới..." />
                    </Form.Item>
                    <Form.Item
                      className="input"
                      name="address"
                      label="Địa chỉ lấy hàng"
                    >
                      <Input placeholder="Nhập địa chỉ mới..." />
                    </Form.Item>
                    <Form.Item
                      className="input"
                      name="description"
                      label="Mô tả"
                    >
                      <Input.TextArea placeholder="Nhập mô tả mới..." />
                    </Form.Item>
                    <Form.Item
                      className="input"
                      wrapperCol={{ ...layout.wrapperCol, offset: 8 }}
                    >
                      <button type="submit" className="btn submit-btn">
                        Lưu thông tin
                      </button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShopProfile;
