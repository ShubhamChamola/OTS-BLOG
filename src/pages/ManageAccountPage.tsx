import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ManageAccountAside from "../layouts/manage_account_aside";
import Container from "../components/ui/Container";
import { Outlet } from "react-router-dom";
import "../assets/styles/manageAccountPage.scss";
import useAuthStore from "../store/useAuthStore";

const ManageAccountPage: React.FC = () => {
  const auth = useAuthStore((state) => state);

  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.userId) {
      navigate("/");
    }
  }, [auth.userId]);

  return (
    <section id="manage-account">
      <Container id="manage-account-container">
        <ManageAccountAside />
        <Outlet />
      </Container>
    </section>
  );
};

export default ManageAccountPage;
