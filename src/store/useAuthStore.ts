import create from "zustand";

interface State {
  userId: string | null;
  role: "Admin" | "User" | null;
  clearStore: () => void;
}

const useStore = create<State>((set) => ({
  userId: null,
  role: null,
  clearStore: () =>
    set((state) => ({
      ...state,
      userId: null,
      role: null,
    })),
}));

const useAuthStore = useStore;
export default useAuthStore;
