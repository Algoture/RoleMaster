import { SearchIcon } from "./Icons";

export const SearchBar = ({ handleSearch, search }) => {
  return (
    <div className="hidden md:flex items-center w-fit h-fit bg-gray-200 rounded-full gap-2 px-3 py-1">
      <SearchIcon />
      <input
        type="text"
        placeholder="Search.."
        onChange={handleSearch}
        value={search}
        className="focus:outline-none bg-gray-200 placeholder-black "
      />
    </div>
  );
};
