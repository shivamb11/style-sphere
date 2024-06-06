import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import Loader from "../../components/Loader/Loader.jsx";
import "./User.scss";
import { validateEmail } from "../../helpers.js";
import axiosInstance from "../../axios.js";

async function getUser(id, accessToken) {
  try {
    const res = await axiosInstance.get(`/api/users/${id}`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

function User() {
  const user = useSelector((state) => state.user);

  const { data, isLoading } = useQuery({
    queryKey: [user.currentUser.id],
    queryFn: () => getUser(user.currentUser.id, user.currentUser.accessToken),
  });

  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("XXXXXXX");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [error, setError] = useState("");

  useEffect(
    function () {
      if (data) {
        setFullname(data?.fullname);
        setUsername(data?.username);
        setEmail(data?.email);
        setStreet(data?.street);
        setCity(data?.city);
        setState(data?.state);
      }
    },
    [data]
  );

  if (isLoading) {
    return <Loader />;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Email id is not valid");
      return;
    }

    try {
      setError("");
      const res = await axiosInstance.put(
        `/api/users/${user.currentUser.id}`,
        { fullname, email, street, city, state },
        {
          headers: {
            authorization: `Bearer ${user.currentUser.accessToken}`,
          },
        }
      );
      toast.success("Details updated successfully");
    } catch (err) {
      setError(err.response.data);
    }
  }

  return (
    <div className="user">
      <Toaster />
      <h1>User Details</h1>
      <form
        action=""
        method="PUT"
        onSubmit={handleSubmit}
        className="wrapper"
        noValidate
      >
        <div className="left">
          <div className="avatar">
            <img src="/images/user2.jpeg" alt="" />
          </div>
          <div className="name">
            <input
              type="text"
              name="firstname"
              id="firstname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>
          {data.isAdmin && <p>(Admin)</p>}
        </div>
        <div className="right">
          <div className="input-container">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled
            />
          </div>
          <div className="input-container">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label htmlFor="street">Street</label>
            <input
              type="street"
              name="street"
              id="street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label htmlFor="city">City</label>
            <input
              type="city"
              name="city"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label htmlFor="state">State</label>
            <input
              type="state"
              name="state"
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          {error && <p className="error">{error}</p>}
          <div className="actions">
            <Link className="link" to="/">
              Go back
            </Link>
            <button type="submit">Save details</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default User;
