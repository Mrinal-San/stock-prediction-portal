import React from "react";
import "../assets/css/Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="container">

        <div className="footer-bottom">
          <p>
            © {year} StockPredict. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;