// Component Modules
import FollowSocial from "../../../components/global/Social";
import Logo from "../../../components/ui/Logo";

const Base: React.FC = () => {
  return (
    <article className="base">
      <div className="column-1">
        <Logo />
        <FollowSocial text="SOCIALS" />
      </div>
      <div className="column-2">
        <h4>SITEMAP</h4>
        <ul>
          <li>Home</li>
          <li>Services</li>
          <li>Spares</li>
          <li>Sign In</li>
          <li>Contact Us</li>
        </ul>
      </div>
      <div className="column-3">
        <h4>WHAT WE DO</h4>
        <ul>
          <li>Pick & Drop Service</li>
          <li>Doorstep Service</li>
          <li>Emergency Repair</li>
          <li>Annual Plan Service</li>
          <li>Spare Part Store</li>
        </ul>
      </div>
      <div className="column-4">
        <div>
          <h4>HEAD OFFICE</h4>
          <p>Dehradun, Uttarakhand</p>
        </div>
        <div style={{ margin: "-1em 0" }}>
          <h4>
            <a
              style={{ color: "#f35f44" }}
              href="https://portfolio-rho-three-96.vercel.app/"
              target="blank"
            >
              Meet The Developer
            </a>
          </h4>
        </div>
        <div>
          <h4>CONTACT</h4>
          <p>
            <span>Email-</span>
            contact@ots.support
          </p>
          <p>
            <span>Phone-</span>
            +91-9627269031
          </p>
        </div>
      </div>
      <div className="terms">
        <div>
          <span>Privacy Policy</span>
          <span>Terms & Consitions</span>
        </div>
        <p>© 2022 One Tap Service All rights reserved.</p>
      </div>
    </article>
  );
};

export default Base;
