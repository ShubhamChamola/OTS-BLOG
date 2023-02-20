// Component Module
import CommentInput from "./components/CommentInput";
import UserComments from "./components/UserCommets";

// Store Modules
import useUserInfoStore from "../../store/useUserInfoStore";

const CommentSection: React.FC = () => {
  const { userID } = useUserInfoStore((store) => store.info);

  return (
    <article id="comment-section">
      <h4>Share Your Thoughts</h4>
      <div className="comment-box">
        <UserComments />
        {userID ? <CommentInput /> : <p>Please login to comment</p>}
      </div>
    </article>
  );
};

export default CommentSection;
