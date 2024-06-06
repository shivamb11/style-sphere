import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  MdOutlineEqualizer,
  MdOutlineFavoriteBorder,
  MdOutlineShoppingCart,
} from "react-icons/md";

import Loader from "../../components/Loader/Loader.jsx";
import Error from "../../components/Error/Error.jsx";
import { addToCart } from "../../redux/cartReducer.js";
import "./Product.scss";
import axiosInstance from "../../axios.js";

const img1 =
  "https://images.unsplash.com/photo-1666289973858-cd35e4beb492?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const img2 =
  "https://images.unsplash.com/photo-1665859126636-71dc5525f2ab?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

async function getProduct(id) {
  try {
    const res = await axiosInstance.get(
      `/api/product/${id}`
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

function Product() {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });

  const [mainImage, setMainImage] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  useEffect(
    function () {
      setMainImage(data?.images?.[0].url);
      setSize(data?.size[0]);
      window.scrollTo(0, 0);
    },
    [data?.images, data?.size]
  );

  function handleQuantity(e) {
    if (e === "dec") {
      setQuantity((quantity) => Math.max(1, quantity - 1));
    } else {
      setQuantity((quantity) => quantity + 1);
    }
  }

  function handleAddToCart() {
    toast.success("Product added to cart");
    dispatch(
      addToCart({
        _id: data?._id,
        title: data?.title,
        desc: data?.description,
        price: Math.round(data?.price - (data?.discount * data?.price) / 100),
        image: data?.images[0],
        size: size,
        quantity: quantity,
      })
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="product">
      <div className="left">
        <div className="images">
          {data?.images.map((img, idx) => (
            <img
              src={img.url.replace("/upload", "/upload/w_400")}
              alt={`img-${idx}`}
              onClick={() => setMainImage(img.url)}
              key={img.filename}
            />
          ))}
        </div>
        <div className="main-image">
          <img src={mainImage} alt="main-img" />
        </div>
      </div>
      <div className="right">
        <h1>{data?.title}</h1>
        <div className="price">
          <span>
            ₹{Math.round(data?.price - (data?.discount * data?.price) / 100)}
          </span>
          <span>₹{data?.price}</span>
          <span>({data?.discount}% off)</span>
        </div>
        <p className="description">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia ipsam
          qui nobis quisquam hic eum quos id iusto. Ducimus fugit reiciendis
          minima, dolor tempora in vero numquam quas commodi quos!
        </p>
        <div className="feature">
          <select
            className="size"
            name="size"
            id="size"
            onChange={(e) => setSize(e.target.value)}
          >
            {data?.size.map((size) => (
              <option value={size} key={size}>
                {size}
              </option>
            ))}
          </select>
          <div className="quantity">
            <button onClick={() => handleQuantity("dec")}>-</button>
            <span>{quantity}</span>
            <button onClick={() => handleQuantity("inc")}>+</button>
          </div>
        </div>
        <div className="add-cart" onClick={handleAddToCart}>
          <button>
            <MdOutlineShoppingCart style={{ fontSize: "24px" }} />
          </button>
          <span>Add to cart</span>
        </div>
        {/* <div className="links">
          <div className="item">
            <button>
              <MdOutlineFavoriteBorder style={{ fontSize: "20px" }} />
            </button>
            <span>Add to wishlist</span>
          </div>
          <div className="item">
            <button>
              <MdOutlineEqualizer style={{ fontSize: "20px" }} />
            </button>
            <span>Add to compare</span>
          </div>
        </div> */}
        <div className="basic-info">
          <p>Vendor: Polo</p>
          <p>Product type: {data?.type}</p>
          <p>
            Tags: {`${data?.category}, ${data?.subcategory}, ${data?.type}`}
          </p>
        </div>
        <hr />
        <div className="more-info">
          <p>Description</p>
          <hr />
          <p>Additional</p>
          <hr />
          <p>FAQ</p>
        </div>
      </div>
    </div>
  );
}

export default Product;
