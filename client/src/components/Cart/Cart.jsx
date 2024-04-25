import { DeleteOutline } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Link } from "react-router-dom";

import { removeFromCart, resetCart } from "../../redux/cartReducer.js";
import "./Cart.scss";

const stripePromise = loadStripe(
  "pk_test_51P7TpZSHDZnO68CZsubU7g4NUnrCqI0eO3jhlzBhRhTMxZZH13KU0yLjuXsod8bKclLyQEg07MzhkmqbSdeHvzMw00Yl8O9M6T"
);

function Cart({ onShowCart }) {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const total = cart.products.reduce(
    (acc, curr) => acc + curr.quantity * curr.price,
    0
  );

  async function handleCheckout() {
    try {
      const stripe = await stripePromise;
      const res = await axios.post(
        "http://localhost:3000/api/stripe-checkout",
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
        window.location.href = "/login";
      }
    }
  }

  return (
    <div className="cart" onBlur={() => onShowCart(false)}>
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
                  <h2>{item.title}</h2>
                  <p className="desc">{item.desc.substring(0, 80)}</p>
                  <p className="size">
                    Size: <span>{item.size}</span>
                  </p>
                  <p className="price">
                    {item.quantity} x ₹{item.price}
                  </p>
                  <DeleteOutline
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
