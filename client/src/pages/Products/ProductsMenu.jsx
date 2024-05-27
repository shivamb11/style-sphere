import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import "./ProductsMenu.scss";
import {
  mergeSearchParamsOneKey,
  mergeSearchParamsTwoKey,
} from "../../helpers.js";

const data = [
  {
    category: "men",
    subcategory: [
      {
        heading: "topwear",
        type: ["t shirts", "formal shirts", "casual shirts", "jackets"],
      },
      {
        heading: "bottomwear",
        type: ["jeans", "trousers", "shorts"],
      },
      {
        heading: "footwear",
        type: ["formal shoes", "sports shoes"],
      },
    ],
  },
  {
    category: "women",
    subcategory: [
      {
        heading: "topwear",
        type: ["tops", "frocks", "coats"],
      },
      {
        heading: "bottomwear",
        type: ["jeans", "skirts"],
      },
      {
        heading: "footwear",
        type: ["heels", "sports shoes"],
      },
    ],
  },
  {
    category: "kids",
    subcategory: [
      {
        heading: "boys",
        type: ["t shirts", "jackets", "jeans", "shoes"],
      },
      {
        heading: "girls",
        type: ["tops", "frocks", "jeans", "shoes"],
      },
    ],
  },
  {
    category: "accessories",
    subcategory: [
      {
        heading: "bags",
        type: ["office bags", "travel bags", "school bags"],
      },
      {
        heading: "wearable",
        type: ["caps", "hats", "sunglasses"],
      },
    ],
  },
];

function ProductsMenu({
  category,
  subcategory,
  type,
  minPrice,
  maxPrice,
  discount,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  function handlePrice(value) {
    const newMinPrice =
      Number(minPrice) === value.minPrice ? 0 : value.minPrice;
    const newMaxPrice =
      Number(maxPrice) === value.maxPrice ? 100000 : value.maxPrice;

    setSearchParams(searchParams.set("minPrice", newMinPrice));
    setSearchParams(searchParams.set("maxPrice", newMaxPrice));

    mergeSearchParamsTwoKey(
      pathname,
      search,
      navigate,
      "minPrice",
      newMinPrice,
      "maxPrice",
      newMaxPrice
    );
  }

  function handleDiscount(value) {
    const newDiscount = Number(discount) === value ? 0 : value;

    setSearchParams(searchParams.set("discount", newDiscount));
    mergeSearchParamsOneKey(
      pathname,
      search,
      navigate,
      "discount",
      newDiscount
    );
  }

  return (
    <div className="products-menu">
      <h2>Filters</h2>
      <div className="filter-item">
        {category === undefined ? (
          <>
            <h3>Categories</h3>
            {data.map((el) => (
              <div className="input-item" key={el.category}>
                <Link to={`/products/${el.category}`} className="link category">
                  <input
                    type="checkbox"
                    name="subcategories"
                    id={`${el.category}`}
                  />
                  {el.category}
                </Link>
              </div>
            ))}
          </>
        ) : subcategory === undefined ? (
          <>
            <h3>Subcategories</h3>
            {data
              .filter((el) => el.category === category)[0]
              .subcategory.map((el) => (
                <div className="input-item" key={el.heading}>
                  <Link
                    to={`/products/${category}/${el.heading}`}
                    className="link subcategory"
                  >
                    <input
                      type="checkbox"
                      name="subcategories"
                      id={`${el.heading}`}
                    />
                    {el.heading}
                  </Link>
                </div>
              ))}
          </>
        ) : type === null ? (
          <>
            <h3>Type</h3>

            {data
              .filter((el) => el.category === category)[0]
              .subcategory.filter((el) => el.heading === subcategory)[0]
              .type.map((el) => (
                <div className="input-item" key={el}>
                  <Link
                    to={`/products/${category}/${subcategory}?type=${el}`}
                    className="link type"
                  >
                    <input type="checkbox" name="subcategories" id={`${el}`} />
                    {el}
                  </Link>
                </div>
              ))}
          </>
        ) : (
          <></>
        )}
      </div>

      <div className="filter-item">
        <h3>Price</h3>
        <div className="input-item">
          <input
            type="checkbox"
            name="price"
            id="price0to500"
            checked={Number(minPrice) === 0 && Number(maxPrice) === 500}
            onChange={() => handlePrice({ minPrice: 0, maxPrice: 500 })}
          />
          <label htmlFor="price0to500">₹0 to ₹500</label>
        </div>
        <div className="input-item">
          <input
            type="checkbox"
            name="price"
            id="price500to1000"
            checked={Number(minPrice) === 500 && Number(maxPrice) === 1000}
            onChange={() => handlePrice({ minPrice: 500, maxPrice: 1000 })}
          />
          <label htmlFor="price500to1000">₹500 to ₹1000</label>
        </div>
        <div className="input-item">
          <input
            type="checkbox"
            name="price"
            id="price1000to2000"
            checked={Number(minPrice) === 1000 && Number(maxPrice) === 2000}
            onChange={() => handlePrice({ minPrice: 1000, maxPrice: 2000 })}
          />
          <label htmlFor="price1000to2000">₹1000 to ₹2000</label>
        </div>
        <div className="input-item">
          <input
            type="checkbox"
            name="price"
            id="price2000to3000"
            checked={Number(minPrice) === 2000 && Number(maxPrice) === 3000}
            onChange={() => handlePrice({ minPrice: 2000, maxPrice: 3000 })}
          />
          <label htmlFor="price2000to3000">₹2000 to ₹3000</label>
        </div>
        <div className="input-item">
          <input
            type="checkbox"
            name="price"
            id="price3000to4000"
            checked={Number(minPrice) === 3000 && Number(maxPrice) === 4000}
            onChange={() => handlePrice({ minPrice: 3000, maxPrice: 4000 })}
          />
          <label htmlFor="price3000to4000">₹3000 to ₹4000</label>
        </div>
      </div>

      <div className="filter-item">
        <h3>Discount</h3>
        <div className="input-item">
          <input
            type="checkbox"
            name="discount"
            id="discount10to20"
            checked={discount >= 10 && discount < 20}
            onChange={() => handleDiscount(10)}
          />
          <label htmlFor="discount10to20">Above 10%</label>
        </div>
        <div className="input-item">
          <input
            type="checkbox"
            name="discount"
            id="discount20to30"
            checked={discount >= 20 && discount < 30}
            onChange={() => handleDiscount(20)}
          />
          <label htmlFor="discount20to30">Above 20%</label>
        </div>
        <div className="input-item">
          <input
            type="checkbox"
            name="discount"
            id="discount30to40"
            checked={discount >= 30 && discount < 40}
            onChange={() => handleDiscount(30)}
          />
          <label htmlFor="discount30to40">Above 30%</label>
        </div>
        <div className="input-item">
          <input
            type="checkbox"
            name="discount"
            id="discount40to50"
            checked={discount >= 40 && discount < 50}
            onChange={() => handleDiscount(40)}
          />
          <label htmlFor="discount40to50">Above 40%</label>
        </div>
        <div className="input-item">
          <input
            type="checkbox"
            name="discount"
            id="discount50to100"
            checked={discount >= 50 && discount < 100}
            onChange={() => handleDiscount(50)}
          />
          <label htmlFor="discount50to100">Above 50%</label>
        </div>
      </div>
    </div>
  );
}

export default ProductsMenu;
