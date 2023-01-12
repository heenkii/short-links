import "./UserLinks.scss";

import { useDispatch } from "react-redux";
import { deleteLink } from "../../redux/slices/links";
import { Fragment } from "react";
import deleteImage from "../../Images/delete-button.png";

const UserLinks = ({ link, index }) => {
  const dispatch = useDispatch();

  const deleteUserLink = async () => {
    if (window.confirm("You really want delete this link?")) {
      await dispatch(deleteLink({ id: link._id }));
    }
  };

  const dateCreate = new Date(link.createdAt);
  const date = {
    hours: dateCreate.getHours(),
    minutes: dateCreate.getMinutes(),
    days: dateCreate.getDate(),
    month: dateCreate.getMonth() + 1,
    year: dateCreate.getFullYear(),
  };

  console.log(date);

  Object.keys(date).forEach((key) => {
    if (date[key] < 10) {
      date[key] = "0" + date[key];
    }
  });

  console.log(date);

  return (
    <Fragment key={index}>
      <div className="link">
        <div className="link__data">
          <div className="original__link">
            Origin link: <a href={link.to}>{link.to}</a>
          </div>
          <div className="redirect__link">
            Custom Link:{" "}
            <a href={link.from} target={"_blank"}>
              {link.from}
            </a>
          </div>
          <div className="time__create">
            Time create:
            {` ${date.hours}:${date.minutes} ${date.days}.${date.month}.${date.year}`}
          </div>
          <div className="link__views">Clicks: {link.clicks} views</div>
        </div>
        <div className="link__tools">
          <button className="delete__btn" onClick={deleteUserLink}>
            <img
              className="delete__image"
              src={deleteImage}
              alt="delete image"
            />
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default UserLinks;
