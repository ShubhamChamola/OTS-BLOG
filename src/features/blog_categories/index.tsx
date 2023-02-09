import { useEffect, useState } from "react";
import ArrowSVG from "../../assets/icons/ArrowSVG";
import useHomeBlogStore from "../../store/useHomeBlogStore";

const BlogCategories: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All-Blogs");

  useEffect(() => {
    const allLinks = document.querySelectorAll("#set-categories ul li");
    if (allLinks) {
      allLinks.forEach((link) => {
        link.classList.remove("active");
      });
      document.getElementById(activeCategory)?.classList.add("active");
    }
  }, [activeCategory]);

  return (
    <article id="set-categories">
      <h4
        onClick={(event) => {
          event.currentTarget.parentElement?.classList.toggle("active");
        }}
      >
        Categories
        <span>
          <ArrowSVG />
        </span>
      </h4>
      <ul>
        <li
          id="All-Blogs"
          onClick={() => {
            useHomeBlogStore.setState({ category: "All Blogs" });
            setActiveCategory("All-Blogs");
          }}
        >
          All Blogs
        </li>
        <li
          id="Bike-Reviews"
          onClick={() => {
            useHomeBlogStore.setState({ category: "Bike Reviews" });
            setActiveCategory("Bike-Reviews");
          }}
        >
          Bike Review
        </li>
        <li
          id="Travel-&-Tips"
          onClick={() => {
            useHomeBlogStore.setState({ category: "Travel & Tips" });
            setActiveCategory("Travel-&-Tips");
          }}
          className="active"
        >
          Travel & Tips
        </li>
        <li
          id="Parts-&-Accessories"
          onClick={() => {
            useHomeBlogStore.setState({ category: "Parts & Accessories" });
            setActiveCategory("Parts-&-Accessories");
          }}
        >
          Parts & Accessories
        </li>
        <li
          id="Latest-News"
          onClick={() => {
            useHomeBlogStore.setState({ category: "Latest News" });
            setActiveCategory("Latest-News");
          }}
        >
          Latest News
        </li>
        <li
          id="Maintenance"
          onClick={() => {
            useHomeBlogStore.setState({ category: "Maintenance" });
            setActiveCategory("Maintenance");
          }}
        >
          Maintenance
        </li>
        <li
          id="Luxury-Bikes"
          onClick={() => {
            useHomeBlogStore.setState({ category: "Luxury Bikes" });
            setActiveCategory("Luxury-Bikes");
          }}
        >
          Luxury Bikes
        </li>
      </ul>
    </article>
  );
};

export default BlogCategories;
