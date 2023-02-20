// Component Module
import Button from "../../../components/ui/Button";

// Default Module
import { useNavigate } from "react-router-dom";

// Custom Modules
import formatUserName from "../utils/formatName";
import signOutUser from "../../../services/auth/signOutUser";

// Store Module
import useUserInfoStore from "../../../store/useUserInfoStore";

const dummyUserAvatar =
  require("../../../assets/images/user-dummy-avatar.png") as string;

const SignedInLinks: React.FC = () => {
  const { firstName, lastName, avatar } = useUserInfoStore(
    (state) => state.info!
  );

  const navigate = useNavigate();

  return (
    <>
      <li>
        <div
          className="user-account"
          onClick={() => {
            navigate("/manage-account");
          }}
        >
          <div
            style={{ background: `url(${avatar || dummyUserAvatar})` }}
          ></div>
          <span>{formatUserName(firstName, lastName)}</span>
        </div>
      </li>
      <li>
        <Button
          onClick={() => {
            signOutUser();
          }}
          className="outlined-btn"
        >
          Sign Out
        </Button>
      </li>
    </>
  );
};

export default SignedInLinks;
