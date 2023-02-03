import CloseSVG from "../../assets/icons/CloseSVG";
import { useRef } from "react";

const Search: React.FC = () => {
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div id="search-bar">
      <input
        ref={searchInputRef}
        type="text"
        name="search-field"
        id="custom-search"
      />
      {searchInputRef?.current?.value ? "search icon" : <CloseSVG />}
    </div>
  );
};

export default Search;
