import { useEffect } from "react";
import "./style.css";

function Destinations() {

  useEffect(() => {
    fetchFlights();
  }, []);

  function handleSearch() {
    const searchTerm = document.getElementById('search-input').value;
    if (searchTerm) {
      window.location.href = `/flights?search=${searchTerm}`;
    } else {
      alert("Please enter a search term.");
    }
  }

  function fetchFlights() {
    const searchParams = new URLSearchParams(window.location.search);
    const searchTerm = searchParams.get('search');

    const el = document.getElementById('no-flights-message');
    if (!el) return;

    if (!searchTerm || searchTerm.toLowerCase() === "no flights") {
      el.innerText = 'No flights available for your search.';
    } else {
      el.innerText = `Flights available for "${searchTerm}"!`;
    }
  }

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
          <li><a href="/destinations">🌍<br />Destinations</a></li>
          <li><a href="#">🧳<br />Travel</a></li>
          <li><a href="#">⭐<br />Top Picks</a></li>
          <li><a href="#">🏨<br />Hotels</a></li>
          <li><a href="/flights">✈️<br />Flights</a></li>
          <li><a href="#">💬<br />Reviews</a></li>
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

        <div className="destination-content">
          <h2>Explore Stunning Destinations</h2>
          <p>
            Here you can explore the most beautiful destinations around the world.
            Whether you’re looking for exotic beaches, historic cities, or mountain retreats, we have it all!
          </p>
        </div>

        <div className="small-box4" style={{ backgroundImage: "url('/paris.webp')" }}>
          <p><strong>Paris, France</strong></p>
        </div>

        <div className="small-box5" style={{ backgroundImage: "url('/tokyo.jpg')" }}>
          <p><strong>Tokyo, Japan</strong></p>
        </div>

        <div className="small-box6" style={{ backgroundImage: "url('/bali.avif')" }}>
          <p><strong>Bali, Indonesia</strong></p>
        </div>

        <div className="small-box7" style={{ backgroundImage: "url('/newyork.jpg')" }}>
          <p><strong>New York City, USA</strong></p>
        </div>

        <div className="small-box8" style={{ backgroundImage: "url('/london.jpeg')" }}>
          <p><strong>London, England</strong></p>
        </div>

        <div className="small-box9" style={{ backgroundImage: "url('/sydney.jpg')" }}>
          <p><strong>Sydney, Australia</strong></p>
        </div>

      </div>

      {/* FOOTER */}
      <footer className="footer">
        <p>&copy; 2025 DESTINOVA. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default Destinations;