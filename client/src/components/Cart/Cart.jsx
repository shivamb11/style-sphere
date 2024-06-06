import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { MdDeleteOutline } from "react-icons/md";

import Loader from "../Loader/Loader.jsx";
import { removeFromCart, resetCart } from "../../redux/cartReducer.js";
import "./Cart.scss";
import axiosInstance from "../../axios.js";

const stripePromise = loadStripe(
  "pk_test_51P7TpZSHDZnO68CZsubU7g4NUnrCqI0eO3jhlzBhRhTMxZZH13KU0yLjuXsod8bKclLyQEg07MzhkmqbSdeHvzMw00Yl8O9M6T"
);

function Cart({ onShowCart }) {
  const [isLoading, setIsLoading] = useState(false);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = cart.products.reduce(
    (acc, curr) => acc + curr.quantity * curr.price,
    0
  );

  async function handleCheckout() {
    setIsLoading(true);
    try {
      const stripe = await stripePromise;
      const res = await axiosInstance.post(
        "/api/stripe-checkout",
        {
          products: cart.products,
          user_email: user.currentUser?.email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.currentUser?.accessToken}`,
          },
          withCredentials: true,
        }
      );
      await stripe.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      });
    } catch (err) {
      console.log(err);
      if (
        (err.response.data === "You aren't authorized.." &&
          err.response.status === 401) ||
        (err.response.data === "Token is not valid" &&
          err.response.status === 403)
      ) {
        toast("You need to login first.");
        setTimeout(() => {
          navigate("/login");
        }, 0);
      }
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="cart">
      {cart.products.length ? (
        <>
          <h1>Products in your cart</h1>
          <div className="top">
            {cart.products?.map((item) => (
              <div className="item" key={item.id + item.size}>
                <div className="left">
                  <img
                    src={item.image.url.replace("/upload", "/upload/w_300")}
                    alt=""
                  />
                </div>
                <div className="right">
                  <Link to={`/product/${item._id}`} className="link title">
                    {item.title}
                  </Link>
                  <p className="desc">{item.desc.substring(0, 75)}...</p>
                  <p className="size">
                    Size: <span>{item.size}</span>
                  </p>
                  <p className="price">
                    {item.quantity} x ₹{item.price}
                  </p>
                  <MdDeleteOutline
                    className="delete-btn"
                    onClick={() => dispatch(removeFromCart(item))}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="bottom">
            <div className="subtotal">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>
            <div className="option">
              <button className="checkout-btn" onClick={handleCheckout}>
                Proceed to checkout
              </button>
              <p className="reset" onClick={() => dispatch(resetCart())}>
                Reset cart
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1>Your cart is empty.</h1>
          <h2>Start by adding a product.</h2>
          <Link className="link" to="/products">
            Click here
          </Link>
        </>
      )}
    </div>
  );
}

export default Cart;
