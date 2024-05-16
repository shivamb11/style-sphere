import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { HashLink } from "react-router-hash-link";
import {
  MdOutlinePerson,
  MdOutlineSearch,
  MdOutlineShoppingCart,
} from "react-icons/md";

import Cart from "../Cart/Cart.jsx";
import UserMenu from "../UserMenu/UserMenu.jsx";
import "./Navbar.scss";

function Navbar({ onNavbarMenu }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const cart = useSelector((state) => state.cart);

  const navigate = useNavigate();

  async function handleSearchQuery(e) {
    e.preventDefault();

    navigate(`/products?name=${searchQuery}`);
  }

  function handleShowUserMenu() {
    setShowCart(false);
    setShowUserMenu((state) => !state);
  }

  function handleShowCart() {
    setShowUserMenu(false);
    setShowCart((state) => !state);
  }

  return (
    <nav className="navbar">
      <div className="wrapper">
        <div
          className="left"
          onMouseLeave={(e) => {
            if (
              (e.relatedTarget.nodeName === "DIV" &&
                e.relatedTarget.className === "wrapper") ||
              (e.relatedTarget.nodeName === "NAV" &&
                e.relatedTarget.className === "navbar")
            ) {
              onNavbarMenu(false);
            }
          }}
        >
          <div
            className="item"
            onMouseEnter={() => onNavbarMenu(1)}
            onClick={() => onNavbarMenu(false)}
          >
            <Link className="link category" to="/products/men">
              Men
            </Link>
          </div>
          <div
            className="item"
            onMouseEnter={() => onNavbarMenu(2)}
            onClick={() => onNavbarMenu(false)}
          >
            <Link className="link category" to="/products/women">
              Women
            </Link>
          </div>
          <div
            className="item"
            onMouseEnter={() => onNavbarMenu(3)}
            onClick={() => onNavbarMenu(false)}
          >
            <Link className="link category" to="/products/kids">
              Kids
            </Link>
          </div>
          <div
            className="item"
            onMouseEnter={() => onNavbarMenu(4)}
            onClick={() => onNavbarMenu(false)}
          >
            <Link className="link category" to="/products/accessories">
              Accessories
            </Link>
          </div>
        </div>
        <div className="center">
          <Link className="link" to="/">
            StyleSphere
          </Link>
        </div>
        <div className="right">
          <div className="item">
            <HashLink smooth className="link" to="/#">
              Home
            </HashLink>
          </div>
          <div className="item">
            <HashLink smooth className="link" to="/#contact">
              Contact
            </HashLink>
          </div>
          <div className="icons">
            <form method="GET" onSubmit={handleSearchQuery} className="search">
              <input
                type="text"
                name="searchquery"
                id="searchquery"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <label htmlFor="searchquery">
                <MdOutlineSearch style={{ fontSize: "25px" }} />
              </label>
            </form>
            <div onClick={handleShowUserMenu}>
              <MdOutlinePerson style={{ fontSize: "25px" }} />
            </div>
            {showUserMenu && <UserMenu />}

            <div className="cart-icon" onClick={handleShowCart}>
              <MdOutlineShoppingCart style={{ fontSize: "25px" }} />
              <span>{cart?.products?.length || 0}</span>
            </div>
          </div>
        </div>
      </div>
      {showCart && <Cart onShowCart={handleShowCart} />}
    </nav>
  );
}

export default Navbar;
