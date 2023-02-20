// React Modules
import { useEffect, useState, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";

// Asset Modules
import Logo from "../../components/ui/Logo";

// Component Modules
import SignedInLinks from "./components/SignedInLinks";
import SignedOutLinks from "./components/SignedOutLinks";
import useUserInfoStore from "../../store/useUserInfoStore";
import UILoader from "../../components/loaders/ui-loader/UILoader";
import useLoaderStore from "../../store/useLoaderStore";

const Theme = lazy(() => import("../../features/site_theme"));
const BlogCategories = lazy(() => import("../../features/blog_categories"));

const Navigation: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  const intialFetching = useLoaderStore(
    (state) => state.isFetchingInitialUserInfo
  );

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

  // Remove active class from ham menu as well as nav-links whenever the path is changed
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
      document.querySelector("body")!.style.overflowY = "scroll";
    }
  }, [menuActive]);

  const userID = useUserInfoStore((state) => state.info?.userID);

  return (
    <nav>
      <Logo />
      {intialFetching ? (
        <>
          <UILoader />
        </>
      ) : (
        <>
          <ul className="nav-links">
            {userID ? <SignedInLinks /> : <SignedOutLinks />}
            {mobileView && (
              <Suspense fallback={<UILoader />}>
                <Theme />
                {path === "/" && <BlogCategories />}
              </Suspense>
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
        </>
      )}
    </nav>
  );
};

export default Navigation;
