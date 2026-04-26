import { useState, useRef, useEffect } from "react";
import "./style.css";
import SearchBox from "./SearchBox";
import ChatBot from "./ChatBot";

function Home() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    showWelcome();
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
    
  }, []);

  function showWelcome() {
    const user = localStorage.getItem("destinovaUser");
    const usernameDisplay = document.getElementById("username-display");
    const authOption = document.getElementById("auth-option");

    if (user) {
      usernameDisplay.textContent = user;
      authOption.textContent = "Logout";
      authOption.onclick = logoutUser;
    } else {
      usernameDisplay.textContent = "Account";
      authOption.textContent = "Login";
      authOption.onclick = function () {
        window.location.href = "/login";
      };
    }
  }

  function logoutUser() {
    localStorage.removeItem("destinovaUser");
    alert("Logged out successfully");
    window.location.href = "/";
  }

  return (
    <div>
      {/* Navbar */}
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

      {/* Sub Navbar */}
      <div className="sub-navbar">
        <ul>
          <li><a href="/destinations">🌍<br />Destinations</a></li>
          <li><a href="/travel">🧳<br />Travel</a></li>
          <li><a href="#">⭐<br />Top Picks</a></li>
          <li><a href="https://www.ixigo.com/hotels">🏨<br />Hotels</a></li>
          <li><a href="/flights">✈️<br />Flights</a></li>
          <li><a href="#">💬<br />Reviews</a></li>

          <li className="user-icon">
            <div className="account-menu">
              <div className="account-btn">
                <span className="profile-icon">👤</span>
                <span id="username-display">Account</span>
              </div>
              <div className="dropdown-menu">
                <a href="#">Profile</a>
                <a href="#" id="auth-option">Login</a>
              </div>
            </div>
          </li>
        </ul>
      </div>

      {/* Flight Search Box */}
      <SearchBox
        from={from}
        to={to}
        date={date}
        setFrom={setFrom}
        setTo={setTo}
        setDate={setDate}
      />

      {/* About + Why Us */}
      <div className="container">
        <div className="box">
          <p><b>ABOUT US!</b><br /><br />
            At Destinova, we believe travel is not just a journey, but a life-changing experience.
            Our mission is to connect you with the world's most breathtaking destinations, making your adventures seamless and unforgettable.
            Whether you're seeking hidden gems or iconic landmarks, we're here to inspire, guide, and help you explore the world, one trip at a time..
          </p>
        </div>

        <div className="box">
          <p><b>WHY US?</b><br /><br />
            Choose Destinova for a seamless and personalized travel experience.
            Our intuitive app provides tailored recommendations, exclusive deals, and real-time updates to make your journey effortless.
            With curated travel guides, customer support, and a community of explorers, we make it easier than ever to discover new places, create lasting memories, and enjoy hassle-free trips.
            Your adventure begins with us!
          </p>
        </div>
      </div>

      {/* Destination Cards */}
      <div className="container">
        <div className="small-box1" style={{ backgroundImage: "url('/mumbai.jpg')" }}>
          <p><strong>Explore New Destinations</strong></p>
        </div>
        <div className="small-box2" style={{ backgroundImage: "url('/delhi.jpg')" }}>
          <p><strong>Exclusive Deals</strong></p>
        </div>
        <div className="small-box3" style={{ backgroundImage: "url('/goa.jpg')" }}>
          <p><strong>Travel Guides</strong></p>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 DESTINOVA. All rights reserved.</p>
        
      </footer>
      <ChatBot />
    </div>
  );
}

export default Home;