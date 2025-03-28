import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import LandingPage from "./components/LandingPage";
import useUser from "./store/userStore";
import useProducts from "./store/productStore";
import ProductForm from "./components/ProductForm";

const App = () => {
  const { user } = useUser(); // Hämtar användaren från Zustand store
  const { products } = useProducts();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/addproduct" element={<ProductForm />} />
      </Routes>
    </Router>
  );
};

export default App;
