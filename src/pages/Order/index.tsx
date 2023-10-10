// React and Hooks
import { useNavigate } from "react-router-dom";

// Components and Pages
// *

// Assets and Styles
import BackIcon from "../../assets/images/icon-back-white.svg";
import "./order.scss";

// Types
// *

const Order = () => {
  const navigate = useNavigate();

  return (
    <section className="order-page">
      <div className="container">
        <button
          className="back-button"
          onClick={() => navigate("/", { replace: true })}
        >
          <img src={BackIcon} alt="back" />
        </button>

        <div className="info">
          <img
            className="order-image"
            src="https://cdn.discordapp.com/attachments/1160119022831009823/1161054508814696509/order-image.png"
            alt="Order Image"
          />
          <div className="text">
            <h1>Sifarişiniz təsdiqləndi</h1>
            <span>⏳ 8-10 dəqiqəyə sifarişləriniz hazır olacaq.</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Order;
