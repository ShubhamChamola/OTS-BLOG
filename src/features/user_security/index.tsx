import ComponentLoader from "../../components/loaders/component_loader/ComponentLoader";
import Button from "../../components/ui/Button";
import deleteAccount from "../../services/auth/deleteAccount";
import useLoadingState from "../../store/useLoadState";

const UserSecurity: React.FC = () => {
  const { isLoading } = useLoadingState((state) => state);

  return (
    <article id="user-security">
      {isLoading ? (
        <ComponentLoader />
      ) : (
        <>
          <h4>Want to Delete Your Account?</h4>
          <Button
            onClick={() => {
              deleteAccount();
            }}
            className="solid-btn"
          >
            Delete User
          </Button>
        </>
      )}
    </article>
  );
};

export default UserSecurity;
