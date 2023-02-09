import { useNavigate } from "react-router-dom";
import OTSLogo from "../../assets/icons/OTSLogo";

const Logo: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      id="ots-logo"
      onClick={() => {
        navigate("/");
      }}
    >
      <OTSLogo />
    </div>
  );
};

export default Logo;
