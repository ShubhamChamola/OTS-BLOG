import Navigation from "./layouts/navigation";
import Footer from "./layouts/footer";
import { Outlet } from "react-router-dom";
import "./assets/styles/global.scss";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import findUserRole from "./services/auth/findUserRole";
import { getUserInfo } from "./services/auth/getUserInfo";
import addUserToDB from "./services/auth/addUserToDB";
import useUnsubFuncsStore from "./store/useUnsubFuncsStore";
import useUserInfoStore from "./store/useUserInfoStore";
import useAuthStore from "./store/useAuthStore";
import { Suspense, useEffect } from "react";
import PageLoader from "./components/loaders/page_loader/PageLoader";

const App: React.FC = () => {
  const clearUserInfo = useUserInfoStore((state) => state.clearStore);
  const clearAuthInfo = useAuthStore((state) => state.clearStore);
  const { unSubGetUserInfo } = useUnsubFuncsStore.getState();

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      console.log(user);
      const roleFound = await findUserRole(user.uid);
      if (roleFound) {
        await getUserInfo(user.uid);
      } else {
        addUserToDB(user);
      }
    } else {
      console.log("No one is loagged in!");
      clearUserInfo();
      clearAuthInfo();
      unSubGetUserInfo && unSubGetUserInfo();
    }
  });

  useEffect(() => {
    document.querySelector("body")?.classList.add("light");
  }, []);

  return (
    <>
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
