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
        <Button
          onClick={() => {
            console.log("Book a Service");
          }}
          className="outlined-btn"
        >
          Book a Service
        </Button>
      </li>
    </>
  );
};

export default SignedOutLinks;
