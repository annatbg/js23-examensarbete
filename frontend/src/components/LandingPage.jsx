import React from "react";
import useUser from "../store/userStore";
import { useNavigate } from "react-router-dom";
import "./loginPage.css";

const LandingPage = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  return (
    <div className="loginWrapper">
      <h1>Hej {user?.firstName}!</h1>
      <p>Du är inloggad.</p>

      {/* Logga ut-knapp */}
      <button
        className="userbutton"
        onClick={() => {
          logout();
          navigate("/login");
        }}
      >
        Logga ut
      </button>

      {/* Lägg till produkt-knapp */}
      <button
        className="add-product-btn"
        onClick={() => navigate("/addproduct")}
      >
        +
      </button>
    </div>
  );
};

export default LandingPage;
