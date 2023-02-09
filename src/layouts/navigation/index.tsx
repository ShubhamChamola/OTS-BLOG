import Logo from "../../components/ui/Logo";
import SignedInLinks from "./components/SignedInLinks";
import SignedOutLinks from "./components/SignedOutLinks";
import useAuthStore from "../../store/useAuthStore";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Theme from "../../features/site_theme";
import BlogCategories from "../../features/blog_categories";

const Navigation: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  const [menuActive, setMenuActive] = useState(false);
  const [mobileView, setMobileView] = useState(false);

  // Adding event listeners for window resize
  useEffect(() => {
    if (window.innerWidth <= 850) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 850) {
        setMobileView(true);
      } else {
        setMobileView(false);
      }
    });
  }, []);

  // Remove active class from hamenu as well as nav-links whenever the path is changed
  useEffect(() => {
    document.querySelector(".ham-menu")?.classList.remove("active");
    document.querySelector(".nav-links")?.classList.remove("active");
    document.querySelector("body")!.style.overflow = "scroll";
  }, [path]);

  // Responsible for restricting body scroll when menu is active
  useEffect(() => {
    if (menuActive) {
      document.querySelector("body")!.style.overflow = "hidden";
    } else {
      document.querySelector("body")!.style.overflow = "scroll";
    }
  }, [menuActive]);

  const userId = useAuthStore((state) => state.userId);

  return (
    <nav>
      <Logo />
      <ul className="nav-links">
        <div>{userId ? <SignedInLinks /> : <SignedOutLinks />}</div>
        {mobileView && (
          <>
            <Theme />
            {path === "/" && <BlogCategories />}
          </>
        )}
      </ul>
      <div
        className="ham-menu"
        onClick={(event) => {
          setMenuActive((prev) => {
            return !prev;
          });
          event.currentTarget.classList.toggle("active");
          document.querySelector(".nav-links")!.classList.toggle("active");
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navigation;
