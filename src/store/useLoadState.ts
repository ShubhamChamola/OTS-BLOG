import create from "zustand";

interface State {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

const useStore = create<State>((set) => ({
  isLoading: false,
  setIsLoading: (value) => ({
    isLoading: value,
  }),
}));

const useLoadingState = useStore;
export default useLoadingState;
