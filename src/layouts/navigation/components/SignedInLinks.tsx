import Button from "../../../components/ui/Button";
import { auth } from "../../../lib/firebase";
import { signOut } from "firebase/auth";
import formatUserName from "../utils/formatName";
import { useNavigate } from "react-router-dom";
import useUserInfoStore from "../../../store/useUserInfoStore";

const SignedInLinks: React.FC = () => {
  const firstName = useUserInfoStore((state) => state.firstName);
  const lastName = useUserInfoStore((state) => state.lastName);
  const avatar = useUserInfoStore((state) => state.avatar);

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
          <div style={{ background: `url(${avatar})` }}></div>
          <span>{formatUserName(firstName, lastName)}</span>
        </div>
      </li>
      <li>
        <Button
          id="sign-out"
          onClick={async () => {
            await signOut(auth);
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
