import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Loader from "../../components/Loader/Loader.jsx";
import ProductsMenu from "./ProductsMenu.jsx";
import ProductsDetails from "./ProductsDetails.jsx";
import Error from "../../components/Error/Error.jsx";
import "./Products.scss";
import axiosInstance from "../../axios.js";

async function getProducts(category, subcategory, type, special, name) {
  const categoryUrl = category ? `/${category}` : "";
  const subCategoryUrl = subcategory ? `/${subcategory}` : "";
  const typeUrl = type ? `?type=${type}` : "";
  const specialUrl = special ? `?special=${special}` : "";
  const nameUrl = name ? `?name=${name}` : "";

  try {
    const res = await axiosInstance.get(
      "/api/products" +
        categoryUrl +
        subCategoryUrl +
        typeUrl +
        specialUrl +
        nameUrl
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

function Products() {
  const { category } = useParams();
  const { subcategory } = useParams();
  const [searchParams] = useSearchParams();

  const type = searchParams.get("type");
  const special = searchParams.get("special");
  const name = searchParams.get("name");

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", category, subcategory, type],
    queryFn: () => getProducts(category, subcategory, type, special, name),
  });

  const minPrice = searchParams.get("minPrice") || 0;
  const maxPrice = searchParams.get("maxPrice") || 10000;
  const discount = searchParams.get("discount") || 0;

  useEffect(function () {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  const filteredData = data?.filter(
    (el) =>
      Math.round(el.price - (el.price * el.discount) / 100) >= minPrice &&
      Math.round(el.price - (el.price * el.discount) / 100) <= maxPrice &&
      el.discount >= discount
  );

  const sortby = searchParams.get("sortby") || "title-asc";
  const [field, direction] = sortby.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedData = filteredData?.sort((a, b) => {
    const checkField = field === "disc" ? "discount" : field;

    if (typeof a[checkField] === "string") {
      if (a[checkField].toUpperCase() < b[checkField].toUpperCase()) {
        return -1 * modifier;
      } else if (a[checkField].toUpperCase() > b[checkField].toUpperCase()) {
        return 1 * modifier;
      }
      // names must be equal
      return 0;
    } else {
      // For numeric values
      return (a[checkField] - b[checkField]) * modifier;
    }
  });

  return (
    <div className="products">
      <ProductsMenu
        category={category}
        subcategory={subcategory}
        type={type}
        minPrice={minPrice}
        maxPrice={maxPrice}
        discount={discount}
      />
      <ProductsDetails data={sortedData} />
    </div>
  );
}

export default Products;
