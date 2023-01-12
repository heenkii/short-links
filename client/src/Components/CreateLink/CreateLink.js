import "./CreateLink.scss";

import closeImage from "../../Images/close.png";
import acceptImage from "../../Images/accept.png";

import { useDispatch } from "react-redux";
import { useState } from "react";
import { createLink } from "../../redux/slices/links";

const CreateLink = ({ closeWindow }) => {
  const [link, setLink] = useState("");
  const [activeBtn, setActiveBtn] = useState(false);

  const dispatch = useDispatch();

  const isUrl = (str) => {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  };

  const createNewLink = async () => {
    if (isUrl(link)) {
      const params = {
        originalLink: link,
      };
      const data = await dispatch(createLink(params));
      setLink((link) => "");
      closeWindow();
    } else {
      alert("Link was'n created");
    }
  };
  const closeForm = () => {
    setLink((link) => "");
    closeWindow();
  };

  return (
    <div className="create__link ">
      <input
        type="text"
        placeholder="Paste your link here"
        className="link__input"
        onChange={(e) => setLink((link) => e.target.value)}
        value={link}
      />
      <div className="buttons">
        <button onClick={createNewLink}>
          <img src={acceptImage} alt="save" />
        </button>
        <button onClick={closeForm}>
          <img src={closeImage} alt="close" />
        </button>
      </div>
    </div>
  );
};

export default CreateLink;
