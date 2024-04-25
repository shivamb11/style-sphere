import { useNavigate } from "react-router-dom";

import List from "../../components/List/List.jsx";
import "./ProductsDetails.scss";

function ProductsDetails({ data, searchParams, setSearchParams }) {
  const sortby = searchParams.get("sortby") || "_id-asc";
  const navigate = useNavigate();

  function handleSortBy(e) {
    setSearchParams(searchParams.set("sortby", e.target.value));
    navigate(`/products?sortby=${e.target.value}`);
  }

  return (
    <div className="products-details">
      <img
        className="cover-img"
        src="https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt=""
      />
      <div className="info">
        <h2 className="product-count">{data?.length} Products Found</h2>
        <select
          name="sortby"
          id="sortby"
          onChange={handleSortBy}
          value={sortby}
        >
          <option value="price-asc">Price (lowest first)</option>
          <option value="price-desc">Price (highest first)</option>
          <option value="discount-asc">Discount (lowest first)</option>
          <option value="discount-desc">Discount (highest first)</option>
        </select>
      </div>
      <List data={data} />
    </div>
  );
}

export default ProductsDetails;
