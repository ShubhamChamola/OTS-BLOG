import create from "zustand";
import { persist, devtools } from "zustand/middleware";

interface State {
  firstName: string | null;
  lastName: string | null;
  avatar: string | null;
  email: string | null;
  bio: string | null;
  avatarFileAddress: string | null;
  bookmarkedBlogs: string[];
  createdBlogs: string[];
  clearStore: () => void;
}

const useStore = create<State>()(
  devtools(
    persist(
      (set) => ({
        firstName: null,
        lastName: null,
        avatar: null,
        email: null,
        bio: null,
        avatarFileAddress: null,
        createdBlogs: [],
        bookmarkedBlogs: [],

        clearStore: () =>
          set((state) => ({
            ...state,
            firstName: null,
            lastName: null,
            avatar: null,
            email: null,
            bio: null,
            avatarFileAddress: null,
            bookmarkedBlogs: [],
            createdBlogs: [],
          })),
      }),

      {
        name: "user-info-storage",
        getStorage: () => sessionStorage,
        partialize: (state) => ({
          firstName: state.firstName,
          lastName: state.lastName,
          avatar: state.avatar,
          email: state.email,
          bio: state.bio,
          avatarFileAddress: state.avatarFileAddress,
          bookmarkedBlogs: state.bookmarkedBlogs,
          createdBlogs: state.createdBlogs,
        }),
      }
    )
  )
);

const useUserInfoStore = useStore;
export default useUserInfoStore;
