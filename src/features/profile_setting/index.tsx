import Button from "../../components/ui/Button";
import { useState, useEffect, useRef } from "react";
import { nameValidator, bioValidator } from "../../utils/validators";
import useAuthStore from "../../store/useAuthStore";
import updateProfile from "../../services/manageAccount/updateprofile";
import useUserInfoStore from "../../store/useUserInfoStore";

const ProfileSetting: React.FC = () => {
  const role = useAuthStore((state) => state.role);
  const prevUserInfo = useUserInfoStore((state) => state);

  const [formValues, setFormValues] = useState<{
    firstName: string | null;
    lastName: string | null;
    bio: string | null;
    avatar: File | string | null;
  }>({
    firstName: prevUserInfo.firstName,
    lastName: prevUserInfo.lastName,
    bio: prevUserInfo.bio,
    avatar: prevUserInfo.avatar,
  });

  const [avatarChanged, setAvatarChanged] = useState(false);

  const [formValidation, setFormValidation] = useState({
    isFirstNameValid: false,
    isLastNameValid: false,
    isBioValid: false,
  });

  const [bubbleTimer, setBubbleTimer] = useState<null | NodeJS.Timeout>(null);
  const [btnDisabled, setBtnDisabled] = useState(true);

  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const lastNameRef = useRef<HTMLInputElement | null>(null);
  const bioRef = useRef<HTMLInputElement | null>(null);

  // for First Name
  useEffect(() => {
    if (formValues.firstName != null)
      setBubbleTimer(
        setTimeout(() => {
          setFormValidation((prev) => {
            return {
              ...prev,
              isFirstNameValid: nameValidator(
                firstNameRef,
                formValues.firstName,
                false
              ),
            };
          });
        }, 400)
      );

    return () => {
      bubbleTimer && clearTimeout(bubbleTimer);
    };
  }, [formValues.firstName]);

  // for Last Name
  useEffect(() => {
    if (formValues.lastName != null)
      setBubbleTimer(
        setTimeout(() => {
          setFormValidation((prev) => {
            return {
              ...prev,
              isLastNameValid: nameValidator(
                lastNameRef,
                formValues.lastName,
                false
              ),
            };
          });
        }, 400)
      );

    return () => {
      bubbleTimer && clearTimeout(bubbleTimer);
    };
  }, [formValues.lastName]);

  // for bio
  useEffect(() => {
    if (formValues.bio != null)
      setBubbleTimer(
        setTimeout(() => {
          setFormValidation((prev) => {
            return {
              ...prev,
              isBioValid: bioValidator(bioRef, formValues.bio, false),
            };
          });
        }, 400)
      );

    return () => {
      bubbleTimer && clearTimeout(bubbleTimer);
    };
  }, [formValues.bio]);

  // for Btn
  useEffect(() => {
    if (
      formValidation.isFirstNameValid &&
      formValidation.isLastNameValid &&
      (avatarChanged ||
        formValues.firstName?.toLowerCase() !==
          prevUserInfo.firstName?.toLowerCase() ||
        formValues.lastName?.toLowerCase() !==
          prevUserInfo.lastName?.toLowerCase() ||
        (formValues.bio && formValues.bio !== prevUserInfo.bio))
    ) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [
    formValidation.isFirstNameValid,
    formValidation.isLastNameValid,
    formValidation.isBioValid,
    role,
    prevUserInfo.firstName,
    prevUserInfo.lastName,
    prevUserInfo.bio,
    formValues.firstName,
    formValues.lastName,
    formValues.bio,
    avatarChanged,
  ]);

  return (
    <form id="profile-setting">
      <label htmlFor="first-name">First Name</label>
      <label htmlFor="last-name">Last Name</label>
      {role === "Admin" && <label htmlFor="bio">Bio</label>}
      <label htmlFor="user-avatar">User Avatar</label>
      <input
        onChange={(event) => {
          setFormValues((prev) => {
            return {
              ...prev,
              firstName: event.target.value.trim(),
            };
          });
        }}
        onFocus={() => {
          firstNameRef.current?.classList.add("active");
        }}
        onBlur={() => {
          firstNameRef.current?.classList.remove("active");
        }}
        type="text"
        name="firstName"
        id="first-name"
        pattern="^[a-zA-Z]{1,20}$"
        title="first name should only contain letters. e.g. john or John"
        value={formValues.firstName ? formValues.firstName : ""}
        placeholder="Enter First Name"
        ref={firstNameRef}
      />
      <input
        onChange={(event) => {
          setFormValues((prev) => {
            return {
              ...prev,
              lastName: event.target.value.trim(),
            };
          });
        }}
        onFocus={() => {
          lastNameRef.current?.classList.add("active");
        }}
        onBlur={() => {
          lastNameRef.current?.classList.remove("active");
        }}
        pattern="^[a-zA-Z]{1,20}$"
        title="last name should only contain letters. e.g. john or John"
        type="text"
        name="lastName"
        id="last-name"
        value={formValues.lastName ? formValues.lastName : ""}
        placeholder="Enter Last Name"
        ref={lastNameRef}
      />
      {role === "Admin" && (
        <input
          onChange={(event) => {
            setFormValues((prev) => {
              return {
                ...prev,
                bio: event.target.value,
              };
            });
          }}
          onFocus={() => {
            bioRef.current?.classList.add("active");
          }}
          onBlur={() => {
            bioRef.current?.classList.remove("active");
          }}
          type="text"
          name="bio"
          id="bio"
          value={formValues.bio ? formValues.bio : ""}
          title="Length of bio should not be greater than 50"
          placeholder="Describe yourself in titles or words seperated by comma like:- abc, def"
          ref={bioRef}
        />
      )}
      <div className="file-field">
        <div
          className="selected-avatar"
          style={{
            background: `url(${
              formValues.avatar
                ? typeof formValues.avatar === "string"
                  ? formValues.avatar
                  : URL.createObjectURL(formValues.avatar)
                : ""
            })`,
          }}
        ></div>
        <input
          onChange={(event) => {
            setAvatarChanged(true);
            if (event.target.files && event.target.files[0]) {
              setFormValues((prev) => {
                return {
                  ...prev,
                  avatar: event.target.files
                    ? event.target.files[0]
                    : prev.avatar,
                };
              });
            }
          }}
          type="file"
          accept=".jpg, .png, .jpeg, .svg"
          name="userAvatar"
          id="user-avatar"
        />
        <label htmlFor="user-avatar" className="solid-btn">
          Upload Photo
        </label>
      </div>
      <Button
        disabled={btnDisabled}
        className="solid-btn"
        onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          event.preventDefault();
          handleFormSubmission({ ...prevUserInfo }, formValues, avatarChanged);
          setAvatarChanged(false);
        }}
      >
        Update User
      </Button>
    </form>
  );
};

export default ProfileSetting;

interface Arg {
  firstName: string | null;
  lastName: string | null;
  bio: string | null;
  avatar: string | null | File;
}

function handleFormSubmission(
  prevValue: Arg,
  currValue: Arg,
  avatarChanged: boolean
) {
  const needUpdate: { [key: string]: string } = {};
  if (prevValue.firstName!.toLowerCase() !== currValue.firstName!.toLowerCase())
    needUpdate["firstName"] = currValue.firstName!;

  if (prevValue.lastName!.toLowerCase() !== currValue.lastName!.toLowerCase())
    needUpdate["lastName"] = currValue.lastName!;

  if (currValue.bio && prevValue.bio !== currValue.bio)
    needUpdate["bio"] = currValue.bio;

  if (avatarChanged) updateProfile(needUpdate, currValue.avatar as File);
  console.log(needUpdate);
  updateProfile(needUpdate);
}
