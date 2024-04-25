import { Link } from "react-router-dom";

import "./Categories.scss";

function Categories() {
  return (
    <div className="categories">
      <div className="image-container">
        <img
          src="https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <Link to="/products/accessories/bags">
          <button>Bags</button>
        </Link>
      </div>
      <div className="image-container">
        <img
          src="https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <Link to="/products/women">
          <button>Women</button>
        </Link>
      </div>
      <div className="image-container">
        <img
          src="https://images.pexels.com/photos/1813947/pexels-photo-1813947.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <Link to="/products/accessories">
          <button>Accessories</button>
        </Link>
      </div>
      <div className="image-container">
        <img
          src="https://images.unsplash.com/photo-1666289973858-cd35e4beb492?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <Link to="/products/men">
          <button>Men</button>
        </Link>
      </div>
      <div className="image-container">
        <img
          src="https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <Link to="/products?type=sports shoes">
          <button>Shoes</button>
        </Link>
      </div>
      <div className="image-container">
        <img
          src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <Link to="/products">
          <button>All Products</button>
        </Link>
      </div>
    </div>
  );
}

export default Categories;
