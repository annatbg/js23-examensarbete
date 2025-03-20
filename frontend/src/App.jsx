// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/loginPage"; // Din login-komponent
import useUser from "./store/userStore";

const App = () => {
  const { user } = useUser(); // Hämtar användaren från Zustand store

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
