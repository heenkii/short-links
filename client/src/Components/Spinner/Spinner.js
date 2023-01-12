import "./Spinner.scss";
const Spinner = () => {
  return (
    <>
      <div className="spinner">
        <div className="spinner-grow" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
