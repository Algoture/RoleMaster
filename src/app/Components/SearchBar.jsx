"use client";

import { SearchIcon } from "./Icons";

export const SearchBar = ({ handleSearch, search = "" }) => {
  return (
    <div className="flex items-center h-fit bg-gray-200 rounded-full gap-2 px-4 py-2">
      <SearchIcon />
      <input
        type="text"
        suppressHydrationWarning
        placeholder="Search.."
        onChange={handleSearch}
        defaultValue={search || ""}
        className="focus:outline-none bg-gray-200 placeholder-black"
      />
    </div>
  );
};
