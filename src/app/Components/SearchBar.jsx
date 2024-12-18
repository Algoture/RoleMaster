"use client";

import { SearchIcon } from "./Icons";

export const SearchBar = ({ handleSearch, search = "",placeholder }) => {
  return (
    <div className="items-center md:ml-0 sm:ml-12 mx-auto flex h-10 overflow-hidden w-full justify-center bg-gray-200 rounded-lg gap-2 py-2 px-4">
      <SearchIcon />
      <input
        type="text"
        suppressHydrationWarning
        placeholder={placeholder}
        onChange={handleSearch}
        defaultValue={search || ""}
        className="outline-none bg-transparent placeholder-slate-500 text-gray-600 text-left"
      />
    </div>
  );
};
