import create from "zustand";
import { devtools } from "zustand/middleware";
import useAuthStore from "./useAuthStore";

const role = useAuthStore.getState().role;

interface AdminInfoType {
  firstName: string | null;
  lastName: string | null;
  avatar: string | null;
  avatarFileAddress: string | null;
  bio: string | null;
  blogs: string[];

  clearStore: () => void;
}
interface UserInfoType {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  avatar: string | null;
  avatarFileAddress: string | null;
  blogs: string[];

  clearStore: () => void;
}

let initialAdminInfoState = {
  firstName: null,
  lastName: null,
  avatar: null,
  avatarFileAddress: null,
  bio: null,
  blogs: [],
};

let initialUserInfoState = {
  firstName: null,
  lastName: null,
  email: null,
  avatar: null,
  avatarFileAddress: null,
  blogs: [],
};

const useStore = create<AdminInfoType | UserInfoType>()(
  devtools((set) =>
    role === "Admin"
      ? {
          ...initialAdminInfoState,
          clearStore: () => set(initialAdminInfoState),
        }
      : {
          ...initialUserInfoState,
          clearStore: () => set(initialUserInfoState),
        }
  )
);

const useUserInfoStore = useStore;
export default useUserInfoStore;
