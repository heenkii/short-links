import "./AdminPanel.scss";

import { useSelector } from "react-redux";
import { useState } from "react";

import UserLinks from "../UserLinks/UserLinks";
import Spinner from "../Spinner/Spinner";
import CreateLink from "../CreateLink/CreateLink";

const AdminPanel = () => {
  const [linksFilter, setLinksFilter] = useState("");

  const [addForm, setAddForm] = useState(false);
  const links = useSelector((store) => store.links);
  const isLoading = links.status === "loading";
  const closeCreateLinkForm = () => {
    setAddForm((addForm) => false);
  };

  const showCreateLinkForm = () => {
    setAddForm((addForm) => true);
  };
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="tool__panel">
            <input
              className="find__link"
              type="text"
              placeholder="Find link"
              onChange={(e) => setLinksFilter((linksFilter) => e.target.value)}
            />

            <button
              type="button"
              className="btn btn-primary create__link__btn"
              onClick={showCreateLinkForm}
            >
              New
            </button>
          </div>

          {addForm ? <CreateLink closeWindow={closeCreateLinkForm} /> : ""}
          <div className="links__list">
            {links.data.map((link, index) => {
              if (
                link.from.includes(linksFilter) ||
                link.to.includes(linksFilter)
              ) {
                return <UserLinks link={link} index={index} />;
              }
            })}
          </div>
        </>
      )}
    </>
  );
};

export default AdminPanel;

/* <div className="sort__panel">
              <div className="sort__btn name sort__div">
                <button type="button" className="btn btn-primary name__sort">
                  Name
                </button>
              </div>
              <div className="sort__btn time sort__div">
                <button type="button" className="btn btn-primary time__sort">
                  Time
                </button>
              </div>
              <div className="sort__btn views sort__div">
                <button type="button" className="btn btn-primary views__sort">
                  Views
                </button>
              </div>
            </div> */
