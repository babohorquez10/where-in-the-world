import { setSearchInput } from "@/reducers/countries.actions";
import { selectSearchInput } from "@/reducers/countries.selectors";
import { useAppDispatch } from "@/utils/hooks";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { useSelector } from "react-redux";

export default function SearchInput() {
  const dispatch = useAppDispatch();

  const search = useSelector(selectSearchInput);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearchIconClick = () => {
    searchInputRef?.current?.focus();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchInput(e.target.value));
  };

  return (
    <div className="relative">
      <span
        className="absolute z-50 mt-4 ml-4 md:ml-10 cursor-text"
        onClick={handleSearchIconClick}
      >
        <BsSearch className="search-icon" fontSize={"1.4rem"} />
      </span>
      <input
        ref={searchInputRef}
        className="py-4 px-14 md:px-24 pr-4 rounded-md drop-shadow block md:inline w-full md:w-search mb-6 md:mb-0"
        placeholder="Search for a country..."
        value={search}
        onChange={handleSearchChange}
      />
    </div>
  );
}
