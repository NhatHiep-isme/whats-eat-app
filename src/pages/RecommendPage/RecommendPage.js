import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Footer from "../../components/Footer/Footer";
import Recommender from "../../components/Recommender/Recommender";
import "./RecommendPage.css";
import ModalCalo from "../../components/ModalCalCalo/ModalCalo";
const RecommendPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [kcal, setKcal] = useState(0);
  const [allergy, setAllergy] = useState("");
  const [menu, setMenu] = useState([]);
  const [page, setPage] = useState(0);
  const [level, setLevel] = useState("Mức độ");
  const [minTime, setMinTime] = useState(0);
  const [maxTime, setMaxTime] = useState(0);
  const user = useSelector((state) => state.auth.userInfo);
  const handleOk = (gender, pal, weight, height, year, allergy) => {
    console.log(gender, pal, weight, height, year);
    const body = {
      gender: gender,
      pal: pal,
      weight: weight,
      height: height,
      year: year,
      allergy: allergy,
    };
    axios({
      method: "put",
      url: `${process.env.REACT_APP_ASP_API_KEY}/api/Customer/update-calo-per-day`,
      data: body,
      headers: { Authorization: `Bearer ${user.token}` },
    })
      .then((res) => {
        setKcal(res.data.calo);
        setAllergy(res.data.allergy);
        if (res.data.calo > 0) {
          getRecommendedRecipe(res.data);
        }
      })
      .catch((err) => {});
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getRecommendedRecipe = (data) => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_PYTHON_API_KEY}/individual/recipe/?id_user=${user.userId}&user_kcal=${data.calo}&n_recipe=16&page=${page}&level=${level}&mintime=${minTime}&maxtime=${maxTime}&allergy=${data.allergy}`,
    })
      .then((res) => {
        const result = res.data;
        setMenu(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onPageChange = (page) => {
    setPage(page);
  };

  const onFilter = (level, minTime, maxTime) => {
    setLevel(level);
    setMaxTime(maxTime);
    setMinTime(minTime);
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_ASP_API_KEY}/api/Customer/get-calo-per-day`,
      headers: { Authorization: `Bearer ${user.token}` },
    })
      .then((res) => {
        setKcal(res.data.calo);
        if (res.data.calo > 0) {
          getRecommendedRecipe(res.data);
        }
      })
      .catch((err) => {});
  }, [page, level, minTime, maxTime]);

  return (
    <div className="recommend">
      <Recommender
        kcal={kcal}
        menu={menu}
        setCurrentPage={onPageChange}
        onFilter={onFilter}
      />
      <Footer />
      {kcal === 0 && (
        <ModalCalo
          isModalVisible={isModalVisible}
          handleOk={handleOk}
          handleCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default RecommendPage;
