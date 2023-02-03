import { useState, useEffect, useRef } from "react";
import { emailValidator, passwordValidator } from "../utils/validators";
import BackArrowSVG from "../assets/icons/BackArrowSVG";
import MailSVG from "../assets/icons/MailSVG";
import VisibleSVG from "../assets/icons/VisibleSVG";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import "../assets/styles/adminAuthPage.scss";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import emailLogIn from "../services/auth/emailLogIn";

const AdminAuthPage: React.FC = () => {
  const navigate = useNavigate();
  const userId = useAuthStore((state) => state.userId);

  useEffect(() => {
    if (userId) {
      navigate(-1);
    }
  }, [userId]);

  const [formValues, setFormValues] = useState<{
    email: string | null;
    password: string | null;
  }>({ email: null, password: null });

  const [formValidation, setFormValidation] = useState({
    isEmailValid: false,
    isPasswordValid: false,
  });

  const [btnDisabled, setBtnDisabled] = useState(true);
  const [bubbleTimer, setBubbleTimer] = useState<null | NodeJS.Timeout>(null);
  const [showPassword, setShowPassword] = useState(false);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  // For Email
  useEffect(() => {
    if (formValues.email != null)
      setBubbleTimer(
        setTimeout(() => {
          setFormValidation((prev) => {
            return {
              ...prev,
              isEmailValid: emailValidator(emailRef, formValues.email, true),
            };
          });
        }, 400)
      );

    return () => {
      bubbleTimer && clearTimeout(bubbleTimer);
    };
  }, [formValues.email]);

  // For Password
  useEffect(() => {
    if (formValues.password != null)
      setBubbleTimer(
        setTimeout(() => {
          setFormValidation((prev) => {
            return {
              ...prev,
              isPasswordValid: passwordValidator(
                passwordRef,
                formValues.password,
                true
              ),
            };
          });
        }, 400)
      );

    return () => {
      bubbleTimer && clearTimeout(bubbleTimer);
    };
  }, [formValues.password]);

  // For password Visibility
  useEffect(() => {
    if (passwordRef.current != null) {
      showPassword
        ? (passwordRef.current!.type = "text")
        : (passwordRef.current!.type = "password");
    }
  }, [showPassword]);

  // For Button
  useEffect(() => {
    console.log(formValidation);
    if (formValidation.isEmailValid && formValidation.isPasswordValid) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [formValidation.isEmailValid, formValidation.isPasswordValid]);

  return (
    <section id="admin-auth">
      <Container id="admin-container">
        <div
          className="back"
          onClick={() => {
            navigate(-1);
          }}
        >
          <BackArrowSVG />
          <span>Back To Home</span>
        </div>
        <h3>Admin Sign In</h3>
        <form>
          <div>
            <label htmlFor="email">Email</label>
            <input
              onFocus={() => {
                emailRef.current?.parentElement?.classList.add("active");
              }}
              onBlur={() => {
                emailRef.current?.parentElement?.classList.remove("active");
              }}
              onChange={(event) => {
                setFormValues((prev) => {
                  return {
                    ...prev,
                    email: event.target.value,
                  };
                });
              }}
              value={formValues.email ? formValues.email : ""}
              ref={emailRef}
              type="email"
              id="email"
              pattern="^[\w]{1,}[\w.+-]{0,}@[\w-]{2,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$"
              title="Enter a valid email!"
            />
            <MailSVG />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              onFocus={() => {
                passwordRef.current?.parentElement?.classList.add("active");
              }}
              onBlur={() => {
                passwordRef.current?.parentElement?.classList.remove("active");
              }}
              onChange={(event) => {
                setFormValues((prev) => {
                  return {
                    ...prev,
                    password: event.target.value,
                  };
                });
              }}
              value={formValues.password ? formValues.password : ""}
              ref={passwordRef}
              type="passowrd"
              id="password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            />
            <VisibleSVG
              onClick={() => {
                setShowPassword((prev) => !prev);
              }}
            />
          </div>
          <Button
            disabled={btnDisabled}
            onClick={(
              event: React.MouseEvent<HTMLButtonElement, MouseEvent>
            ) => {
              event.preventDefault();
              if (formValues.email && formValues.password) {
                emailLogIn(formValues.email, formValues.password);
              }
            }}
            className="solid-btn"
          >
            Sign In
          </Button>
        </form>
      </Container>
    </section>
  );
};

export default AdminAuthPage;
