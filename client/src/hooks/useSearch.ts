import { useState, useRef } from "react";
import useDebounce from "@/hooks/useDebounce";
import { searchSuggestions } from "@/constants/searchSuggestions";

export const useSearchBar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);

  useDebounce(
    () => {
      if (searchQuery.trim()) {
        setFilteredSuggestions(
          searchSuggestions.filter((suggestion) =>
            suggestion.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
      } else {
        setFilteredSuggestions([]);
      }
    },
    500,
    [searchQuery]
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleInputFocus = () => setIsSuggestionsVisible(true);
  const handleInputBlur = () => setIsSuggestionsVisible(false);

  const handleClearSearch = () => {
    setSearchQuery("");
    setFilteredSuggestions([]);
    setIsSuggestionsVisible(false);
    if (inputRef.current) inputRef.current.focus();
  };

  return {
    inputRef,
    searchQuery,
    filteredSuggestions,
    isSuggestionsVisible,
    handleSearchChange,
    handleInputFocus,
    handleInputBlur,
    handleClearSearch,
  };
};
