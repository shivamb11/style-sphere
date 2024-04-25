import { useState } from "react";
import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";

import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import NavbarMenu from "../../components/NavbarMenu/NavbarMenu.jsx";
import "./AppLayout.scss";

function AppLayout() {
  const [showNavbarMenu, setShowNavbarMenu] = useState(null);

  return (
    <div className="app-layout">
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

      <Footer />
    </div>
  );
}

export default AppLayout;
