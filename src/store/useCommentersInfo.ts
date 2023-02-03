import create from "zustand";
import { persist, devtools } from "zustand/middleware";

interface State {
  [key: string]: {
    firstName: string | null;
    lastName: string | null;
    avatar: string;
  };
}

interface Store {
  commenters: State | null;
  addCommentersInfo: (value: {
    firstName: string | null;
    lastName: string | null;
    avatar: string;
    userId: string;
  }) => void;
}

const useStore = create<Store>()(
  devtools(
    persist(
      (set) => ({
        commenters: null,

        addCommentersInfo: (value: {
          firstName: string | null;
          lastName: string | null;
          avatar: string;
          userId: string;
        }) =>
          set((store) => ({
            commenters: store.commenters
              ? {
                  ...store.commenters,
                  [value.userId]: {
                    firstName: value.firstName,
                    lastName: value.lastName,
                    avatar: value.avatar,
                  },
                }
              : {
                  [value.userId]: {
                    firstName: value.firstName,
                    lastName: value.lastName,
                    avatar: value.avatar,
                  },
                },
          })),
      }),
      {
        name: "unsub-function-storage",
        getStorage: () => sessionStorage,
        partialize: (state) => ({
          commenters: state.commenters,
        }),
      }
    )
  )
);

const useCommentersInfoStore = useStore;
export default useCommentersInfoStore;
