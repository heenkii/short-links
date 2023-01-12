import "./Footer.scss";

import telegramIcon from "../../Images/telegram.png";
import discordIcon from "../../Images/discord.png";
import githubIcon from "../../Images/github.png";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="content">
          <div className="links">
            <a
              href="https://discord.com/users/net-walker#9930"
              target="_blank"
              className="social__link"
            >
              <img src={discordIcon} alt="discord" className="social__icon" />
            </a>
            <a
              href="https://t.me/n3t_walker"
              target="_blank"
              className="social__link"
            >
              <img src={telegramIcon} alt="discord" className="social__icon" />
            </a>
            <a
              href="https://github.com/n3t-walker"
              target="_blank"
              className="social__link"
            >
              <img src={githubIcon} alt="discord" className="social__icon" />
            </a>
          </div>
          <div className="creator">net-walker</div>
        </div>
      </div>
    </>
  );
};

export default Footer;
