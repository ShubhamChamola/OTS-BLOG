import Comment from "./components/Comment";
import CommentInput from "./components/CommentInput";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import fetchComments from "../../services/blog/fetchComments";
import fetchCommentsEvent from "../../services/blog/fetchCommentEvent";
import { off, ref } from "firebase/database";
import { realtimeDB } from "../../lib/firebase";
import Button from "../../components/ui/Button";

interface CommentType {
  userId: string;
  role: "Admin" | "User";
  text: string;
}

const CommentTile: React.FC = () => {
  const { blogId } = useParams();

  const [comments, setComments] = useState<CommentType[]>([]);

  const [totalComments, setTotalComments] = useState(0);
  const [lastCommentKey, setLastCommentKey] = useState<string | null>(null);

  const [btnDisabled, setBtnDisabled] = useState(true);

  // Will trigger a function which will listen for new comments as well as fetch 10 recent comments
  useEffect(() => {
    if (blogId)
      fetchCommentsEvent(
        blogId,
        setTotalComments,
        setComments,
        setLastCommentKey
      );

    return () => {
      off(ref(realtimeDB, `comments/${blogId}`));
    };
  }, [blogId]);

  // will be responsible for disablign or enabling the button
  useEffect(() => {
    if (comments.length >= totalComments) setBtnDisabled(true);
    else setBtnDisabled(false);
  }, [totalComments, comments.length]);

  useEffect(() => {
    console.log(comments, "serr geree");
  });

  return (
    <article id="comment-tile">
      <h4>Share Your Thoughts</h4>
      <div className="comments">
        <div className="comments-container">
          {comments.length > 0 ? (
            comments.map((cmnt, index) => (
              <Comment
                key={index}
                userId={cmnt.userId}
                text={cmnt.text}
                role={cmnt.role}
              />
            ))
          ) : (
            <p>Be the first one to comment</p>
          )}
        </div>
        {comments.length > 0 && (
          <Button
            disabled={btnDisabled}
            onClick={() => {
              fetchComments(
                blogId!,
                setComments,
                lastCommentKey!,
                setLastCommentKey
              );
            }}
            className="outlined-btn"
          >
            Show More
          </Button>
        )}
        <CommentInput />
      </div>
    </article>
  );
};

export default CommentTile;
