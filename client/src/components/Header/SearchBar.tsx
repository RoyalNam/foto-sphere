import React from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSearchBar } from "@/hooks/useSearch";

interface SearchBarProps {
  isSearchOpen: boolean;
  closeSearchOnBlur: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  isSearchOpen,
  closeSearchOnBlur,
}) => {
  const {
    inputRef,
    searchQuery,
    filteredSuggestions,
    isSuggestionsVisible,
    handleSearchChange,
    handleInputFocus,
    handleInputBlur,
    handleClearSearch,
  } = useSearchBar();

  return (
    <div
      className={`flex-1 relative ${
        isSearchOpen ? "block" : "hidden"
      } md:block`}
    >
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 cursor-pointer text-foreground-muted" />
      {searchQuery && (
        <button
          onClick={handleClearSearch}
          className="absolute right-3 top-1/2 transform p-0.5 -translate-y-1/2 cursor-pointer border-none bg-transparent hover:bg-background-alt text-foreground-muted rounded-full"
          aria-label="Clear search"
        >
          <XMarkIcon className="size-5" />
        </button>
      )}

      <input
        ref={inputRef}
        type="search"
        id="search"
        name="search"
        placeholder="Search..."
        aria-label="Search"
        value={searchQuery}
        onFocus={handleInputFocus}
        onBlur={() => {
          handleInputBlur();
          closeSearchOnBlur();
        }}
        onChange={handleSearchChange}
        className="w-full pl-10 pr-3 py-2 border bg-transparent border-black/10 dark:border-white/20 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-300"
      />
      {isSuggestionsVisible && filteredSuggestions.length > 0 && (
        <ul className="absolute left-0 right-0 mt-1 border border-border shadow-lg rounded overflow-y-auto min-w-[448px] max-h-[496px] bg-background">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              onMouseDown={() => {
                console.log("suggestion", suggestion);
                handleInputBlur();
              }}
              className="px-4 py-1 cursor-pointer hover:bg-background-alt"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
