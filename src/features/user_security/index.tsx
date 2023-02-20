// Component Modules
import Button from "../../components/ui/Button";

// Service Module
import deleteAccount from "../../services/auth/deleteAccount";

const UserSecurity: React.FC = () => {
  return (
    <article id="user-security">
      <h4>Want to Delete Your Account?</h4>
      <Button
        onClick={() => {
          deleteAccount();
        }}
        className="solid-btn"
      >
        Delete User
      </Button>
    </article>
  );
};

export default UserSecurity;
