// React Module
import { useState, lazy, Suspense } from "react";

// Component Modules
import Button from "../../../components/ui/Button";
import UILoader from "../../../components/loaders/ui-loader/UILoader";

const AuthModal = lazy(() => import("../../../features/auth_modal"));

const SignedOutLinks: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && (
        <Suspense fallback={<UILoader />}>
          <AuthModal changeModalState={setShowModal} />
        </Suspense>
      )}
      <li>
        <Button
          onClick={() => {
            setShowModal(true);
          }}
          className="solid-btn"
        >
          Sign In
        </Button>
      </li>
      <li>
        <Button className="outlined-btn">
          <a href="https://www.onetapservice.in/" target="blank">
            Book a Service
          </a>
        </Button>
      </li>
    </>
  );
};

export default SignedOutLinks;
