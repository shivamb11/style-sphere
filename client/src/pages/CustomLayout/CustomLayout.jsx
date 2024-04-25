import { useState } from "react";
import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";

import Navbar from "../../components/Navbar/Navbar.jsx";
import NavbarMenu from "../../components/NavbarMenu/NavbarMenu.jsx";
import "./CustomLayout.scss";

function CustomLayout() {
  const [showNavbarMenu, setShowNavbarMenu] = useState(null);

  return (
    <div className="custom-app">
      <Toaster />
      <Navbar
        showNavbarMenu={showNavbarMenu}
        onNavbarMenu={setShowNavbarMenu}
      />
      {showNavbarMenu && (
        <NavbarMenu
          showNavbarMenu={showNavbarMenu}
          onNavbarMenu={setShowNavbarMenu}
        />
      )}
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
}

export default CustomLayout;
