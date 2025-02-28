import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useDebounce from "@/hooks/useDebounce";
import { searchSuggestions } from "@/constants/searchSuggestions";
import { searchCollections, searchPhotos, searchUsers } from "@/services/api";

export const useSearchBar = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
  const [searchResults, setSearchResults] = useState({
    photos: 0,
    collections: 0,
    users: 0,
  });
  const [loading, setLoading] = useState(false);

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const [photos, collections, users] = await Promise.all([
        searchPhotos({ query, per_page: 5 }) as any,
        searchCollections({ query, per_page: 5 }) as any,
        searchUsers({ query, per_page: 5 }) as any,
      ]);
      setSearchResults({
        photos: photos.total || 0,
        collections: collections.total || 0,
        users: users.total || 0,
      });
    } catch (error) {
      console.error("Search API Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

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

  const handleSearchSubmit = () => {
    if (inputRef.current?.value.trim()) {
      inputRef.current.blur();
      navigate(`/search?q=${encodeURIComponent(inputRef.current?.value)}`);
    }
  };

  const handleInputFocus = () => setIsSuggestionsVisible(true);
  const handleInputBlur = () => setIsSuggestionsVisible(false);

  const resetSearch = () => {
    if (inputRef.current && inputRef.current.value) {
      inputRef.current.value = "";
      setSearchQuery("");
      setFilteredSuggestions([]);
      setSearchResults({ photos: 0, collections: 0, users: 0 });
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setFilteredSuggestions([]);
    setSearchResults({ photos: 0, collections: 0, users: 0 });
    setIsSuggestionsVisible(false);
    if (inputRef.current) inputRef.current.focus();
  };

  return {
    inputRef,
    searchQuery,
    searchResults,
    loading,
    filteredSuggestions,
    isSuggestionsVisible,
    handleSearch,
    handleSearchChange,
    handleInputFocus,
    handleInputBlur,
    handleClearSearch,
    resetSearch,
    handleSearchSubmit,
  };
};
