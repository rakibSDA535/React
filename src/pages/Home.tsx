import React, { useEffect } from "react";
import Carousel from "../components/Carousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import axios from 'axios';
import Features from "../components/Features";
import MidBanner from "../components/MidBanner";
import { useData } from "../context/DataContext";

const Home: React.FC = () => {
  const { fetchAllProducts } = useData();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className="overflow-x-hidden pt-5">
      <Carousel />
      <MidBanner />
      <Features />
    </div>
  );
};

export default Home;
