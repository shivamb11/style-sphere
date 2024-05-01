import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import "./ProductsDetails.scss";
import List from "../../components/List/List.jsx";
import { mergeSearchParams } from "../../helpers.js";

function ProductsDetails({ data }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  const sortby = searchParams.get("sortby") || "title-asc";

  function handleSortBy(value) {
    setSearchParams(searchParams.set("sortby", value));
    mergeSearchParams(pathname, search, navigate, "sortby", value);
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
          onChange={(e) => handleSortBy(e.target.value)}
          value={sortby}
        >
          <option value="title-asc">Sort by</option>
          <option value="price-asc">Price (lowest first)</option>
          <option value="price-desc">Price (highest first)</option>
          <option value="disc-asc">Discount (lowest first)</option>
          <option value="disc-desc">Discount (highest first)</option>
        </select>
      </div>
      <List data={data} />
    </div>
  );
}

export default ProductsDetails;
