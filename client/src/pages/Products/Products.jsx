import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import Loader from "../../components/Loader/Loader.jsx";
import ProductsMenu from "./ProductsMenu.jsx";
import ProductsDetails from "./ProductsDetails.jsx";
import "./Products.scss";

async function getProducts(category, subcategory, type, special, name) {
  const categoryUrl = category ? `/${category}` : "";
  const subCategoryUrl = subcategory ? `/${subcategory}` : "";
  const typeUrl = type ? `?type=${type}` : "";
  const specialUrl = special ? `?special=${special}` : "";
  const nameUrl = name ? `?name=${name}` : "";

  try {
    const res = await axios.get(
      "https://style-sphere-api.vercel.app/api/products" +
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
  const [searchParams, setSearchParams] = useSearchParams();

  const type = searchParams.get("type");
  const special = searchParams.get("special");
  const name = searchParams.get("name");

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", category, subcategory, type],
    queryFn: () => getProducts(category, subcategory, type, special, name),
  });

  const [price, setPrice] = useState({ minPrice: 0, maxPrice: 10000 });
  const [discount, setDiscount] = useState(0);

  function handlePrice(value) {
    if (
      price.minPrice === value.minPrice &&
      price.maxPrice === value.maxPrice
    ) {
      setPrice({ minPrice: 0, maxPrice: 10000 });
    } else {
      setPrice(value);
    }
  }

  function handleDiscount(value) {
    if (discount === value) {
      setDiscount(0);
    } else {
      setDiscount(value);
    }
  }

  if (isLoading) {
    return <Loader />;
  }

  const sortby = searchParams.get("sortby") || "_id-asc";

  const filteredData = data?.filter(
    (el) =>
      Math.round(el.price - (el.price * el.discount) / 100) >= price.minPrice &&
      Math.round(el.price - (el.price * el.discount) / 100) <= price.maxPrice &&
      el.discount >= discount
  );

  const [field, direction] = sortby.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedData = filteredData?.sort((a, b) => {
    if (typeof a[field] === "string") {
      if (a[field].toUpperCase() < b[field].toUpperCase()) {
        return -1 * modifier;
      } else if (a[field].toUpperCase() > b[field].toUpperCase()) {
        return 1 * modifier;
      }
      // names must be equal
      return 0;
    } else {
      // For numeric values
      return (a[field] - b[field]) * modifier;
    }
  });

  return (
    <div className="products">
      <ProductsMenu
        category={category}
        subcategory={subcategory}
        type={type}
        price={price}
        onPrice={handlePrice}
        discount={discount}
        onDiscount={handleDiscount}
      />
      <ProductsDetails
        data={sortedData}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
    </div>
  );
}

export default Products;
