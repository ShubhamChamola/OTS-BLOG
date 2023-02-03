import { useEffect, useState } from "react";
import fetchCommenterInfo from "../../../services/blog/fetchCommenterInfo";
import useCommentersInfoStore from "../../../store/useCommentersInfo";

interface Props {
  userId: string;
  text: string;
  role: "Admin" | "User";
}

interface Commenter {
  firstName: string | null;
  lastName: string | null;
  avatar: string;
}

const dummyImg = require("../../../assets/images/user-dummy-avatar.png")!;

const Comment: React.FC<Props> = ({ userId, text, role }) => {
  const [commenterInfo, setCommenterInfo] = useState<Commenter | null>(null);

  const commenterInfoStore = useCommentersInfoStore.getState().commenters;

  useEffect(() => {
    fetchCommenterInfo(userId, role).then((info) => {
      setCommenterInfo(info);
    });
  }, [userId]);

  return (
    <>
      {commenterInfo && text && (
        <div className="comment">
          <div className="user-avatar">
            <img
              src={commenterInfo.avatar || dummyImg}
              alt="profile of commenter"
            />
          </div>
          <div className="cmnt">
            <div className="user-info">
              <h5>{`${commenterInfo.firstName || "user"} ${
                commenterInfo.lastName
              }`}</h5>
            </div>
            <div className="msg">
              {text.split("\n").map((textLine, index) => (
                <p key={index + userId}>{textLine}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Comment;
