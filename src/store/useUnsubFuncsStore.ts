import create from "zustand";
import { persist, devtools } from "zustand/middleware";

interface UnSub {
  unSubGetUserInfo: (() => void) | null;
}

const useStore = create<UnSub>()(
  devtools(
    persist(
      (set) => ({
        unSubGetUserInfo: null,
      }),
      {
        name: "unsub-function-storage",
        getStorage: () => sessionStorage,
        partialize: (state) => ({
          unSubGetUserInfo: state.unSubGetUserInfo,
        }),
      }
    )
  )
);

const useUnsubFuncsStore = useStore;
export default useUnsubFuncsStore;
