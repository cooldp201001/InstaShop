import React from "react";
import HeroBanner from "../components/home Components/HeroBanner"
import Categories from "../components/home Components/Categories";
import PromotionalSections from "../components/home Components/PromotionalSections";
import CustomerReviews from "../components/home Components/CustomerReviews";
import Footer from "../components/footer";

const Home = () => {
 
  return (
    <div>
      <HeroBanner />
      <Categories/>
      <PromotionalSections />
      <CustomerReviews />
      <Footer/>
    </div>
  );
};


export default Home;




