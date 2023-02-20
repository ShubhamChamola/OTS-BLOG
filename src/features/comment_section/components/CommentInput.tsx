// React Modules
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Component Module
import Button from "../../../components/ui/Button";

// Store Module
import useUserInfoStore from "../../../store/useUserInfoStore";

// Service Module
import postComment from "../../../services/blog/postComment";
import UILoader from "../../../components/loaders/ui-loader/UILoader";

const dummyUserAvatar =
  require("../../../assets/images/user-dummy-avatar.png") as string;

const CommentInput: React.FC = () => {
  const { blogID } = useParams();
  const { role, userID, avatar } = useUserInfoStore((state) => state.info);

  const [comment, setComment] = useState<string | null>(null);
  const [bubbleTimer, setBubbleTimer] = useState<null | NodeJS.Timeout>(null);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (comment && comment.trim().length >= 1) {
      setBubbleTimer(
        setTimeout(() => {
          setBtnDisabled(false);
        }, 200)
      );
    } else {
      setBubbleTimer(
        setTimeout(() => {
          setBtnDisabled(true);
        }, 200)
      );
    }

    return () => {
      bubbleTimer && clearTimeout(bubbleTimer);
    };
  }, [comment]);

  return (
    <>
      <div className="comment-input">
        <div className="user-avatar">
          <img src={avatar || dummyUserAvatar} alt="profile of User" />
        </div>
        <form>
          <textarea
            name="comment"
            placeholder="Type here ..."
            onChange={(event) => {
              setComment(event.currentTarget.value.trimStart());
            }}
            value={comment ? comment : ""}
          />
          {isFetching ? (
            <UILoader />
          ) : (
            <Button
              disabled={btnDisabled}
              onClick={(
                event: React.MouseEvent<HTMLButtonElement, MouseEvent>
              ) => {
                event.preventDefault();
                if (userID && blogID && comment && role) {
                  setIsFetching(true);
                  postComment({ userID, comment, blogID, role })
                    .then(() => {
                      setIsFetching(false);
                    })
                    .catch(() => {
                      setIsFetching(false);
                    });
                  setComment(null);
                }
              }}
              className="outlined-btn"
            >
              Submit
            </Button>
          )}
        </form>
      </div>
    </>
  );
};

export default CommentInput;
