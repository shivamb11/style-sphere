import { useQuery } from "@tanstack/react-query";
import { Link, useParams, useSearchParams } from "react-router-dom";

import { getDeliveryDate } from "../../helpers.js";
import Loader from "../../components/Loader/Loader.jsx";
import "./Order.scss";
import { useDispatch } from "react-redux";
import { resetCart } from "../../redux/cartReducer.js";
import axiosInstance from "../../axios.js";

async function getOrder(id, payment, dispatch) {
  try {
    const res = await axiosInstance.get(
      `/api/orders/${id}`
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
          <Link className="link" to={"/products"}>
            Go to products
          </Link>
        </>
      )}
    </div>
  );
}

export default Order;
