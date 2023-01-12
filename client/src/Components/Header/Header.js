import logoutImage from "../../Images/logout.png";

import "./Header.scss";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAuth, logout } from "../../redux/slices/auth";
import { fetchLinks } from "../../redux/slices/links";

const Header = () => {
  const user = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickLogout = () => {
    if (window.confirm("You really want to exit?")) {
      dispatch(logout());
      localStorage.clear();
      dispatch(fetchAuth());
      dispatch(fetchLinks());
    }
  };

  return (
    <>
      <div className="header">
        <div className="content">
          <div className="user__data">
            {user.data === null ? (
              <div className="auth">
                <button
                  className="btn btn-primary login"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="btn btn-primary register "
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
              </div>
            ) : (
              <div className="logged__user">
                <div className="user__email">{user.data.email}</div>
                <button
                  className="logout btn btn-primary"
                  onClick={onClickLogout}
                >
                  <div className="logout__text">Logout</div>
                  <img
                    src={logoutImage}
                    alt="logout image"
                    className="logout__image"
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
