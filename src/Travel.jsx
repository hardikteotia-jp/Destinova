import React, { useEffect } from "react";
import "./style.css";

function Travel() {

  const handleSearch = () => {
    const searchInput = document.getElementById("search-input");
    const searchTerm = searchInput.value;

    if (searchTerm) {
      window.location.href = `/flights?search=${searchTerm}`;
    } else {
      alert("Please enter a search term.");
    }
  };

  const fetchFlights = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const searchTerm = searchParams.get("search");

    const el = document.getElementById("no-flights-message");
    if (!el) return;

    if (!searchTerm || searchTerm.toLowerCase() === "no flights") {
      el.innerText = "No flights available for your search.";
    } else {
      el.innerText = `Flights available for "${searchTerm}"!`;
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  return (
    <div>

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-brand">DESTINOVA</div>
        <ul className="navbar-links">
          <li><a href="/">Home</a></li>
          <li><a href="/destinations">Destinations</a></li>
          <li><a href="#">Latest</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/register">Signup</a></li>
        </ul>
      </nav>

      {/* SUB NAVBAR */}
      <div className="sub-navbar">
        <ul>
          <li><a href="/destinations"><span>🌍</span><br />Destinations</a></li>
          <li><a href="/travel"><span>🧳</span><br />Travel</a></li>
          <li><a href="#"><span>⭐</span><br />Top Picks</a></li>
          <li><a href="/hotels"><span>🏨</span><br />Hotels</a></li>
          <li><a href="/flights"><span>✈️</span><br />Flights</a></li>
          <li><a href="#"><span>💬</span><br />Reviews</a></li>
        </ul>
      </div>

      {/* SEARCH */}
      <div className="search-bar-container">
        <input
          type="text"
          id="search-input"
          className="search-bar"
          placeholder="Search for flights, hotels, destinations..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* CONTENT */}
      <div className="container">

        <div className="tip-box-container">
          <h2>Travel Tips</h2>

          <div className="tip-box">
            <h3>Pack Smart</h3>
            <p>Always pack light and make sure to carry only essential items. Don't forget a power bank for your devices!</p>
          </div>

          <div className="tip-box">
            <h3>Stay Safe</h3>
            <p>Ensure you keep your valuables safe and keep an eye on your belongings while traveling.</p>
          </div>

          <div className="tip-box">
            <h3>Budget Wisely</h3>
            <p>Before your trip, create a budget and stick to it. Research your destination's average cost of food, transportation, and activities to avoid overspending.</p>
          </div>

          <div className="tip-box">
            <h3>Download Offline Maps</h3>
            <p>Don't rely on data for navigation. Download offline maps of the areas you'll visit so you can get around without an internet connection.</p>
          </div>

          <div className="tip-box">
            <h3>Travel Insurance</h3>
            <p>Invest in travel insurance to protect yourself from unexpected medical emergencies, trip cancellations, or lost luggage.</p>
          </div>

          <div className="tip-box">
            <h3>Learn Basic Phrases</h3>
            <p>If you're traveling to a country where you don't speak the language, learning a few key phrases like "hello," "thank you," and "where is...?" can be very helpful.</p>
          </div>

          <div className="tip-box">
            <h3>Pack Light</h3>
            <p>Traveling with only a carry-on bag can save you time at airports and avoid extra baggage fees. Stick to essentials and versatile clothing.</p>
          </div>

          <div className="tip-box">
            <h3>Keep Copies of Important Documents</h3>
            <p>Make copies of your passport, travel insurance, and other important documents. Keep one set with you in a separate bag and store another set online.</p>
          </div>

          <div className="tip-box">
            <h3>Stay Hydrated</h3>
            <p>Long flights or train rides can dehydrate you. Carry a reusable water bottle and make sure to stay hydrated, especially in hot climates.</p>
          </div>

          <div className="tip-box">
            <h3>Use Local Currency</h3>
            <p>For the best exchange rates, try to use local currency rather than relying on credit cards. Avoid currency exchange services at airports, as they often charge high fees.</p>
          </div>

          <div className="tip-box">
            <h3>Respect Local Culture</h3>
            <p>Learn about and respect local customs and traditions. Understanding local norms will help you blend in and show respect for the people you're visiting.</p>
          </div>

          <div className="tip-box">
            <h3>Pack a First-Aid Kit</h3>
            <p>Carry a small first-aid kit with bandages, painkillers, and any necessary medications. You never know when you might need it while on the road.</p>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <p>&copy; 2025 DESTINOVA. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default Travel;