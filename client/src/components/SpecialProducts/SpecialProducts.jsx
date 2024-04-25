import Card from "../Card/Card.jsx";
import "./SpecialProducts.scss";

function SpecialProducts({ data, type }) {
  return (
    <div className="special-products">
      <div className="top">
        <h2>{type} Products</h2>
        <p>
          {type === "featured"
            ? "Step into a world of curated excellence with our featured favorites. Handpicked treasures await to elevate your style and delight your senses. Explore now for a taste of sophistication and elegance redefined."
            : "Experience innovation with our latest arrivals – explore fresh additions now. From timeless classics to cutting-edge technology, find your next must-have. Be ahead of the curve – shop our new products today!"}
        </p>
      </div>
      <div className="bottom">
        {data?.map((item) => (
          <Card item={item} key={item._id} />
        ))}
      </div>
    </div>
  );
}

export default SpecialProducts;
