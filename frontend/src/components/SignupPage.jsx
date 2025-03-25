import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthApi from "../hooks/AuthApi";
import "./loginPage.css"; // Återanvända samma CSS

const SignupPage = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Lösenorden matchar inte.");
      return;
    }

    try {
      await AuthApi.signup({ email, password, firstName, lastName });
      navigate("/login");
    } catch (err) {
      setError("Registrering misslyckades. Försök igen.");
    }
  };

  return (
    <div className="loginWrapper">
      {" "}
      {/* Använder samma wrapper för centrerad layout */}
      <h1 className="loginHeader">Skapa konto</h1>
      <form onSubmit={handleSignup}>
        <div className="inputWrapper">
          <label>Förnamn</label>
          <input
            type="text"
            placeholder="Förnamn"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="inputWrapper">
          <label>Efternamn</label>
          <input
            type="text"
            placeholder="Efternamn"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="inputWrapper">
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="inputWrapper">
          <label>Lösenord</label>
          <input
            type="password"
            placeholder="Lösenord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="inputWrapper">
          <label>Bekräfta lösenord</label>
          <input
            type="password"
            placeholder="Bekräfta lösenord"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="linkWrapper">
          <p>
            Already have an account? Log in{" "}
            <Link to="/login" className="linkText">
              here
            </Link>
          </p>
        </div>

        <button className="userbutton" type="submit">
          Registrera
        </button>
      </form>
      {error && <p className="errorText">{error}</p>}
    </div>
  );
};

export default SignupPage;
