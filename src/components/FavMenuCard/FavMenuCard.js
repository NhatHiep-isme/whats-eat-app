import React from "react";
import "./FavMenuCard.css";

const FavMenuCard = ({ menu }) => {
  console.log("menu:", menu);
  return (
    <div className="fav-menu-card">
      <h3>Thực đơn ngày ...</h3>
      {menu.map((dish, idx) => (
        <div>
          <p key={idx}>{dish.dish_name}</p>
        </div>
      ))}
      <h4>Được thêm bởi ...</h4>
    </div>
  );
};

export default FavMenuCard;
