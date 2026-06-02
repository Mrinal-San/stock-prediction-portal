import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/Register.css";
import { AuthContext } from "../AuthProvider";
import { useContext } from "react";
import axios from "axios";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const userData = {
            username,
            password
        };

        console.log('userData==>', userData);

        try{
            const response = await axios.post('http://localhost:8000/api/v1/token/', userData);
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            console.log('Login successful!');
            setIsLoggedIn(true);
            navigate('/');
        }catch(error){
            console.error('Invalid credentials');
            setError('Invalid username or password. Please try again.');
        }finally{
            setLoading(false);
        }
    };
  return (
    <div className="register-page">
      <div className="register-card">
        <div className="register-header">
          <h2>Login</h2>
        </div>

        <form className="register-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
           </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          {error && <div className="text-danger">{error}</div>}

          {loading ?(
            <button type="submit" className="register-submit-btn" disabled>
            Logging in...
          </button>
          ):(
          <button type="submit" className="register-submit-btn">
            Login
          </button>
        )}
        </form>

        <div className="register-footer">
          Don't have an account?
          <a href="/register"> Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;

