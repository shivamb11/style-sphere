import { Link } from "react-router-dom";
import "./Card.scss";

function Card({ item }) {
  const newPrice = Math.round(item.price - (item.price * item.discount) / 100);

  const img1 = item?.images[0]?.url?.replace("/upload", "/upload/w_500") || "";
  const img2 = item?.images[1]?.url?.replace("/upload", "/upload/w_500") || "";

  return (
    <div className="card">
      {item.special === "featured" && (
        <span className="is-special">Featured</span>
      )}
      {item.special === "new" && <span className="is-special">New</span>}
      <Link to={`/product/${item._id}`}>
        <div className="images">
          <img src={img1} className="main-image" />
          <img src={img2} className="second-image" />
        </div>
      </Link>
      <h2>{item.title}</h2>
      <div className="prices">
        <span className="old-price">₹{item.price}</span>
        <span className="new-price">₹{newPrice}</span>
        <span className="discount">({item.discount}%)</span>
      </div>
    </div>
  );
}

export default Card;
