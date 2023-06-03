import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth, fetchLogin, fetchAuth } from "../../redux/slices/auth";
import { Link, Navigate } from "react-router-dom";

import Spinner from "../../Components/Spinner/Spinner";

import "./LoginPage.scss";
import { fetchLinks } from "../../redux/slices/links";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const submitForm = async (event) => {
    event.preventDefault();
    const params = { email: email, password: password };
    await setSubmitting((submitting) => true);
    const data = await dispatch(fetchLogin(params));
    await setSubmitting((submitting) => false);

    if (!data.payload) {
      return alert("Auth error");
    }
    if (!data.payload.success) {
      return alert(data.payload.message);
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
      dispatch(fetchAuth());
      dispatch(fetchLinks());
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="login__page">
        <div className="login__space">
          {submitting ? (
            <>
              <Spinner />
            </>
          ) : (
            <>
              <div className="title">Login</div>

              <form className="login__form" onSubmit={submitForm}>
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
                  //value={"*".repeat(password.length)}
                  onChange={(e) =>
                    setPassword((password) => e.nativeEvent.target.value)
                  }
                />
                <button className="btn btn-primary" type="submit">
                  Login
                </button>
              </form>
              <div className="register__link">
                <Link to="/register">Don't have account?</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginPage;
