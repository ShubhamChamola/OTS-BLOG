import TwitterSVG from "../../assets/icons/TwitterSVG";
import LinkedInSVG from "../../assets/icons/LinkedInSVG";
import YoutubeSVG from "../../assets/icons/YoutubeSVG";
import InstagramSVG from "../../assets/icons/InstagramSVG";

interface Props {
  text: string;
}

const FollowSocial: React.FC<Props> = ({ text }) => {
  return (
    <div id="socials">
      <h3>{text}</h3>
      <ul>
        <li>
          <TwitterSVG />
        </li>
        <li>
          <LinkedInSVG />
        </li>
        <li>
          <YoutubeSVG />
        </li>
        <li>
          <InstagramSVG />
        </li>
      </ul>
    </div>
  );
};

export default FollowSocial;
