import React from "react";
import HeroBanner from "../components/home Components/HeroBanner"
import FeaturedProducts from "../components/home Components/FeaturedProducts";
import Categories from "../components/home Components/Categories";
import PromotionalSections from "../components/home Components/PromotionalSections";
import CustomerReviews from "../components/home Components/CustomerReviews";

const Home = () => {
 
  return (
    <div>
      <HeroBanner />
      <Categories/>
      <PromotionalSections />
      <CustomerReviews />
    </div>
  );
};

export default Home;
