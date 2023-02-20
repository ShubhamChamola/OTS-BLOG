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
  const location = useLocation();

  useEffect(() => {
    // Remove the inital loader from DOM
    setTimeout(() => {
      (document.querySelector("#initial-loader") as HTMLElement).style.display =
        "none";
    }, 800);
    // (document.querySelector("#initial-loader") as HTMLElement).style.display =
    //   "none";

    useLoaderStore.setState({ isFetchingInitialUserInfo: true });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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
