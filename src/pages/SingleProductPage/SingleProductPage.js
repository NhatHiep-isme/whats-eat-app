import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsCartCheck, BsCartPlus, BsHeart } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";

import { addItemToCart } from "../../reducers/cart";
import RecommendedItems from "../../components/TopItems/RecommendedItems";
import Footer from "../../components/Footer/Footer";
import Counter from "../../components/Counter/Counter";
import TopDishes from "../../components/TopDishes/TopDishes";
import TopItems from "../../components/TopItems/TopItems";
import "./SingleProductPage.css";
import ProductsByShop from "../../components/TopItems/ProductsByShop";
import ProductReview from "../../components/ProductReview/ProductReview";

const SingleProductPage = () => {
  const [productDetail, setProductDetail] = useState({});
  const [count, setCount] = useState(1);
  const [productIds, setProductIds] = useState([]);
  const location = useLocation();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.userInfo);
  const navigate = useNavigate();
  const productId = location.state.productId;
  const getProductDetail = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_ASP_API_KEY}/api/Product/${productId}`, //TODO: Changle hard code into idProduct
    })
      .then((res) => {
        const result = res.data;
        setProductDetail(result);
        setProductIds([...productIds, productId]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleIncrease = () => {
    setCount(count + 1);
  };

  const handleDecrease = () => {
    if (count === 1) {
      setCount(1);
    } else setCount(count - 1);
  };

  const buyNow = () => {
    if (auth.userName) {
      dispatch(addItemToCart({ productId, productDetail, count }));
      navigate(`/cart`);
    } else {
      navigate(`/login`);
    }
  };

  const addToCart = () => {
    if (auth.userName) {
      dispatch(addItemToCart({ productId, productDetail, count }));
      let secondsToGo = 3;
      const modal = Modal.success({
        title: "S???n ph???m ???? ???????c th??m v??o gi??? h??ng",
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
  useEffect(() => {
    getProductDetail();
  }, [productId]);

  if (!productDetail.images) {
    return (
      <div
        style={{
          height: "85vh",
          display: "flex",
          alignItem: "center",
          justifyContent: "center",
          fontSize: "3rem",
          fontWeight: "900",
          marginTop: "15rem",
        }}
      >
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="single-product">
      <div className="single-product-fluid">
        <div className="single-product-container">
          <h1 className="title">Chi ti???t s???n ph???m</h1>
          <div className="product-block">
            <div className="img-container">
              <img
                src={productDetail.images[0][1].url}
                alt={productDetail.name}
                className="main-img"
              />
            </div>
            <div className="product-info">
              <h1 className="product-name">{productDetail.name}</h1>
              <div className="detail">
                <h3 className="product-type">????? T????i</h3>
                <div className="sales-info">
                  <BsCartCheck className="cart-icon" />
                  <span>{productDetail.totalSell}</span>
                </div>
              </div>
              <h1 className="price">
                {productDetail.basePrice?.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }) || 40000}
              </h1>
              <div className="instock">
                <Counter
                  count={count}
                  onIncrease={handleIncrease}
                  onDecrease={handleDecrease}
                />
                <p className="item-left">
                  {productDetail.inStock} s???n ph???m c?? s???n
                </p>
              </div>
              <div className="btn-block">
                <button className="btn save-btn">
                  <BsHeart className="icon" />
                  <span>L??u</span>
                </button>
                <button className="btn cart-btn" onClick={addToCart}>
                  <BsCartPlus className="icon" />
                  <span>Th??m v??o gi???</span>
                </button>
                <button onClick={buyNow} className="btn buy-btn">
                  Mua ngay
                </button>
              </div>
              <div className="brand-info-block">
                <div>
                  <p>?????nh l?????ng</p>
                  <p className="content weight">
                    {productDetail.weightServing}
                  </p>
                </div>
                <div>
                  <p>Th????ng hi???u</p>
                  <p className="content brand">
                    {productDetail.storeName || "DONA FARM"}
                  </p>
                </div>
                <div>
                  <p>Xu???t x???</p>
                  <p className="content origin">?????ng Nai</p>
                </div>
              </div>
              <div className="description-block">
                <h2>M?? t??? s???n ph???m</h2>
                <p>
                  {productDetail.description || "S???n ph???m ?????m b???o ch???t l?????ng"}
                </p>
              </div>
            </div>
          </div>
          <div>
            <ProductReview productId={productId} />
          </div>
        </div>
      </div>
      <RecommendedItems productIds={productIds} />
      <ProductsByShop storeId={productDetail.storeId} />
      <TopItems />
      <TopDishes />
      <Footer />
    </div>
  );
};

export default SingleProductPage;

const product = {
  id: 1,
  product_name: "Ba r???i heo (th???t t????i)",
  product_type: "????? t????i",
  img_url:
    "https://image.cooky.vn/posproduct/g0/9593/s400x400/37b78803-7264-42da-a39c-c48d3796d803.jpeg",
  sale_count: 50,
  price: 42000,
  weight: "300g",
  brand: "dona farm",
  origin: "?????ng nai",
  description:
    "Th???t ba r???i (ba ch???) c?? l???p th???t v?? l???p m??? xen k??? ?????p m???t, ch???t th???t t????i m???i, gi??u dinh d?????ng. B???i c?? h????ng v??? th???t b??o h??i h??a ?????c tr??ng n??n ba r???i r???t ???????c ??a chu???ng ????? ch??? bi???n nhi???u m??n ngon h???p d???n nh?? lu???c, chi??n, n?????ng... ?????u tuy???t v???i.",
};

const mock_rating = [
  {
    order_ID: 1,
    username: "lyquynhtram",
    item_name: "Ba r???i heo (th???t t????i)",
    item_img:
      "https://image.cooky.vn/posproduct/g0/9593/s400x400/37b78803-7264-42da-a39c-c48d3796d803.jpeg",
    stars: 4,
    rate_content: "S???n ph???m ch???t l?????ng tuy???t v???i",
    rate_time: "25/10/2021",
    is_reply: true,
    reply:
      "C???m ??n b???n ???? ???ng h??? shop ???, ch??c b???n nhi???u s???c kh???e v?? mua ????? c???a shop nhi???u h??n nhaaa!",
  },
  {
    order_ID: 2,
    username: "hiepsimattroi",
    item_name: "Ba r???i heo (th???t t????i)",
    item_img:
      "https://image.cooky.vn/posproduct/g0/9593/s400x400/37b78803-7264-42da-a39c-c48d3796d803.jpeg",
    stars: 5,
    rate_content:
      "S???n ph???m ch???t l?????ng tuy???t v???i, l???n sau m??nh s??? ???ng h??? shop ti???p ???",
    rate_time: "25/10/2021",
    is_reply: true,
    reply:
      "C???m ??n b???n ???? ???ng h??? shop ???, ch??c b???n nhi???u s???c kh???e v?? mua ????? c???a shop nhi???u h??n nhaaa!",
  },
  {
    order_ID: 3,
    username: "tranthivi",
    item_name: "Ba r???i heo (th???t t????i)",
    item_img:
      "https://image.cooky.vn/posproduct/g0/9593/s400x400/37b78803-7264-42da-a39c-c48d3796d803.jpeg",
    stars: 1,
    rate_content: "S???n ph???m qu?? t???, kh??ng bao gi??? mua l???i",
    rate_time: "25/10/2021",
    is_reply: false,
    reply:
      "B???n ??i c?? nh???m l???n g?? kh??ng ???? Th???t b??n m??nh ?????m b???o t????i v?? ngon ??? :(",
  },
  {
    order_ID: 4,
    username: "dinhthiminhhieu",
    item_name: "Ba r???i heo (th???t t????i)",
    item_img:
      "https://image.cooky.vn/posproduct/g0/9593/s400x400/37b78803-7264-42da-a39c-c48d3796d803.jpeg",
    stars: 4,
    rate_content: "S???n ph???m c??ng ???????c, lu???c ch???m m???m n??m b?? ch??y",
    rate_time: "25/10/2021",
    is_reply: true,
    reply:
      "C???m ??n b???n ???? ???ng h??? shop ???, ch??c b???n nhi???u s???c kh???e v?? mua ????? c???a shop nhi???u h??n nhaaa!",
  },
  {
    order_ID: 5,
    username: "phamhoangan",
    item_name: "Ba r???i heo (th???t t????i)",
    item_img:
      "https://image.cooky.vn/posproduct/g0/9593/s400x400/37b78803-7264-42da-a39c-c48d3796d803.jpeg",
    stars: 5,
    rate_content:
      "S???n ph???m ch???t l?????ng tuy???t v???i, m??nh kho ny m??nh khen n???c n??? hehe",
    rate_time: "25/10/2021",
    is_reply: true,
    reply: "C???m ??n b???n ???? ???ng h??? shop ???, ch??c b???n v?? ng?????i y??u m??i m???n nhaaa!",
  },
  {
    order_ID: 6,
    username: "nguyenvanhao",
    item_name: "Ba r???i heo (th???t t????i)",
    item_img:
      "https://image.cooky.vn/posproduct/g0/9593/s400x400/37b78803-7264-42da-a39c-c48d3796d803.jpeg",
    stars: 1,
    rate_content: "S???n ph???m ngon nh??ng c??? Vi???t Nam c?? 1 sao n??n :)))",
    rate_time: "25/10/2021",
    is_reply: false,
    reply: "B???n ??i b???n ?????ng l??m th??? t???i shop ??? :(",
  },
];
