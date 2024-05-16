import {
  FaFacebook,
  FaGoogle,
  FaInstagram,
  FaPinterest,
  FaTwitter,
} from "react-icons/fa";

import "./Contact.scss";

function Contact() {
  return (
    <div className="contact">
      <span>Be in touch with us.</span>
      <div className="mail">
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Enter your email"
        />
        <button>Join Us</button>
      </div>
      <div className="icons">
        <FaFacebook style={{ fontSize: "22px" }} />
        <FaInstagram style={{ fontSize: "22px" }} />
        <FaTwitter style={{ fontSize: "22px" }} />
        <FaGoogle style={{ fontSize: "22px" }} />
        <FaPinterest style={{ fontSize: "22px" }} />
      </div>
    </div>
  );
}

export default Contact;
