import Button from "../../../components/ui/Button";
import AuthModal from "../../../features/auth_modal";

import { useState } from "react";

const SignedOutLinks: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <li>
        <Button
          id="sign-in-btn"
          onClick={() => {
            setShowModal(true);
          }}
          className="solid-btn"
        >
          Sign In
        </Button>
      </li>
      <li>
        <Button
          id="book-service-nav"
          onClick={() => {
            console.log("Book a Service");
          }}
          className="outlined-btn"
        >
          Book a Service
        </Button>
      </li>

      {showModal && <AuthModal changeModalState={setShowModal} />}
    </>
  );
};

export default SignedOutLinks;
