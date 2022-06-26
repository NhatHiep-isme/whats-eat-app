import React from "react";
import { useSearchParams } from "react-router-dom";
import Banner from "../../components/Banner/Banner";
import Categories from "../../components/Categories/Categories";
import Footer from "../../components/Footer/Footer";
import TopDishes from "../../components/TopDishes/TopDishes";
import TopItems from "../../components/TopItems/TopItems";
import TopShops from "../../components/TopShops/TopShops";
import TopItemsForYou from "../../components/TopItemsForYou/TopItemsForYou"
const HomePage = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  // const location = useLocation();
  // const email = location.state.email;
  const [email, setEmail] = React.useState("hii");

  return (
    <main>
      <Banner />
      <Categories />
      <TopItems />
      <TopItemsForYou />
      <TopDishes />
      <TopShops />
      <Footer />
    </main>
  );
};

export default HomePage;
