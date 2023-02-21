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

function manageMenuActive(target: any) {
  const tags = ["BUTTON", "LI", "SPAN", "svg"];
  if (tags.includes(target.tagName)) {
    useLoaderStore.setState({ isMobileMenuActive: false });
  }
}

const Navigation: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  const { isFetchingInitialUserInfo: initialFetching } = useLoaderStore(
    (store) => store
  );
  const { userID } = useUserInfoStore((state) => state.info);
  const { isMobileMenuActive } = useLoaderStore((store) => store);

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

  useEffect(() => {
    if (isMobileMenuActive) {
      document.querySelector(".ham-menu")?.classList.add("active");
      document.querySelector(".nav-links")?.classList.add("active");
    } else {
      document.querySelector(".ham-menu")?.classList.remove("active");
      document.querySelector(".nav-links")?.classList.remove("active");
    }
  }, [isMobileMenuActive]);

  // Remove active class from ham menu as well as nav-links whenever the path is changed
  useEffect(() => {
    useLoaderStore.setState({ isMobileMenuActive: false });
  }, [path]);

  return (
    <nav>
      <Logo />
      {initialFetching ? (
        <>
          <UILoader />
        </>
      ) : (
        <>
          <ul
            className="nav-links"
            onClick={(event) => {
              manageMenuActive(event.target);
            }}
          >
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
            onClick={() => {
              useLoaderStore.setState((state) => {
                return {
                  ...state,
                  isMobileMenuActive: !state.isMobileMenuActive,
                };
              });
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
