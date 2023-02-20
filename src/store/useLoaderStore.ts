import create from "zustand";
import { devtools } from "zustand/middleware";

let initialState = {
  isLoading: false,
  isFetchingInitialUserInfo: false,
};

interface LoaderStoreType {
  isLoading: boolean;
  isFetchingInitialUserInfo: boolean;
}

const useStore = create<LoaderStoreType>()(
  devtools((set) => {
    return {
      ...initialState,
    };
  })
);

const useLoaderStore = useStore;
export default useLoaderStore;
