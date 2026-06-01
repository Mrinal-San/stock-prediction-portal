import React from "react";
import "../assets/css/Main.css";

const Main = () => {
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
            <a href="/register" className="primary-btn">
              Get Started
            </a>

            <a href="/login" className="secondary-btn">
              Login
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Main;