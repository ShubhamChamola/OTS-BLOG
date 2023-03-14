// React Modules
import { Suspense, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

// Components
import Navigation from "./layouts/navigation";
import Footer from "./layouts/footer";
import PageLoader from "./components/loaders/page_loader/PageLoader";
import Loader from "./components/loaders/service-loader/Loader";

// Service Modules
import "./services/auth/manageAuth";

// CSS Module
import "./assets/styles/global.scss";
import useLoaderStore from "./store/useLoaderStore";

const App: React.FC = () => {
  const { pathname } = useLocation();
  const { isLoading, isMobileMenuActive } = useLoaderStore((store) => store);
  const [displayNoneTimeout, setDisplayNoneTimeout] =
    useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Remove the inital loader from DOM
    setTimeout(() => {
      (document.querySelector("#initial-loader") as HTMLElement).style.display =
        "none";
    }, 1000);

    useLoaderStore.setState({ isFetchingInitialUserInfo: true });
  }, []);

  // Scroll to the top of the page whenever the rout is changed
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Stop the main and footer scroll whenever mobileMenu is active
  useEffect(() => {
    if (isMobileMenuActive) {
      const timer = setTimeout(() => {
        document
          .querySelector("html")
          ?.classList.add("stop-body-elements-scroll");
      }, 400);

      setDisplayNoneTimeout(timer);
    } else {
      if (displayNoneTimeout) {
        clearTimeout(displayNoneTimeout);
      }
      document
        .querySelector("html")
        ?.classList.remove("stop-body-elements-scroll");
    }
  }, [isMobileMenuActive]);

  // Stops body scroll when a async function is triggered
  useEffect(() => {
    if (isLoading) {
      document.querySelector("body")?.classList.add("stop-body-scroll");
    } else if (!isLoading) {
      document.querySelector("body")?.classList.remove("stop-body-scroll");
    }
  }, [isLoading]);

  return (
    <>
      <Loader />
      <header>
        <Navigation />
      </header>
      <main>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
};

export default App;
