import { Link } from "react-router-dom";
import { MdLocationOn, MdMail, MdPhone } from "react-icons/md";

import "./Footer.scss";

function Footer() {
  return (
    <footer className="footer">
      <div className="top">
        <div className="item">
          <h2>Categories</h2>
          <ul>
            <Link className="link" to="/products/men">
              Men
            </Link>
            <Link className="link" to="/products/women">
              Women
            </Link>
            <Link className="link" to="/products/kids">
              Kids
            </Link>
            <Link className="link" to="/products/accessories">
              Accessories
            </Link>
            <Link className="link" to="/products?special=new">
              New Arrivals
            </Link>
          </ul>
        </div>
        <div className="item">
          <h2>Links</h2>
          <ul>
            <Link className="link" to="">
              FAQ
            </Link>
            <Link className="link" to="">
              Pages
            </Link>
            <Link className="link" to="">
              Stores
            </Link>
            <Link className="link" to="">
              Compare
            </Link>
            <Link className="link" to="">
              Cookies
            </Link>
          </ul>
        </div>
        <div className="item">
          <h2>About</h2>
          <p className="about">
            At StyleSphere, we believe that style extends beyond
            clothing—it&apos;s a way of life. Step in with us as we celebrate
            the synergy of style, health, and design that defines a life of
            extraordinary quality.
          </p>
        </div>
        <div className="item" id="contact">
          <h2>Contact</h2>
          <div className="contact-item">
            <MdLocationOn style={{ fontSize: "24px" }} />
            <span>432 Kingsway, Dexter 84336</span>
          </div>
          <div className="contact-item">
            <MdPhone style={{ fontSize: "24px" }} />
            <span>+1 234 5678</span>
          </div>
          <div className="contact-item">
            <MdMail style={{ fontSize: "24px" }} />
            <span>shivamsb2003@gmail.com</span>
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="left">
          <h2 className="logo">StyleSphere</h2>
          <div className="copyright">© Copyright 2024. All Rights Reserved</div>
        </div>
        <div className="right">
          <img className="payments" src="/images/payment.png" alt="payment" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
