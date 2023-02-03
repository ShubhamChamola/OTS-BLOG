import { useNavigate } from "react-router-dom";

const logo = require("../../assets/images/OTS_Logo.png") as string;

const Logo: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      id="ots-logo"
      onClick={() => {
        navigate("/");
      }}
    >
      <img src={logo} alt="ONE TAP SERVICE logo" />
    </div>
  );
};

export default Logo;
