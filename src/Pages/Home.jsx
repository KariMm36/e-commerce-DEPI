import BestSelling from "../Components/BestSelling";
import BrowseByCategory from "../Components/BrowseByCategory";
import CategoryMenu from "../Components/CategoryMenu";
import FlashSales from "../Components/FlashSales";
import HeroSlider from "../Components/HeroSlider";
import PromoSection from "../Components/Promo";

const Home = () => {
  return (
    <div className="container mt-4">
      <HeroSlider />
      <FlashSales/>
      <BrowseByCategory />
      <BestSelling />
      <PromoSection/>
    </div>

    
  );
};

export default Home;
