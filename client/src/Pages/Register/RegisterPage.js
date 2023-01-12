import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsAuth,
  fetchAuth,
  fetchRegister,
} from "../../redux/slices/auth";
import { Link, Navigate } from "react-router-dom";

import Spinner from "../../Components/Spinner/Spinner";

import "./RegisterPage.scss";
import { fetchLinks } from "../../redux/slices/links";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const submitForm = async (event) => {
    event.preventDefault();
    const params = { email: email, password: password };
    //const params = { email: "test@mail.ru", password: "12345" };
    await setSubmitting((submitting) => true);
    const data = await dispatch(fetchRegister(params));
    await setSubmitting((submitting) => false);
    if (!data.payload) {
      return alert("Auth error");
    }
    if (!data.payload.success) {
      return alert(data.payload.message);
    }
    if ("token" in data.payload) {
      alert("Check your email and confirm your account");
      window.localStorage.setItem("token", data.payload.token);
      dispatch(fetchAuth());
      // dispatch(fetchLinks());
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="register__page">
        <div className="register__space">
          {submitting ? (
            <>
              <Spinner />
            </>
          ) : (
            <>
              <div className="title">Register</div>

              <form className="register__form" onSubmit={submitForm}>
                <input
                  type="email"
                  className="email"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail((email) => e.target.value)}
                />
                <input
                  type="password"
                  className="password"
                  placeholder="password"
                  value={"*".repeat(password.length)}
                  onChange={(e) => setPassword((password) => e.target.value)}
                />
                <button className="btn btn-primary" type="submit">
                  Register
                </button>
              </form>
              <div className="login__link">
                <Link to="/login">Already have account?</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
