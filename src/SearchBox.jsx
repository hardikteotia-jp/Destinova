import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const SearchBox = ({ from, to, date, setFrom, setTo, setDate, onSearch }) => {
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!from || !to) {
      alert("Please enter both From and To locations.");
      return;
    }
    if (onSearch) {
      onSearch();
    } else {
      navigate(`/flights?from=${from}&to=${to}&date=${date}`);
    }
  };

  return (
    <div className="search-box-wrapper">
      <div className="search-box">

        <div className="search-field">
          <span className="search-label">FROM</span>
          <input
            type="text"
            placeholder="e.g. Delhi"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>

        <div className="search-divider" />

        <div className="search-field">
          <span className="search-label">TO</span>
          <input
            type="text"
            placeholder="e.g. Mumbai"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>

        <div className="search-divider" />

        {/* DATE — clicking anywhere opens the native calendar */}
        <div
          className="search-field date-field"
          onClick={() => {
            const input = document.getElementById("flight-date-input");
            if (input && input.showPicker) input.showPicker();
          }}
        >
          <span className="search-label">DATE</span>
          <div className="date-display">
            <span className="date-icon">📅</span>
            <span className="date-text">
              {date
                ? new Date(date + "T00:00:00").toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "Select Date"}
            </span>
            {/* The real date input — invisible but functional */}
            <input
              id="flight-date-input"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="date-input-hidden"
            />
          </div>
        </div>

        <button className="search-btn" onClick={handleSearch}>
          🔍 Search Flights
        </button>
      </div>
    </div>
  );
};

export default SearchBox;