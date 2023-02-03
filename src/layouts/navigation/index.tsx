import Logo from "../../components/ui/Logo";
import SignedInLinks from "./components/SignedInLinks";
import SignedOutLinks from "./components/SignedOutLinks";
import useAuthStore from "../../store/useAuthStore";

const Navigation: React.FC = () => {
  const userId = useAuthStore((state) => state.userId);

  return (
    <nav>
      <Logo />
      {userId ? <SignedInLinks /> : <SignedOutLinks />}
    </nav>
  );
};

export default Navigation;
