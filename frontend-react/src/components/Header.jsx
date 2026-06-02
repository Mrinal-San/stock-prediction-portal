import React from "react";
import "../assets/css/Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg sticky-top app-navbar">
      <div className="container">

        {/* Logo */}
        <Link to="/" className="navbar-brand brand-logo">
          <span className="brand-accent">Stock</span>Predict
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Actions */}
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarContent"
        >
          <div className="nav-actions">
            <Link to="/login" className="login-btn">
              Login
            </Link>

            <Link to="/register" className="register-btn">
              Get Started
            </Link>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Header;