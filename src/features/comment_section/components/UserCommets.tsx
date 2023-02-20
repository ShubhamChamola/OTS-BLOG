// React Modules
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

// Firebase Modules
import { off, ref } from "firebase/database";
import { realtimeDB } from "../../../lib/firebase";

// Service Modules
import fetchInitialComments from "../../../services/blog/fetchInitialComments";
import fetchCommenterInfo from "../../../services/blog/fetchCommenterInfo";
import fetchComments from "../../../services/blog/fetchComments";

// Component Module
import Button from "../../../components/ui/Button";
import { CommentTileSkeleton } from "../../../skeleton/BlogPage";

interface CommentType {
  userID: string;
  text: string;
  role: "Admin" | "User";
}

const dummyUserAvatar =
  require("../../../assets/images/user-dummy-avatar.png") as string;

function Comment({ userID, text, role }: CommentType) {
  const [commenterInfo, setCommenterInfo] = useState<{
    firstName: string;
    lastName: string;
    avatar: string | null;
  }>();
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    fetchCommenterInfo(userID, role)
      .then((value) => {
        if (value) {
          setCommenterInfo({ ...value });
        }
        setIsFetching(false);
      })
      .catch((error) => {
        console.log(error);
        setIsFetching(false);
      });
  }, []);

  return (
    <>
      {isFetching && (
        <>
          <CommentTileSkeleton />
        </>
      )}
      {!isFetching && commenterInfo && (
        <>
          <div className="comment">
            <div className="user-avatar">
              <img
                src={commenterInfo.avatar || dummyUserAvatar}
                alt="Commenter Profile Pic"
              />
            </div>
            <div className="comment-body">
              <div className="user-info">
                <h5>
                  {commenterInfo.firstName.length > 8
                    ? commenterInfo.firstName.slice(0, 1).toUpperCase() + "."
                    : commenterInfo.firstName}{" "}
                  {commenterInfo.lastName.length > 8
                    ? commenterInfo.lastName.slice(0, 1).toUpperCase() + "."
                    : commenterInfo.lastName}
                </h5>
              </div>
              <div className="comment-text">
                {text.split("\n").map((textLine, index) => (
                  <p key={text.slice(0, 5) + index}>{textLine}</p>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      {!isFetching && !commenterInfo && null}
    </>
  );
}

const UserComments: React.FC = () => {
  const { blogID } = useParams();

  const [comments, setComments] = useState<CommentType[]>([]);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [lastCommentKey, setLastCommentKey] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (blogID) {
      fetchInitialComments(
        blogID,
        setComments,
        setLastCommentKey,
        setIsFetching,
        setBtnDisabled
      );
    }

    return () => {
      setIsFetching(false);
      setComments([]);
      setLastCommentKey(null);
      off(ref(realtimeDB, `comments/${blogID}`));
      setBtnDisabled(false);
    };
  }, [blogID]);

  return (
    <>
      {isFetching && comments.length <= 0 && (
        <>
          <div className="comments-container">
            <CommentTileSkeleton />
            <CommentTileSkeleton />
            <CommentTileSkeleton />
          </div>
        </>
      )}
      {isFetching && comments.length > 0 && (
        <>
          <div className="comments-container">
            {comments.map((comment, index) => (
              <Comment key={index + comment.userID.slice(0, 5)} {...comment} />
            ))}
            <CommentTileSkeleton />
            <CommentTileSkeleton />
          </div>
        </>
      )}
      {!isFetching && comments.length >= 1 && (
        <>
          <div className="comments-container">
            {comments.map((comment, index) => (
              <Comment key={index + comment.userID.slice(0, 5)} {...comment} />
            ))}
            <Button
              disabled={btnDisabled}
              onClick={() => {
                fetchComments(
                  blogID!,
                  setComments,
                  lastCommentKey!,
                  setLastCommentKey,
                  setBtnDisabled
                );
              }}
              className="outlined-btn"
            >
              Show More
            </Button>
          </div>
        </>
      )}
      {!isFetching && comments.length <= 0 && (
        <p>Be the first one to comment</p>
      )}
    </>
  );
};

export default UserComments;
