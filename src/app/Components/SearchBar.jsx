"use client";

import { SearchIcon } from "./Icons";

export const SearchBar = ({ handleSearch, search = "" }) => {
  return (
    <div className="items-center md:ml-0 ml-16 flex h-10 overflow-hidden w-full     bg-gray-200 rounded-lg gap-2 py-2 px-4">
      <SearchIcon />
      <input
        type="text"
        suppressHydrationWarning
        placeholder="Search by name or email.."
        onChange={handleSearch}
        defaultValue={search || ""}
        className="w-full outline-none bg-transparent placeholder-slate-500 text-gray-600"
      />
    </div>
  );
};
