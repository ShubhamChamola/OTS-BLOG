// CSS module
import useLoaderStore from "../../../store/useLoaderStore";
import "./style.scss";

export default function Loader() {
  const isLoading = useLoaderStore((store) => store.isLoading);

  return (
    <>
      {isLoading && (
        <div id="loader">
          <span></span>
        </div>
      )}
    </>
  );
}
