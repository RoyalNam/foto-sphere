import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
    handleSearchSubmit,
    resetSearch,
  } = useSearchBar();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.pathname.startsWith("/search")) {
      resetSearch();
    }
  }, [location.pathname]);

  const handleSelectSuggestion = (suggestion: string) => {
    handleSearchChange({
      target: { value: suggestion },
    } as React.ChangeEvent<HTMLInputElement>);
    inputRef.current?.blur();
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  return (
    <div
      className={`flex-1 relative ${
        isSearchOpen ? "block" : "hidden"
      } md:block`}
    >
      <MagnifyingGlassIcon className="absolute transform -translate-y-1/2 cursor-pointer left-3 top-1/2 size-5 text-foreground-muted" />
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
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleInputBlur();
            handleSearchSubmit();
          }
        }}
        className="w-full py-2 pl-10 pr-3 transition-all duration-300 bg-transparent border rounded-full border-black/10 dark:border-white/20 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      {isSuggestionsVisible && filteredSuggestions.length > 0 && (
        <ul className="absolute left-0 right-0 mt-1 border border-border shadow-lg rounded overflow-y-auto min-w-[448px] max-h-[496px] bg-background">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              onMouseDown={(e) => {
                e.preventDefault();
                setTimeout(() => handleSelectSuggestion(suggestion), 0);
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
