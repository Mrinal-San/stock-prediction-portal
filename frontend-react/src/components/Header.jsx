import React from "react";
import "../assets/css/Header.css";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg sticky-top app-navbar">
      <div className="container">

        {/* Logo */}
        <a href="/" className="navbar-brand brand-logo">
          <span className="brand-accent">Stock</span>Predict
        </a>

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
            <a href="/login" className="login-btn">
              Login
            </a>

            <a href="/register" className="register-btn">
              Get Started
            </a>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Header;