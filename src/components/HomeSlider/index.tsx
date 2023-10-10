// React and Hooks
// *

// Components and Pages
// *

// Assets and Styles
import "./home_slider.scss";

// Types
interface HomeSliderProps {
  items: {
    name: string;
    img_url: string;
  }[];
}

const HomeSlider: React.FC<HomeSliderProps> = ({ items }) => {
  return (
    <section
      className="home-slider"
      data-animated={
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      }
    >
      <ul className="home-slider__inner">
        {items.map((item, idx) => {
          return (
            <li key={idx} className="home-slider-item">
              <img src={item.img_url} alt={item.name} />
              <div className="home-slider-item__name">
                <span>{item.name}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default HomeSlider;
