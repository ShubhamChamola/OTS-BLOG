import create from "zustand";
import { devtools } from "zustand/middleware";

interface UserInfoType {
  role: "User" | "Admin" | null;
  userID: string | null;
  firstName: string | null;
  lastName: string | null;
  avatar: string | null;
  blogIDs: string[];
  likedBlogs: string[];
  bio?: string | null;
  email?: string | null;
}

interface InfoStoreType {
  info: UserInfoType;
  detachListener: (() => void) | null;
  clearInfo: () => void;
}

let initialState = {
  role: null,
  userID: null,
  firstName: null,
  lastName: null,
  avatar: null,
  blogIDs: [],
  email: null,
  bio: null,
  likedBlogs: [],
};

const useStore = create<InfoStoreType>()(
  devtools((set) => {
    return {
      info: initialState,

      detachListener: null,

      clearInfo: () =>
        set((state) => {
          return {
            ...state,
            info: initialState,
            detachListener: null,
          };
        }),
    };
  })
);

const useUserInfoStore = useStore;
export default useUserInfoStore;
