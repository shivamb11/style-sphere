import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { loginComplete, loginStart } from "../../redux/userReducer.js";
import "./Register.scss";
import { validateEmail } from "../../helpers.js";
import axiosInstance from "../../axios.js";

function Register() {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [agreement, setAgreement] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleAgreement() {
    setError("");
    setAgreement((state) => !state);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Email id is not valid");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!agreement) {
      setError("This consent is required.");
      return;
    }

    try {
      setError("");
      dispatch(loginStart());
      const res = await axiosInstance.post("/api/auth/register", {
        fullname,
        username,
        email,
        password,
        street,
        city,
        state,
      });
      dispatch(loginComplete(res.data));
      toast.success("Registered successfully");
      setTimeout(() => {
        navigate("/");
      }, 0);
    } catch (err) {
      setError(err.response.data);
    }
  }

  return (
    <div className="register">
      <div className="wrapper">
        <h1>Create an account</h1>
        <form method="POST" onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullname"
            id="fullname"
            placeholder="Fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />

          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            name="confirmpassword"
            id="confirmpassword"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <input
            type="text"
            name="street"
            id="street"
            placeholder="Street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
          <input
            type="text"
            name="city"
            id="city"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text"
            name="state"
            id="state"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />

          <div>
            <input
              type="checkbox"
              name="agreement"
              id="agreement"
              value={agreement}
              onChange={handleAgreement}
            />
            <label htmlFor="agreement">
              By creating an account, I consent to the processing of my personal
              data in accordance with the <b>PRIVACY POLICY</b>.
            </label>
          </div>
          {error && <p className="error">{error}</p>}
          <button>Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
