// React and Hooks
import { CSSProperties, useState } from "react";
import { Link } from "react-router-dom";

// Dummy Data
import HomeData from "../../data/home.json";

// Components and Pages
import HomeSlider from "../../components/HomeSlider";
import Search from "../../components/Search";

// Assets and Styles
import "./home.scss";

// Types

// Allow to Add Custom CSS variables (properties), can be used in future
export interface CustomCSS extends CSSProperties {
  "--_grid-items-count": number;
}

const Home = () => {
  const [query, setQuery] = useState<string>("");

  const filteredItems = HomeData.categories.items.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="home">
      <HomeSlider items={HomeData.slider.items} />
      <div className="container">
        <Search setQuery={setQuery} />
        <section className="categories">
          <ul
            role="list"
            className="categories__inner"
            style={
              {
                "--_grid-items-count": HomeData.categories.items.length,
              } as CustomCSS
            }
          >
            {filteredItems.map((c, idx) => {
              return (
                <Link to={`/${c.href}`} key={idx}>
                  <li className="category-item">
                    <img loading="lazy" src={c.img_url} alt={c.name} />
                    <span>{c.name}</span>
                  </li>
                </Link>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Home;
