import Button from "../../../components/ui/Button";
import { useState, useEffect } from "react";
import useUserInfoStore from "../../../store/useUserInfoStore";
import useAuthStore from "../../../store/useAuthStore";
import { useParams } from "react-router-dom";
import postComment from "../../../services/blog/postComment";

const CommentInput: React.FC = () => {
  const role = useAuthStore((state) => state.role);

  const [comment, setComment] = useState<string | null>(null);
  const [bubbleTimer, setBubbleTimer] = useState<null | NodeJS.Timeout>(null);
  const [btnDisabled, setBtnDisabled] = useState(true);

  const userAvatar = useUserInfoStore((state) => state.avatar);
  const userId = useAuthStore((state) => state.userId);
  const { blogId } = useParams();

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
      {userId ? (
        <div className="user-comment">
          <div className="user-avatar">
            <img src={userAvatar!} alt="profile of User" />
          </div>
          <form>
            <textarea
              name="comment"
              placeholder="Type Your Comment here ..."
              onChange={(event) => {
                setComment(event.currentTarget.value.trimStart());
              }}
              value={comment ? comment : ""}
            />
            <Button
              disabled={btnDisabled}
              onClick={(
                event: React.MouseEvent<HTMLButtonElement, MouseEvent>
              ) => {
                event.preventDefault();
                if (userId && blogId && comment && role) {
                  postComment({ userId, comment, blogId, role });
                  setComment(null);
                }
              }}
              className="outlined-btn"
            >
              Submit
            </Button>
          </form>
        </div>
      ) : (
        <div className="user-comment">
          <p>Plz login to chat</p>
        </div>
      )}
    </>
  );
};

export default CommentInput;
