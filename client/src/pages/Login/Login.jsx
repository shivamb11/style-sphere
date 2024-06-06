import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { loginComplete, loginStart } from "../../redux/userReducer.js";
import "./Login.scss";
import axiosInstance from "../../axios.js";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!username) {
      setError("Username can't be empty");
      return;
    }
    if (!password) {
      setError("Password can't be empty");
      return;
    }

    try {
      setError("");
      dispatch(loginStart());
      const res = await axiosInstance.post("/api/auth/login", {
        username,
        password,
      });
      dispatch(loginComplete(res.data));
      toast.success("Logged in successfully");
      setTimeout(() => {
        navigate("/");
      }, 0);
    } catch (err) {
      setError(err.response.data);
    }
  }

  return (
    <div className="login">
      <div className="wrapper">
        <h1>Login into your account</h1>
        {error && <p className="error">{error}</p>}
        <form method="POST" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>Login</button>
          <Link className="link" to={{}}>
            Forgot password?
          </Link>
          <Link className="link" to={"/register"}>
            Create a new account
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
