import create from "zustand";
import { devtools } from "zustand/middleware";

let initialState = {
  isLoading: false,
  isFetchingInitialUserInfo: false,
  isMobileMenuActive: false,
};

interface LoaderStoreType {
  isLoading: boolean;
  isFetchingInitialUserInfo: boolean;
  isMobileMenuActive: boolean;
}

const useStore = create<LoaderStoreType>()(
  devtools(() => {
    return {
      ...initialState,
    };
  })
);

const useLoaderStore = useStore;
export default useLoaderStore;
