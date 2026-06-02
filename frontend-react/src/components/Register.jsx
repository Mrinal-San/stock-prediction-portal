import React,{useState} from "react";
import axios from "axios";
import "../assets/css/Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userData = {
      username,
      email,
      password
    };

    try {
      const response = await axios.post('http://localhost:8000/api/v1/register/', userData);
      console.log('response.data==>', response.data);
      console.log('Registration successful!');
      setError({});
      setSuccess(true);
    } catch(error) {
      setError(error.response.data);
      console.error('Registration Error:', error.response.data);
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="register-header">
          <h2>Create Account</h2>
        </div>

        <form className="register-form" onSubmit={handleRegistration}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <small>{error.username && <div className = 'text-danger'>{error.username}</div>}</small>
           </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <small>{error.password && <div className = 'text-danger'>{error.password}</div>}</small>
          </div>
          {success && <div className="alert alert-success">Registration successful! You can now log in.</div>}
          
          {loading ?(
            <button type="submit" className="register-submit-btn" disabled>
            Please wait...
          </button>
          ):(
          <button type="submit" className="register-submit-btn">
            Create Account
          </button>
        )}
        </form>

        <div className="register-footer">
          Already have an account?
          <a href="/login"> Sign In</a>
        </div>
      </div>
    </div>
  );
};

export default Register;