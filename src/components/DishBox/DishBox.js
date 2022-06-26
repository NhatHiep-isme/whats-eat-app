import React, { useState } from "react";
import "./DishBox.css";
import DishRecommended from "../Dish/DishRecommended";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { Row, Col } from "antd";
const DishBox = ({ menu, category, addRecipe }) => {
  const [isShowRecipe, setIsShowRecipe] = useState(true);
  const handleShow = () => setIsShowRecipe(true);
  const handleHidden = () => setIsShowRecipe(false);
  return (
    // <div className="dish-box" key={recipeId}>
    //   <div className="dish-box-nav">
    //     <h2 className="dish-label">{name}</h2>
    //     <div className="icons">
    //       <AiOutlinePlusCircle onClick={handleShow} className="icon" />
    //       <AiOutlineMinusCircle onClick={handleHidden} className="icon" />
    //     </div>
    //   </div>
    // </div>
    <div>
      <h2>Món ăn cho bạn</h2>
      <div className="list-dish">
        <Row gutter={[16, 24]}>
          {menu.map((dish) => {
            const {
              recipeId,
              name,
              images,
              totalLike,
              totalTime,
              totalView,
              recipeTypeId,
              calories,
            } = dish;
            return (
              <Col className="gutter-row" span={6}>
                <DishRecommended
                  {...dish}
                  className="single-dish"
                  isShowRecipe={isShowRecipe}
                  addRecipe={addRecipe}
                />
                ;
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};

export default DishBox;
