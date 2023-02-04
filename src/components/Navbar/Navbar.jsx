import React, { useEffect, useState } from "react";
import logo from "../../assets/images/Netflix_Logo.png";
import user__logo from "../../assets/images/Netflix-avatar.png";
import "./navbar.css";

const Navbar = () => {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll", Window);
    };
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img className="nav__logo" src={logo} alt="Netflix Logo" />
      <img className="nav__avatar" src={user__logo} alt="User Logo" />
    </div>
  );
};

export default Navbar;
