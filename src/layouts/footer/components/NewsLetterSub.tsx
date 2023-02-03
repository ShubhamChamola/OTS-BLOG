import MailSVG from "../../../assets/icons/MailSVG";

const NewsLetterSub: React.FC = () => {
  return (
    <div className="newsletter">
      <div>
        <h3>Subscribe to our Newsletter</h3>
        <p>
          Subscribe to our newletter & get the latest updates, offers and much
          more directly in your inbox
        </p>
      </div>
      <div className="email-input">
        <input type="email" placeholder="Your Email" />
        <MailSVG />
      </div>
    </div>
  );
};

export default NewsLetterSub;
