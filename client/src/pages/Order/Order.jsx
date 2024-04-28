import { useQuery } from "@tanstack/react-query";
import { Link, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";

import { getDeliveryDate } from "../../helpers.js";
import Loader from "../../components/Loader/Loader.jsx";
import "./Order.scss";
import { useDispatch } from "react-redux";
import { resetCart } from "../../redux/cartReducer.js";

async function getOrder(id, payment, dispatch) {
  try {
    const res = await axios.get(
      `https://style-sphere-api.vercel.app/api/orders/${id}`
    );

    if (payment) {
      dispatch(resetCart());
    }
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

function Order() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const payment = searchParams.get("payment");

  const dispatch = useDispatch();

  const { data, isLoading, error } = useQuery({
    queryKey: [id],
    queryFn: () => getOrder(id, payment, dispatch),
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="order">
      {payment === "true" ? (
        <>
          <h2 className="success">Payment successful 🙌</h2>
          <p className="reference-id">Reference id: ({id})</p>
          <p>Your order will be delivered by {getDeliveryDate()}</p>
          <p>Happy shopping</p>
        </>
      ) : (
        <>
          <h2 className="failure">Payment failed 😥</h2>
          <p className="reference-id">Reference id: ({id})</p>
          <Link className="link" to={"/cart"}>
            Go to cart
          </Link>
        </>
      )}
    </div>
  );
}

export default Order;
