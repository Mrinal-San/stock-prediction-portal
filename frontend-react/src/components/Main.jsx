import React from "react";
import "../assets/css/Main.css";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider";

const Main = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
      <section className="hero-section">
      <div className="container">
        <div className="hero-content">

          <span className="hero-badge">
            AI-Powered Financial Intelligence
          </span>

          <h1 className="hero-title">
            Predict <em>Smarter</em>, Invest <em>Better</em>
          </h1>

          <p className="hero-description">
            Leverage <strong>Artificial Intelligence</strong> and
            <strong> Machine Learning</strong> to analyze market trends,
            forecast stock movements, and make
            <strong> data-driven investment decisions</strong> with confidence.
          </p>

          <div className="hero-buttons">
          {isLoggedIn ? (
            <Link to="/dashboard" className="primary-btn">
              Explore Now
            </Link>
            ) : (
            <>
            <Link to="/login" className="login-btn">
              Login
            </Link>
          
            <Link to="/register" className="register-btn">
              Get Started
            </Link>
            </>
                      )}

          </div>

        </div>
      </div>
    </section>
  );
};

export default Main;