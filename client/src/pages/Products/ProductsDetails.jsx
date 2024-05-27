import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

import "./ProductsDetails.scss";
import List from "../../components/List/List.jsx";
import { mergeSearchParamsOneKey } from "../../helpers.js";

const ENTERIES_PER_PAGE = 20;

function ProductsDetails({ data }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  const sortby = searchParams.get("sortby") || "title-asc";
  const page = searchParams.get("page") || "1";

  function handleSortBy(value) {
    setSearchParams(searchParams.set("sortby", value));
    mergeSearchParamsOneKey(pathname, search, navigate, "sortby", value);
  }

  function handlePagination(value) {
    setSearchParams(searchParams.set("page", value));
    mergeSearchParamsOneKey(pathname, search, navigate, "page", value);
  }

  const paginatedData = data?.slice(
    ENTERIES_PER_PAGE * (page - 1),
    ENTERIES_PER_PAGE * page
  );

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

      <List data={paginatedData} />

      {data?.length > 0 && (
        <div className="pagination">
          <div className="range">
            Showing <span>{ENTERIES_PER_PAGE * (parseInt(page) - 1) + 1}</span>{" "}
            to{" "}
            <span>
              {Math.min(ENTERIES_PER_PAGE * parseInt(page), data?.length)}
            </span>{" "}
            of <span>{data?.length}</span>
          </div>
          {data?.length >= ENTERIES_PER_PAGE && (
            <div className="buttons">
              <button
                disabled={parseInt(page) <= 1}
                onClick={() => handlePagination(parseInt(page) - 1)}
              >
                <MdArrowBackIos />
                Prev
              </button>
              <button
                disabled={data.length <= ENTERIES_PER_PAGE * parseInt(page)}
                onClick={() => handlePagination(parseInt(page) + 1)}
              >
                Next
                <MdArrowForwardIos />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductsDetails;
