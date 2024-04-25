import { Link } from "react-router-dom";

import "./NavbarMenu.scss";

const data = [
  {
    category: "men",
    subcategory: [
      {
        heading: "topwear",
        options: ["t shirts", "formal shirts", "casual shirts", "jackets"],
      },
      {
        heading: "bottomwear",
        options: ["jeans", "trousers", "shorts"],
      },
      {
        heading: "footwear",
        options: ["formal shoes", "sports shoes"],
      },
    ],
  },
  {
    category: "women",
    subcategory: [
      {
        heading: "topwear",
        options: ["tops", "frocks", "coats"],
      },
      {
        heading: "bottomwear",
        options: ["jeans", "skirts"],
      },
      {
        heading: "footwear",
        options: ["heels", "sports shoes"],
      },
    ],
  },
  {
    category: "kids",
    subcategory: [
      {
        heading: "boys",
        options: ["t shirts", "jackets", "jeans", "shoes"],
      },
      {
        heading: "girls",
        options: ["tops", "frocks", "jeans", "shoes"],
      },
    ],
  },
  {
    category: "accessories",
    subcategory: [
      {
        heading: "bags",
        options: ["office bags", "travel bags", "school bags"],
      },
      {
        heading: "wearable",
        options: ["caps", "hats", "sunglasses"],
      },
    ],
  },
];

function NavbarMenu({ showNavbarMenu, onNavbarMenu }) {
  return (
    <div
      className="navbar-menu"
      onMouseEnter={() => onNavbarMenu((state) => state)}
      onMouseLeave={(e) => {
        if (
          e.relatedTarget.nodeName === "DIV" &&
          e.relatedTarget.className === "left"
        ) {
          return;
        }
        onNavbarMenu(false);
      }}
    >
      {data[showNavbarMenu - 1].subcategory.map((item) => (
        <div className="subcategory" key={item.heading}>
          <Link
            to={`/products/${data[showNavbarMenu - 1].category}/${
              item.heading
            }`}
            className="link h2"
          >
            {item.heading}
          </Link>
          <ul>
            {item.options.map((option) => (
              <Link
                to={`/products/${
                  data[showNavbarMenu - 1].category
                }?type=${option.replace("%", "")}`}
                key={option}
                className="link li"
              >
                {option.replace("%", " ")}
              </Link>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default NavbarMenu;
