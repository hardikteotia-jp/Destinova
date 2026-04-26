import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import emailjs from "@emailjs/browser";
import "./style.css";
import SearchBox from "./SearchBox";
import ChatBot from "./ChatBot";
 
// ── EmailJS credentials ──────────────────────────────────────────
const EMAILJS_SERVICE_ID  = "service_14psecn";
const EMAILJS_TEMPLATE_ID = "template_svc01dd";
const EMAILJS_PUBLIC_KEY  = "ygSQ6h9mVpu3TWT5C";
// ─────────────────────────────────────────────────────────────────
 
const Flights = () => {
  const location = useLocation();
 
  const [from, setFrom]                   = useState("");
  const [to, setTo]                       = useState("");
  const [date, setDate]                   = useState("");
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [emailSent, setEmailSent]         = useState(false);
  const [emailStatus, setEmailStatus]     = useState(""); // "sending" | "sent" | "error"
 
  const emailTimerRef = useRef(null); // so we can cancel if user searches again
 
  const flights = [
    { airline: "IndiGo",    from: "Delhi",     to: "Mumbai",    time: "06:30 AM", price: 4500 },
    { airline: "Air India", from: "Delhi",     to: "Mumbai",    time: "08:10 AM", price: 5200 },
    { airline: "Vistara",   from: "Delhi",     to: "Mumbai",    time: "09:45 AM", price: 6100 },
    { airline: "Akasa Air", from: "Delhi",     to: "Mumbai",    time: "11:15 AM", price: 4700 },
    { airline: "IndiGo",    from: "Delhi",     to: "Bangalore", time: "07:00 AM", price: 5200 },
    { airline: "Air India", from: "Delhi",     to: "Bangalore", time: "09:20 AM", price: 5800 },
    { airline: "Vistara",   from: "Delhi",     to: "Bangalore", time: "12:15 PM", price: 6400 },
    { airline: "Akasa Air", from: "Delhi",     to: "Bangalore", time: "02:30 PM", price: 5000 },
    { airline: "SpiceJet",  from: "Delhi",     to: "Bangalore", time: "07:10 PM", price: 5100 },
    { airline: "Air India", from: "Delhi",     to: "Goa",       time: "10:00 AM", price: 6000 },
    { airline: "Vistara",   from: "Delhi",     to: "Goa",       time: "06:45 PM", price: 6000 },
    { airline: "IndiGo",    from: "Delhi",     to: "Kolkata",   time: "01:10 PM", price: 4200 },
    { airline: "Akasa Air", from: "Delhi",     to: "Hyderabad", time: "03:35 PM", price: 4900 },
    { airline: "IndiGo",    from: "Mumbai",    to: "Delhi",     time: "06:00 AM", price: 4500 },
    { airline: "Air India", from: "Mumbai",    to: "Delhi",     time: "08:30 AM", price: 5300 },
    { airline: "Vistara",   from: "Mumbai",    to: "Delhi",     time: "10:45 AM", price: 6200 },
    { airline: "Akasa Air", from: "Mumbai",    to: "Delhi",     time: "12:15 PM", price: 4800 },
    { airline: "SpiceJet",  from: "Mumbai",    to: "Delhi",     time: "04:20 PM", price: 4400 },
    { airline: "IndiGo",    from: "Mumbai",    to: "Bangalore", time: "09:00 AM", price: 3500 },
    { airline: "Akasa Air", from: "Mumbai",    to: "Goa",       time: "05:30 PM", price: 3200 },
    { airline: "IndiGo",    from: "Bangalore", to: "Delhi",     time: "06:40 AM", price: 5100 },
    { airline: "Air India", from: "Bangalore", to: "Delhi",     time: "09:10 AM", price: 5900 },
    { airline: "Vistara",   from: "Bangalore", to: "Delhi",     time: "12:30 PM", price: 6500 },
    { airline: "IndiGo",    from: "Bangalore", to: "Mumbai",    time: "08:00 AM", price: 3600 },
    { airline: "SpiceJet",  from: "Bangalore", to: "Mumbai",    time: "11:20 AM", price: 3400 },
    { airline: "Air India", from: "Bangalore", to: "Hyderabad", time: "02:10 PM", price: 2800 },
    { airline: "Vistara",   from: "Bangalore", to: "Chennai",   time: "04:40 PM", price: 2600 },
    { airline: "IndiGo",    from: "Bangalore", to: "Pune",      time: "06:30 PM", price: 3000 },
    { airline: "Akasa Air", from: "Bangalore", to: "Goa",       time: "08:00 PM", price: 3200 },
    { airline: "IndiGo",    from: "Chennai",   to: "Delhi",     time: "07:20 AM", price: 5400 },
    { airline: "Air India", from: "Chennai",   to: "Delhi",     time: "10:10 AM", price: 6000 },
    { airline: "Vistara",   from: "Chennai",   to: "Mumbai",    time: "01:30 PM", price: 4700 },
    { airline: "Akasa Air", from: "Chennai",   to: "Bangalore", time: "03:00 PM", price: 2500 },
    { airline: "IndiGo",    from: "Chennai",   to: "Hyderabad", time: "05:15 PM", price: 2700 },
    { airline: "SpiceJet",  from: "Chennai",   to: "Kolkata",   time: "07:45 PM", price: 4200 },
    { airline: "Air India", from: "Chennai",   to: "Goa",       time: "09:00 PM", price: 3900 },
    { airline: "IndiGo",    from: "Hyderabad", to: "Delhi",     time: "06:10 AM", price: 4800 },
    { airline: "Air India", from: "Hyderabad", to: "Mumbai",    time: "08:40 AM", price: 4200 },
    { airline: "Vistara",   from: "Hyderabad", to: "Bangalore", time: "11:00 AM", price: 2600 },
    { airline: "Akasa Air", from: "Hyderabad", to: "Chennai",   time: "01:15 PM", price: 2500 },
    { airline: "SpiceJet",  from: "Hyderabad", to: "Goa",       time: "05:50 PM", price: 3300 },
    { airline: "Air India", from: "Hyderabad", to: "Pune",      time: "07:20 PM", price: 3000 },
    

    
    { airline: "SpiceJet", from: "Delhi", to: "Chennai", time: "04:30 PM", price: 5500 },
    { airline: "IndiGo",   from: "Delhi", to: "Pune",    time: "06:00 PM", price: 4800 },

   
    { airline: "Vistara",  from: "Mumbai", to: "Chennai",   time: "07:15 AM", price: 4200 },
    { airline: "Air India",from: "Mumbai", to: "Hyderabad", time: "09:50 AM", price: 3500 },
    { airline: "IndiGo",   from: "Mumbai", to: "Pune",      time: "11:30 AM", price: 2500 },
    { airline: "SpiceJet", from: "Mumbai", to: "Kolkata",   time: "02:10 PM", price: 5200 },

    
    { airline: "IndiGo",   from: "Bangalore", to: "Kolkata", time: "09:30 AM", price: 4800 },
    { airline: "Vistara",  from: "Bangalore", to: "Ahmedabad", time: "01:00 PM", price: 5000 },
    { airline: "Air India",from: "Bangalore", to: "Jaipur", time: "03:45 PM", price: 5300 },

   
    { airline: "IndiGo",   from: "Chennai", to: "Mumbai",    time: "08:00 AM", price: 4700 },
    { airline: "Vistara",  from: "Chennai", to: "Bangalore", time: "10:30 AM", price: 2600 },
    { airline: "Air India",from: "Chennai", to: "Kolkata",   time: "01:20 PM", price: 4300 },
    { airline: "SpiceJet", from: "Chennai", to: "Hyderabad", time: "04:10 PM", price: 2700 },

    
    { airline: "IndiGo",   from: "Hyderabad", to: "Chennai",   time: "06:30 AM", price: 2500 },
    { airline: "Vistara",  from: "Hyderabad", to: "Kolkata",   time: "09:00 AM", price: 4100 },
    { airline: "Air India",from: "Hyderabad", to: "Ahmedabad", time: "12:00 PM", price: 4500 },
    { airline: "SpiceJet", from: "Hyderabad", to: "Jaipur",    time: "03:30 PM", price: 5000 },

   
    { airline: "IndiGo",   from: "Kolkata", to: "Delhi",     time: "07:00 AM", price: 4200 },
    { airline: "Air India",from: "Kolkata", to: "Mumbai",    time: "09:30 AM", price: 5200 },
    { airline: "Vistara",  from: "Kolkata", to: "Bangalore", time: "12:15 PM", price: 4800 },
    { airline: "Akasa Air",from: "Kolkata", to: "Chennai",   time: "03:00 PM", price: 4300 },
    { airline: "IndiGo",   from: "Kolkata", to: "Hyderabad", time: "05:45 PM", price: 4100 },

   
    { airline: "IndiGo",   from: "Pune", to: "Delhi",     time: "06:20 AM", price: 4800 },
    { airline: "Air India",from: "Pune", to: "Mumbai",    time: "08:00 AM", price: 2500 },
    { airline: "Vistara",  from: "Pune", to: "Bangalore", time: "10:30 AM", price: 3000 },
    { airline: "SpiceJet", from: "Pune", to: "Hyderabad", time: "01:15 PM", price: 3000 },
    { airline: "Akasa Air",from: "Pune", to: "Chennai",   time: "04:00 PM", price: 3500 },

   
    { airline: "IndiGo",   from: "Goa", to: "Delhi",     time: "07:30 AM", price: 6000 },
    { airline: "Air India",from: "Goa", to: "Mumbai",    time: "09:15 AM", price: 3200 },
    { airline: "Vistara",  from: "Goa", to: "Bangalore", time: "12:00 PM", price: 3200 },
    { airline: "SpiceJet", from: "Goa", to: "Hyderabad", time: "02:45 PM", price: 3300 },
    { airline: "Akasa Air",from: "Goa", to: "Chennai",   time: "05:20 PM", price: 3900 },
  ];
 
  // ── Send the reminder email via EmailJS ─────────────────────────
  const sendReminderEmail = (fromCity, toCity, travelDate, results) => {
    const user     = localStorage.getItem("destinovaUser") || "Traveller";
    const userEmail = localStorage.getItem("destinovaEmail") || "hardikteotia@gmail.com"; // fallback to your email for demo
    const lowestPrice = results.length > 0
      ? Math.min(...results.map((f) => f.price))
      : "N/A";
 
    const templateParams = {
      to_email:  userEmail,
      user_name: user,
      from:      fromCity,
      to:        toCity,
      date:      travelDate || "Any date",
      price:     lowestPrice,
    };
 
    setEmailStatus("sending");
 
    emailjs
      .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
      .then(() => {
        setEmailSent(true);
        setEmailStatus("sent");
        console.log("✅ Reminder email sent!");
      })
      .catch((err) => {
        setEmailStatus("error");
        console.error("❌ Email failed:", err);
      });
  };
 
  // ── Start the 2-minute timer whenever search results update ─────
  const startEmailTimer = (fromCity, toCity, travelDate, results) => {
    // Cancel any existing timer first
    if (emailTimerRef.current) clearTimeout(emailTimerRef.current);
 
    // Reset sent status so it can fire again on a new search
    setEmailSent(false);
    setEmailStatus("");
 
    emailTimerRef.current = setTimeout(() => {
      sendReminderEmail(fromCity, toCity, travelDate, results);
    }, 30 * 1000); // 2 minutes
  };
 
  // ── On load: read URL params and filter ─────────────────────────
  useEffect(() => {
    const params  = new URLSearchParams(location.search);
    const urlFrom = params.get("from") || "";
    const urlTo   = params.get("to")   || "";
    const urlDate = params.get("date") || "";
 
    setFrom(urlFrom);
    setTo(urlTo);
    setDate(urlDate);
 
    let results;
    if (urlFrom || urlTo) {
      results = flights.filter(
        (f) =>
          f.from.toLowerCase().includes(urlFrom.toLowerCase()) &&
          f.to.toLowerCase().includes(urlTo.toLowerCase())
      );
    } else {
      results = flights;
    }
 
    setFilteredFlights(results);
 
    // Only start timer if user actually searched for something
    if (urlFrom && urlTo) {
      startEmailTimer(urlFrom, urlTo, urlDate, results);
    }
 
    // Cleanup on unmount
    return () => {
      if (emailTimerRef.current) clearTimeout(emailTimerRef.current);
    };
  }, [location.search]);
 
  // ── Manual search button ─────────────────────────────────────────
  const handleSearch = () => {
    
    if (!from || !to) {
      alert("Please enter both From and To locations.");
      return;
    }
    const results = flights.filter(
      (f) =>
        f.from.toLowerCase().includes(from.toLowerCase()) &&
        f.to.toLowerCase().includes(to.toLowerCase())
    );
    setFilteredFlights(results);
    localStorage.setItem("lastDestination", to);
    startEmailTimer(from, to, date, results);
  };
 
  return (
    <>
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
          <li>🌍<br />Destinations</li>
          <li>🧳<br />Travel</li>
          <li>⭐<br />Top Picks</li>
          <li>🏨<br />Hotels</li>
          <li>✈️<br />Flights</li>
          <li>💬<br />Reviews</li>
        </ul>
      </div>
 
      {/* Search Box */}
      <SearchBox
        from={from}
        to={to}
        date={date}
        setFrom={setFrom}
        setTo={setTo}
        setDate={setDate}
        onSearch={handleSearch}
      />
 
      {/* Email status toast */}
      {emailStatus === "sending" && (
        <div className="email-toast sending">⏳ We'll remind you to complete your booking...</div>
      )}
      {emailStatus === "sent" && (
        <div className="email-toast sent">📧 Reminder sent to your email!</div>
      )}
      {emailStatus === "error" && (
        <div className="email-toast error">⚠️ Could not send reminder email.</div>
      )}
 
      {/* Main Content */}
      <div className="container">
        <div className="destination-content">
          <div className="flights-container">
 
            {/* Filters */}
            <div className="filters">
              <h3>Filters</h3>
              <label><input type="checkbox" /> IndiGo</label>
              <label><input type="checkbox" /> Air India</label>
              <label><input type="checkbox" /> Vistara</label>
              <label><input type="checkbox" /> Akasa Air</label>
              <label><input type="checkbox" /> SpiceJet</label>
              <h3>Price</h3>
              <p>₹2000 - ₹8000</p>
            </div>
 
            {/* Results */}
            <div className="results-area">
              {filteredFlights.length === 0 ? (
                <h2>No flights found</h2>
              ) : (
                filteredFlights.map((flight, index) => (
                  <div className="flight-card" key={index}>
                    <div><strong>{flight.airline}</strong></div>
                    <div>{flight.from} → {flight.to}</div>
                    <div>{flight.time}</div>
                    <div className="price">₹{flight.price}</div>
                    <button>Book Now</button>
                  </div>
                ))
              )}
            </div>
 
          </div>
        </div>
      </div>
      <ChatBot />
      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 DESTINOVA. All rights reserved.</p>
      </footer>
    </>
  );
};
 
export default Flights;