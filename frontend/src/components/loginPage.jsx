// src/pages/LoginPage.js
import { useState } from "react";
import login from "../hooks/authApi";
import useUser from "../store/userStore";
import "./loginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login: setUser } = useUser(); // Zustand hook to access the login function

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      const { user, token } = data; // Assuming you get user and token from your backend

      // Store user data and token in Zustand store
      setUser(user, token);

      // Redirect user to the dashboard or another page
      // For example: navigate('/dashboard');
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="loginWrapper">
      <h1 className="loginHeader">Hi! Please login</h1>

      <form onSubmit={handleLogin}>
        <div className="inputWrapper">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="inputWrapper">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="userbutton" type="submit">
          Login
        </button>
      </form>
      {error && <p className="errorText">{error}</p>}
    </div>
  );
};

export default LoginPage;
