import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAuth } from "./redux/slices/auth";
import { fetchLinks } from "./redux/slices/links";
import { Route, Routes } from "react-router-dom";

import "./App.scss";

import Footer from "./Components/Footer/Footer";
import LoginPage from "./Pages/Login/LoginPage";
import HomePage from "./Pages/Home/HomePage";
import Header from "./Components/Header/Header";
import RegisterPage from "./Pages/Register/RegisterPage";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuth());
    dispatch(fetchLinks());
  }, []);

  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="main">
          <div className="content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default App;
