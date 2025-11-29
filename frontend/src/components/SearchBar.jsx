import { useState } from "react";

export default function SearchBar({ onSearch, onUseLocation, disabled }) {
  const [input, setInput] = useState("");

  function handleSearch() {
    if (!input.trim()) return; // prevent empty search
    onSearch(input.trim());
    setInput(""); // <-- clear the search bar
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      handleSearch(); // <-- search on Enter
    }
  }

  return (
    <div className="search-bar">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress} // <-- Enter key support
        placeholder="Enter city..."
        disabled={disabled}
      />

      <button onClick={handleSearch} disabled={disabled}>
        Search
      </button>

      <button
        className="use-location-btn"
        onClick={onUseLocation}
        disabled={disabled}
      >
        📍 Use My Location
      </button>
    </div>
  );
}
