import Button from "../../components/ui/Button";
import { useState, useEffect, useRef } from "react";
import {
  passwordValidator,
  confirmPasswordValidator,
} from "../../utils/validators";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import deleteAccount from "../../services/auth/deleteAccount";

const UserSecurity: React.FC = () => {
  const role = useAuthStore((state) => state.role);

  const navigate = useNavigate();

  useEffect(() => {
    if (role === "Admin") {
      navigate(-1);
    }
  }, []);

  const [formValues, setFormValues] = useState<{
    oldPassword: string | null;
    newPassword: string | null;
    confirmPassword: string | null;
  }>({
    oldPassword: null,
    newPassword: null,
    confirmPassword: null,
  });

  const [formValidation, setFormValidation] = useState({
    isOldPasswordValid: false,
    isNewPasswordValid: false,
    isConfirmPasswordValid: false,
  });

  const [btnDisabled, setBtnDisabled] = useState(true);

  const [bubbleTimer, setBubbleTimer] = useState<null | NodeJS.Timeout>(null);

  const oldPasswordRef = useRef<HTMLInputElement | null>(null);
  const newPasswordRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);

  // for old password
  useEffect(() => {
    if (formValues.oldPassword != null)
      setBubbleTimer(
        setTimeout(() => {
          setFormValidation((prev) => {
            return {
              ...prev,
              isOldPasswordValid: passwordValidator(
                oldPasswordRef,
                formValues.oldPassword,
                false
              ),
            };
          });
        }, 400)
      );

    return () => {
      bubbleTimer && clearTimeout(bubbleTimer);
    };
  }, [formValues.oldPassword]);

  // for new password
  useEffect(() => {
    if (formValues.newPassword != null)
      setBubbleTimer(
        setTimeout(() => {
          setFormValidation((prev) => {
            return {
              ...prev,
              isNewPasswordValid: passwordValidator(
                newPasswordRef,
                formValues.newPassword,
                false
              ),
            };
          });
        }, 400)
      );

    return () => {
      bubbleTimer && clearTimeout(bubbleTimer);
    };
  }, [formValues.newPassword]);

  // for confirm password
  useEffect(() => {
    if (formValues.confirmPassword != null)
      setBubbleTimer(
        setTimeout(() => {
          setFormValidation((prev) => {
            return {
              ...prev,
              isConfirmPasswordValid: confirmPasswordValidator(
                confirmPasswordRef,
                formValues.confirmPassword,
                formValues.newPassword,
                false
              ),
            };
          });
        }, 400)
      );

    return () => {
      bubbleTimer && clearTimeout(bubbleTimer);
    };
  }, [formValues.confirmPassword, formValues.newPassword]);

  // for Btn
  useEffect(() => {
    if (
      formValidation.isOldPasswordValid &&
      formValidation.isNewPasswordValid &&
      formValidation.isConfirmPasswordValid
    ) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [
    formValidation.isOldPasswordValid,
    formValidation.isNewPasswordValid,
    formValidation.isConfirmPasswordValid,
  ]);

  return (
    <article id="user-security">
      <form>
        <label htmlFor="old-password">Old Password</label>
        <label htmlFor="new-passowrd">New Password</label>
        <label htmlFor="confirm-password">Confirm Password</label>

        <input
          onChange={(event) => {
            setFormValues((prev) => {
              return {
                ...prev,
                oldPassword: event.target.value.trim(),
              };
            });
          }}
          onFocus={() => {
            oldPasswordRef.current?.classList.add("active");
          }}
          onBlur={() => {
            oldPasswordRef.current?.classList.remove("active");
          }}
          type="password"
          name="oldPassword"
          id="old-passowrd"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
          value={formValues.oldPassword ? formValues.oldPassword : ""}
          placeholder="Enter old password"
          ref={oldPasswordRef}
        />
        <input
          onChange={(event) => {
            setFormValues((prev) => {
              return {
                ...prev,
                newPassword: event.target.value.trim(),
              };
            });
          }}
          onFocus={() => {
            newPasswordRef.current?.classList.add("active");
          }}
          onBlur={() => {
            newPasswordRef.current?.classList.remove("active");
          }}
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
          type="password"
          name="newPassword"
          id="new-password"
          value={formValues.newPassword ? formValues.newPassword : ""}
          placeholder="Enter new password"
          ref={newPasswordRef}
        />
        <input
          onChange={(event) => {
            setFormValues((prev) => {
              return {
                ...prev,
                confirmPassword: event.target.value.trim(),
              };
            });
          }}
          onFocus={() => {
            confirmPasswordRef.current?.classList.add("active");
          }}
          onBlur={() => {
            confirmPasswordRef.current?.classList.remove("active");
          }}
          type="password"
          name="confrimPassword"
          id="confirm-password"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="should match with new password field"
          value={formValues.confirmPassword ? formValues.confirmPassword : ""}
          placeholder="Re enter new password"
          ref={confirmPasswordRef}
        />
        <Button disabled={btnDisabled} className="solid-btn" onClick={() => {}}>
          Update Password
        </Button>
      </form>
      <div className="delete-account">
        <h4>Want to Delete Your Account?</h4>
        <Button
          onClick={() => {
            deleteAccount();
          }}
          className="solid-btn"
        >
          Delete User
        </Button>
      </div>
    </article>
  );
};

export default UserSecurity;
