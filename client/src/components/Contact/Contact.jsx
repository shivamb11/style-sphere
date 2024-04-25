import {
  Facebook,
  Google,
  Instagram,
  Pinterest,
  Twitter,
} from "@mui/icons-material";

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
        <Facebook />
        <Instagram />
        <Twitter />
        <Google />
        <Pinterest />
      </div>
    </div>
  );
}

export default Contact;
