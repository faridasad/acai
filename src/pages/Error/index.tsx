import "./error.scss"
import ErrorImage from "../../assets/images/404.svg"

import { useNavigate} from "react-router-dom"

 
const Error: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="error">
      <img src={ErrorImage} alt="404" />
      <span>Page Not Found</span>
      <button onClick={() => navigate("/")}>Home Page</button>
    </section>
  )
}

export default Error