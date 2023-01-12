import "./HomePage.scss";

import { useSelector } from "react-redux";

import LinksPlaceholder from "../../Components/Placeholders/LinksPlaceholder/LinksPlaceholder";
import AdminPanel from "../../Components/AdminPanel/AdminPanel";
import Spinner from "../../Components/Spinner/Spinner";
import ConfirmAccount from "../../Components/ConfirmAccount/ConfirmAccount";

const HomePage = () => {
  const user = useSelector((store) => store.auth);

  const isAuth = user.data !== null;

  const isLoading = user.status === "loading";

  return (
    <>
      <div className="user__content">
        {isLoading ? (
          <Spinner />
        ) : isAuth ? (
          user.data.confirm ? (
            <AdminPanel />
          ) : (
            <ConfirmAccount />
          )
        ) : (
          <LinksPlaceholder />
        )}
      </div>
    </>
  );
};

export default HomePage;
