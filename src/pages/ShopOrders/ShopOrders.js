import { Tabs } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useEffect, useState, useContext } from "react";
import Footer from "../../components/Footer/Footer";
import ShopOrderCard from "../../components/ShopOrderCard/ShopOrderCard";
import ShopSidebar from "../../components/ShopSidebar/ShopSidebar";
import "./ShopOrders.css";
import AppContext from "../../context/AppContext";

const { TabPane } = Tabs;

const ShopOrders = () => {
  const [shopOrders, setShopOrders] = useState([]);
  const [userInfo, setUserInfo] = useState();
  const [productInfo, setProductInfo] = useState();
  const [defaultActiveKey, setDefaultActiveKey] = useState("1");
  const location = useLocation();
  const { storeId, defaultKey } = location.state;
  const token = useSelector((state) => state.auth.userInfo.token);
  const { triggerReload } = useContext(AppContext);

  const allOrders = {
    waiting: [],
    delivering: [],
    delivered: [],
    cancel: [],
  };

  shopOrders.length > 0 &&
    shopOrders.map((order) => {
      if (order.orderStatusHistories.length < 1) return;
      switch (
        order.orderStatusHistories[order.orderStatusHistories.length - 1]
          .orderStatus.value
      ) {
        case "waiting":
          allOrders.waiting.push(order);
          break;
        case "delivering":
          allOrders.delivering.push(order);
          break;
        case "delivered":
          allOrders.delivered.push(order);
          break;
        case "canceled":
          allOrders.cancel.push(order);
          break;
        default:
          allOrders.delivered.push(order);
      }
    });
  const getShopOrders = () => {
    axios({
      method: "get",
      url: `https://localhost:7029/api/Store/${storeId}/orders`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        const result = res.data;
        setShopOrders(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setDefaultActiveKey(defaultKey);
  }, [defaultKey]);

  useEffect(() => {
    getShopOrders();
  }, [triggerReload]);

  return (
    // <AppProvider>
    <div className="shop-orders">
      <div className="shop-orders-fluid">
        <div className="shop-orders-container">
          <ShopSidebar storeId={storeId} />
          <div className="content-container">
            <h1 className="title">Tất cả đơn hàng</h1>
            <p className="total-orders">
              Bạn đang có tất cả {shopOrders.length} đơn hàng
            </p>
            <div className="orders">
              <Tabs
                defaultActiveKey={defaultActiveKey}
                activeKey={defaultActiveKey}
                onTabClick={(key) => setDefaultActiveKey(key)}
              >
                <TabPane tab="Tất cả" key="1">
                  <div className="table-title">
                    <p className="product-name">Sản phẩm</p>
                    <p>Tổng đơn hàng</p>
                    <p>Trạng thái</p>
                    <p>Vận chuyển</p>
                    <p>Thao tác</p>
                  </div>
                  {shopOrders.length > 0 ? (
                    shopOrders?.map((order, idx) => {
                      if (order.customer) {
                        return <ShopOrderCard key={idx} {...order} />;
                      }
                    })
                  ) : (
                    <p>Bạn chưa có đơn hàng nào!</p>
                  )}
                </TabPane>
                <TabPane tab="Chờ xác nhận" key="2">
                  <div className="table-title">
                    <p className="product-name">Sản phẩm</p>
                    <p>Tổng đơn hàng</p>
                    <p>Trạng thái</p>
                    <p>Vận chuyển</p>
                    <p>Thao tác</p>
                  </div>
                  {allOrders.waiting.length > 0 ? (
                    allOrders.waiting.map((order, idx) => {
                      if (order.customer) {
                        return <ShopOrderCard key={idx} {...order} />;
                      }
                    })
                  ) : (
                    <p>Bạn chưa có đơn hàng chờ xác nhận nào!</p>
                  )}
                </TabPane>
                <TabPane tab="Đang giao" key="3">
                  <div className="table-title">
                    <p className="product-name">Sản phẩm</p>
                    <p>Tổng đơn hàng</p>
                    <p>Trạng thái</p>
                    <p>Vận chuyển</p>
                    <p>Thao tác</p>
                  </div>
                  {allOrders.delivering.length > 0 ? (
                    allOrders.delivering.map((order, idx) => {
                      if (order.customer) {
                        return <ShopOrderCard key={idx} {...order} />;
                      }
                    })
                  ) : (
                    <p>Bạn chưa có đơn hàng đang giao nào!</p>
                  )}
                </TabPane>
                <TabPane tab="Đã giao" key="4">
                  <div className="table-title">
                    <p className="product-name">Sản phẩm</p>
                    <p>Tổng đơn hàng</p>
                    <p>Trạng thái</p>
                    <p>Vận chuyển</p>
                    <p>Thao tác</p>
                  </div>
                  {allOrders.delivered.length > 0 ? (
                    allOrders.delivered.map((order, idx) => {
                      if (order.customer) {
                        return <ShopOrderCard key={idx} {...order} />;
                      }
                    })
                  ) : (
                    <p>Bạn chưa có đơn hàng đã giao nào!</p>
                  )}
                </TabPane>
                <TabPane tab="Đã hủy" key="5">
                  <div className="table-title">
                    <p className="product-name">Sản phẩm</p>
                    <p>Tổng đơn hàng</p>
                    <p>Trạng thái</p>
                    <p>Vận chuyển</p>
                    <p>Thao tác</p>
                  </div>
                  {allOrders.cancel.length > 0 ? (
                    allOrders.cancel.map((order, idx) => {
                      if (order.customer) {
                        return <ShopOrderCard key={idx} {...order} />;
                      }
                    })
                  ) : (
                    <p>Bạn chưa có đơn hàng đã hủy nào!</p>
                  )}
                </TabPane>
                {/* <TabPane tab="Trả hàng/hoàn tiền" key="6">
                  <div className="table-title">
                    <p className="product-name">Sản phẩm</p>
                    <p>Tổng đơn hàng</p>
                    <p>Trạng thái</p>
                    <p>Vận chuyển</p>
                    <p>Thao tác</p>
                  </div>
                  {allOrders.repaid.length > 0 &&
                    allOrders.repaid.map((order, idx) => {
                      if (order.customer) {
                        return <ShopOrderCard key={idx} {...order} />;
                      }
                    })} */}
                {/* </TabPane> */}
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
    // </AppProvider>
  );
};

export default ShopOrders;
