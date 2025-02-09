import { useState, useEffect } from "react";
import styles from "./AutocompleteSearch.module.css";

export default function AutocompleteSearch() {
  const [query, setQuery] = useState(""); // User input
  const [suggestions, setSuggestions] = useState<string[]>([]); // Store fetched songs
  const [loading, setLoading] = useState(false); // Show loading indicator

  useEffect(() => {
    if (query.length > 1) {
      setLoading(true); // Show loading when fetching
      fetch(`/api/songs?q=${query}`)
        .then((res) => res.json())
        .then((data) => {
          setSuggestions(data.map((song: { name: string }) => song.name)); // Extract song names
          setLoading(false); // Hide loading
        })
        .catch((err) => {
          console.error("Error fetching songs:", err);
          setLoading(false);
        });
    } else {
      setSuggestions([]); // Clear suggestions if query is too short
    }
  }, [query]);

  const handleSelect = (song: string) => {
    setQuery(song); // Fill input with selected song
    setSuggestions([]); // Hide suggestions
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        className={styles.searchInput}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a song..."
      />
      
      {/* Show loading indicator */}
      {loading && <p className={styles.loadingText}>Loading...</p>}

      {/* Display suggestions */}
      {suggestions.length > 0 && (
        <ul className={styles.suggestionsList}>
          {suggestions.map((song, index) => (
            <li key={index} onClick={() => handleSelect(song)} className={styles.suggestionItem}>
              {song}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
