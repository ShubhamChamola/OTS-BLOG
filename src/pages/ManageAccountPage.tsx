// React Modules
import { useEffect, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

// Component Modules
import ManageAccountAside from "../layouts/manage_account_aside";
import Container from "../components/ui/Container";
import PageLoader from "../components/loaders/page_loader/PageLoader";

// CSS Modules
import "../assets/styles/manageAccountPage.scss";

// Store Module
import useUserInfoStore from "../store/useUserInfoStore";
const ManageAccountPage: React.FC = () => {
  const { userID } = useUserInfoStore((store) => store.info);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userID) {
      navigate("/");
    }
  }, [userID]);

  return (
    <section id="manage-account">
      <Container id="manage-account-container">
        <ManageAccountAside />
        <Suspense fallback={<PageLoader removeAside={true} />}>
          <Outlet />
        </Suspense>
      </Container>
    </section>
  );
};

export default ManageAccountPage;
