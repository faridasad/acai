// Dummy Data
import HomeData from "../../data/home.json";

// Components and Styles
import HomeSlider from "../../components/HomeSlider";
import Search from "../../components/Search";

import "./home.scss"
import { CSSProperties } from "react";

// Types 
export interface CustomCSS extends CSSProperties {
  '--_grid-items-count': number;
}

const Home = () => {
  return (
    <div className="home">
      <HomeSlider items={HomeData.slider.items} />
      <div className="container">
        <Search />
        <section className="categories">
          <ul role="list" className="categories__inner" style={{'--_grid-items-count': HomeData.categories.items.length} as CustomCSS}>
            {HomeData.categories.items.map((c, idx) => {
              return (
                <li className="category-item" key={idx}>
                  <img src={c.img_url} alt={c.name} />
                  <span>{c.name}</span>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Home;
