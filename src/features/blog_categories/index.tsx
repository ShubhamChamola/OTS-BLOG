// React Modules
import { useEffect, useState } from "react";

// Assets Module
import ArrowSVG from "../../assets/icons/ArrowSVG";

// Store Module
import useHomeBlogStore from "../../store/useBlogBrowseStore";
import useLoaderStore from "../../store/useLoaderStore";

const BlogCategories: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All-Blogs");
  const { isFetching } = useHomeBlogStore((state) => state);
  const { isMobileMenuActive } = useLoaderStore((state) => state);

  useEffect(() => {
    const allLinks = document.querySelectorAll("#set-categories ul li");
    if (allLinks) {
      allLinks.forEach((link) => {
        link.classList.remove("active");
      });
      document.getElementById(activeCategory)?.classList.add("active");
    }
  }, [activeCategory]);

  useEffect(() => {
    if (!isMobileMenuActive) {
      document.querySelector("#set-categories")?.classList.remove("active");
    }
  }, [isMobileMenuActive]);

  useEffect(() => {
    return () => {
      useHomeBlogStore.setState({ category: "All Blogs" });
      setActiveCategory("All-blogs");
    };
  }, []);

  return (
    <div id="set-categories">
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
            if (!isFetching) {
              useHomeBlogStore.setState({ category: "All Blogs" });
              setActiveCategory("All-Blogs");
            }
          }}
        >
          All Blogs
        </li>
        <li
          id="Bike-Reviews"
          onClick={() => {
            if (!isFetching) {
              useHomeBlogStore.setState({ category: "Bike Reviews" });
              setActiveCategory("Bike-Reviews");
            }
          }}
        >
          Bike Review
        </li>
        <li
          id="Travel-&-Tips"
          onClick={() => {
            if (!isFetching) {
              useHomeBlogStore.setState({ category: "Travel & Tips" });
              setActiveCategory("Travel-&-Tips");
            }
          }}
          className="active"
        >
          Travel & Tips
        </li>
        <li
          id="Parts-&-Accessories"
          onClick={() => {
            if (!isFetching) {
              useHomeBlogStore.setState({ category: "Parts & Accessories" });
              setActiveCategory("Parts-&-Accessories");
            }
          }}
        >
          Parts & Accessories
        </li>
        <li
          id="Latest-News"
          onClick={() => {
            if (!isFetching) {
              useHomeBlogStore.setState({ category: "Latest News" });
              setActiveCategory("Latest-News");
            }
          }}
        >
          Latest News
        </li>
        <li
          id="Maintenance"
          onClick={() => {
            if (!isFetching) {
              useHomeBlogStore.setState({ category: "Maintenance" });
              setActiveCategory("Maintenance");
            }
          }}
        >
          Maintenance
        </li>
        <li
          id="Luxury-Bikes"
          onClick={() => {
            if (!isFetching) {
              useHomeBlogStore.setState({ category: "Luxury Bikes" });
              setActiveCategory("Luxury-Bikes");
            }
          }}
        >
          Luxury Bikes
        </li>
      </ul>
    </div>
  );
};

export default BlogCategories;
