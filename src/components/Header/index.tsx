// React and Hooks
import { useLocation, useNavigate } from "react-router-dom";

// Components and Pages
// *

// Assets and Styles
import LogoImage from "../../assets/images/acai-logo.svg";
import BackIcon from "../../assets/images/icon-back.svg";
import "./header.scss";

// Types
interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <header className={`${pathname === "/" ? "home" : ""}`}>
      {pathname === "/" ? (
        <img src={LogoImage} alt="Logo" />
      ) : (
        <div className="container">
          <div className="controls">
            <button className="back-button" onClick={() => navigate(-1)}>
              <img src={BackIcon} alt="back" />
            </button>
            <button className="ask-waiter-button">
              <span>Ofisiantı çağır</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
