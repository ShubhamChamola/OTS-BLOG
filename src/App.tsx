// React Modules
import { Suspense, useEffect } from "react";
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

  // Stop the body scroll whenever loader is active
  useEffect(() => {
    if (isLoading || isMobileMenuActive) {
      document.querySelector("body")!.style.overflow = "hidden";
    } else {
      document.querySelector("body")!.style.overflow = "auto";
    }
  }, [isLoading, isMobileMenuActive]);

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
