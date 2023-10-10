// React and Hooks
import { useNavigate } from "react-router-dom";

// Components and Pages
// *

// Assets and Styles
import "./error.scss";
import ErrorImage from "../../assets/images/404.svg";

// Types
// *

const Error: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="error">
      <img src={ErrorImage} alt="404" />
      <span>Page Not Found</span>
      <button onClick={() => navigate("/")}>Home Page</button>
    </section>
  );
};

export default Error;
