import { useQuery } from "@tanstack/react-query";

import Categories from "../../components/Categories/Categories.jsx";
import Contact from "../../components/Contact/Contact.jsx";
import SpecialProducts from "../../components/SpecialProducts/SpecialProducts.jsx";
import Slider from "../../components/Slider/Slider.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import "./Homepage.scss";
import axiosInstance from "../../axios.js";

async function getFeaturedProducts() {
  try {
    const res = await axiosInstance.get("/api/products?special=featured");
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

async function getTopProducts() {
  try {
    const res = await axiosInstance.get("/api/products?special=new");
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

function Homepage() {
  const {
    data: featuredData,
    isLoading: isFeaturedLoading,
    error: featuredError,
  } = useQuery({
    queryKey: ["products", "featured"],
    queryFn: getFeaturedProducts,
  });
  const {
    data: newData,
    isLoading: isNewLoading,
    error: newError,
  } = useQuery({
    queryKey: ["products", "top"],
    queryFn: getTopProducts,
  });

  if (isFeaturedLoading || isNewLoading) {
    return <Loader />;
  }

  return (
    <div className="homepage">
      <Slider />
      <SpecialProducts data={featuredData} type="featured" />
      <Categories />
      <SpecialProducts data={newData} type="new" />
      <Contact />
    </div>
  );
}

export default Homepage;
