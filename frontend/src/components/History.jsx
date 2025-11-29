import { useState } from "react";

export default function History({ items, onClick, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const visibleItems = expanded ? items : items.slice(0, 5);

  return (
    <div className="history">
      <h3>Search History</h3>
      <div className="history-list">
        {visibleItems.map((city, i) => (
          <div key={i} className="history-chip">
            <span className="chip-text" onClick={() => onClick(city)}>
              {city}
            </span>
            <button
              className="delete-chip-btn"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(city);
              }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      {items.length > 5 && (
        <button
          className="history-toggle"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
}
