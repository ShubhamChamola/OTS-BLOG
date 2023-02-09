import { useEffect, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import ManageAccountAside from "../layouts/manage_account_aside";
import Container from "../components/ui/Container";
import { Outlet } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import "../assets/styles/manageAccountPage.scss";
import ComponentLoader from "../components/loaders/component_loader/ComponentLoader";

const ManageAccountPage: React.FC = () => {
  const userId = useAuthStore((state) => state.userId);

  console.log("ohh yehaas");

  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/");
    }
  }, [userId]);

  return (
    <section id="manage-account">
      <Container id="manage-account-container">
        <ManageAccountAside />
        <Suspense fallback={<ComponentLoader />}>
          <Outlet />
        </Suspense>
      </Container>
    </section>
  );
};

export default ManageAccountPage;
