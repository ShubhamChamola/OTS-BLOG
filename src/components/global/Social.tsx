import TwitterSVG from "../../assets/icons/TwitterSVG";
import LinkedInSVG from "../../assets/icons/LinkedInSVG";
import FacebookSVG from "../../assets/icons/FaceBookSVG";
import InstagramSVG from "../../assets/icons/InstagramSVG";

import { Link } from "react-router-dom";

interface Props {
  text: string;
}

const FollowSocial: React.FC<Props> = ({ text }) => {
  return (
    <div id="socials">
      <h3>{text}</h3>
      <ul>
        <a href="https://twitter.com/onetapservice" target={"blank"}>
          <TwitterSVG />
        </a>
        <a
          href="https://www.linkedin.com/company/onetap-service/"
          target={"blank"}
        >
          <LinkedInSVG />
        </a>
        <a
          style={{ width: "30px" }}
          href="https://www.facebook.com/profile.php?id=100088403531764&is_tour_dismissed=true"
          target={"blank"}
        >
          <FacebookSVG />
        </a>
        <a href="https://www.instagram.com/onetapservice.in/" target={"blank"}>
          <InstagramSVG />
        </a>
      </ul>
    </div>
  );
};

export default FollowSocial;
