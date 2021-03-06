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
            <h1 className="title">T???t c??? ????n h??ng</h1>
            <p className="total-orders">
              B???n ??ang c?? t???t c??? {shopOrders.length} ????n h??ng
            </p>
            <div className="orders">
              <Tabs
                defaultActiveKey={defaultActiveKey}
                activeKey={defaultActiveKey}
                onTabClick={(key) => setDefaultActiveKey(key)}
              >
                <TabPane tab="T???t c???" key="1">
                  <div className="table-title">
                    <p className="product-name">S???n ph???m</p>
                    <p>T???ng ????n h??ng</p>
                    <p>Tr???ng th??i</p>
                    <p>V???n chuy???n</p>
                    <p>Thao t??c</p>
                  </div>
                  {shopOrders.length > 0 ? (
                    shopOrders?.map((order, idx) => {
                      if (order.customer) {
                        return <ShopOrderCard key={idx} {...order} />;
                      }
                    })
                  ) : (
                    <p>B???n ch??a c?? ????n h??ng n??o!</p>
                  )}
                </TabPane>
                <TabPane tab="Ch??? x??c nh???n" key="2">
                  <div className="table-title">
                    <p className="product-name">S???n ph???m</p>
                    <p>T???ng ????n h??ng</p>
                    <p>Tr???ng th??i</p>
                    <p>V???n chuy???n</p>
                    <p>Thao t??c</p>
                  </div>
                  {allOrders.waiting.length > 0 ? (
                    allOrders.waiting.map((order, idx) => {
                      if (order.customer) {
                        return <ShopOrderCard key={idx} {...order} />;
                      }
                    })
                  ) : (
                    <p>B???n ch??a c?? ????n h??ng ch??? x??c nh???n n??o!</p>
                  )}
                </TabPane>
                <TabPane tab="??ang giao" key="3">
                  <div className="table-title">
                    <p className="product-name">S???n ph???m</p>
                    <p>T???ng ????n h??ng</p>
                    <p>Tr???ng th??i</p>
                    <p>V???n chuy???n</p>
                    <p>Thao t??c</p>
                  </div>
                  {allOrders.delivering.length > 0 ? (
                    allOrders.delivering.map((order, idx) => {
                      if (order.customer) {
                        return <ShopOrderCard key={idx} {...order} />;
                      }
                    })
                  ) : (
                    <p>B???n ch??a c?? ????n h??ng ??ang giao n??o!</p>
                  )}
                </TabPane>
                <TabPane tab="???? giao" key="4">
                  <div className="table-title">
                    <p className="product-name">S???n ph???m</p>
                    <p>T???ng ????n h??ng</p>
                    <p>Tr???ng th??i</p>
                    <p>V???n chuy???n</p>
                    <p>Thao t??c</p>
                  </div>
                  {allOrders.delivered.length > 0 ? (
                    allOrders.delivered.map((order, idx) => {
                      if (order.customer) {
                        return <ShopOrderCard key={idx} {...order} />;
                      }
                    })
                  ) : (
                    <p>B???n ch??a c?? ????n h??ng ???? giao n??o!</p>
                  )}
                </TabPane>
                <TabPane tab="???? h???y" key="5">
                  <div className="table-title">
                    <p className="product-name">S???n ph???m</p>
                    <p>T???ng ????n h??ng</p>
                    <p>Tr???ng th??i</p>
                    <p>V???n chuy???n</p>
                    <p>Thao t??c</p>
                  </div>
                  {allOrders.cancel.length > 0 ? (
                    allOrders.cancel.map((order, idx) => {
                      if (order.customer) {
                        return <ShopOrderCard key={idx} {...order} />;
                      }
                    })
                  ) : (
                    <p>B???n ch??a c?? ????n h??ng ???? h???y n??o!</p>
                  )}
                </TabPane>
                {/* <TabPane tab="Tr??? h??ng/ho??n ti???n" key="6">
                  <div className="table-title">
                    <p className="product-name">S???n ph???m</p>
                    <p>T???ng ????n h??ng</p>
                    <p>Tr???ng th??i</p>
                    <p>V???n chuy???n</p>
                    <p>Thao t??c</p>
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
