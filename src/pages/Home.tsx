import HomeSlider from "../components/HomeSlider";
import Search from "../components/Search";

const Home = () => {
  return (
    <div className="home">
      <HomeSlider />
      <div className="container">
        <Search />
        <div className="categories"></div>
      </div>
    </div>
  );
};

export default Home;
