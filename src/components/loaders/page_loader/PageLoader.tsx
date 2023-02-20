// React Module
import { useLocation } from "react-router-dom";
import BlogPage from "../../../skeleton/BlogPage";

// Component Module
import HomePage from "../../../skeleton/HomePage";
import ManageAccountPage from "../../../skeleton/ManageAccountPage";

interface TypeProp {
  removeAside?: boolean;
}

export default function PageLoader({ removeAside }: TypeProp) {
  const { pathname } = useLocation();

  return (
    <>
      {pathname === "/" && <HomePage />}
      {pathname.includes("/manage-account") && (
        <ManageAccountPage removeAside={removeAside} />
      )}
      {pathname.includes("/blog") && <BlogPage />}
    </>
  );
}
