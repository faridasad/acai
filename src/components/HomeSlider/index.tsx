import "./home_slider.scss";

const SLIDER_ITEMS = [
  {
    name: "Səhər yeməyi set 10% endirim",
    img_url: "/breakfast.png",
  },
  {
    name: "Qarışıq set 5% endirim",
    img_url: "/mixed_set.png",
  },
  {
    name: "Səhər yeməyi set 10% endirim",
    img_url: "/breakfast.png",
  },
  {
    name: "Qarışıq set 5% endirim",
    img_url: "/mixed_set.png",
  },
];

const HomeSlider = () => {
  console.log("rendered");
  return (
    <section
      className="home-slider"
      data-animated={
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      }
    >
      <ul className="home-slider__inner">
        {SLIDER_ITEMS.map((item, idx) => {
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
