import { realtimeDB } from "../../lib/firebase";
import { ref, onChildAdded, onValue } from "firebase/database";

export default async function fetchCommentsEvent(
  blogId: string,
  setTotalComments: React.Dispatch<React.SetStateAction<number>>,
  setComments: React.Dispatch<
    React.SetStateAction<
      { userId: string; role: "Admin" | "User"; text: string }[]
    >
  >,
  setLastCommentKey: React.Dispatch<React.SetStateAction<string | null>>
) {
  let initialRun = true;
  const commentContainer = document.querySelector(
    ".comments-container"
  )! as HTMLElement;

  let index = 1;
  // This function is responsible for fetching all the comments and setting 10 recent comments
  onValue(
    ref(realtimeDB, `comments/${blogId}`),
    (snapshot) => {
      let size = snapshot.size;
      setTotalComments(size);

      setComments([]);

      let start = size - 10;
      snapshot.forEach((childSnapshot) => {
        if (index >= start) {
          setComments((prev) => {
            return [childSnapshot.val(), ...prev];
          });
        }

        if (index === start) {
          setLastCommentKey(childSnapshot.key);
        }

        index++;
      });

      initialRun = false;
    },
    { onlyOnce: true }
  );

  // this function is responsible for capturing any new message after initial msgs have been fetched
  onChildAdded(ref(realtimeDB, `comments/${blogId}`), (data) => {
    if (!initialRun) {
      setTotalComments((prev) => {
        return prev + 1;
      });
      console.log(data.val().userId, data.val().text, "--------------");
      setComments((prev) => {
        return [
          {
            userId: data.val().userId,
            text: data.val().text,
            role: data.val().role,
          },
          ...prev,
        ];
      });

      // Responsible for scrolling up the comment container as new comments are typed in
      setTimeout(() => {
        commentContainer.scrollTop = 0;
      }, 100);
    }
  });
}
