import "./ConfirmAccount.scss";

import { resendConfirmEmail } from "../../redux/slices/auth";

const ConfirmAccount = () => {
  const sendConfirmEmail = async () => {
    console.log(1);
    const data = await resendConfirmEmail();
    if (!data.success) {
      return alert("Email isn't send");
    } else {
      alert("Email send");
    }
  };
  return (
    <>
      <div className="confirm__account">
        <div className="title">Account isn't confirmed</div>
        <button onClick={sendConfirmEmail} className="btn btn-primary">
          Send message again
        </button>
      </div>
    </>
  );
};

export default ConfirmAccount;
