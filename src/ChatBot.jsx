import React, { useState, useEffect, useRef } from "react";
import "./style.css";

// Realistic AQI data per city (values that look real & probable)
const cityAQI = {
  delhi:     { aqi: 168, level: "Unhealthy",        color: "#e53935", tip: "Wear a mask outdoors. Avoid prolonged outdoor activity." },
  mumbai:    { aqi: 87,  level: "Moderate",          color: "#fb8c00", tip: "Sensitive groups should limit outdoor exertion." },
  bangalore: { aqi: 62,  level: "Moderate",          color: "#fb8c00", tip: "Air quality is acceptable for most people." },
  chennai:   { aqi: 74,  level: "Moderate",          color: "#fb8c00", tip: "Sensitive individuals should take care outdoors." },
  hyderabad: { aqi: 91,  level: "Moderate",          color: "#fb8c00", tip: "Consider reducing outdoor activities if sensitive." },
  kolkata:   { aqi: 142, level: "Unhealthy for Some",color: "#f9a825", tip: "People with respiratory issues should stay indoors." },
  goa:       { aqi: 38,  level: "Good",              color: "#43a047", tip: "Great air quality! Perfect for outdoor activities." },
  pune:      { aqi: 79,  level: "Moderate",          color: "#fb8c00", tip: "Air quality is generally fine." },
  jaipur:    { aqi: 121, level: "Unhealthy for Some",color: "#f9a825", tip: "Limit prolonged outdoor exertion." },
  ahmedabad: { aqi: 110, level: "Unhealthy for Some",color: "#f9a825", tip: "Sensitive groups should reduce outdoor activity." },
  lucknow:   { aqi: 155, level: "Unhealthy",        color: "#e53935", tip: "Avoid outdoor activity. Keep windows closed." },
};

const getAQI = (city) => {
  const key = city?.toLowerCase().trim();
  return cityAQI[key] || { aqi: Math.floor(Math.random() * 60) + 40, level: "Moderate", color: "#fb8c00", tip: "Air quality data is estimated for this location." };
};

const QUICK_REPLIES = [
  { label: "✈️ Check AQI of my destination", id: "aqi" },
  { label: "🌤️ Is it safe to travel?",        id: "safe" },
  { label: "💡 Travel tips",                   id: "tips" },
  { label: "📞 Contact support",               id: "support" },
];

const getBotResponse = (input, destination) => {
  const msg = input.toLowerCase();

  if (msg.includes("hi") || msg.includes("hello") || msg.includes("hey")) {
    return { text: `Hey there! 👋 Welcome to Destinova! I'm Nova, your travel assistant. How can I help you today?`, showQuickReplies: true };
  }
  if (msg.includes("aqi") || msg.includes("air quality") || msg.includes("pollution")) {
    if (!destination) {
      return { text: "Please search for a flight first so I know your destination! ✈️", showQuickReplies: false };
    }
    const data = getAQI(destination);
    return {
      text: null,
      aqi: { city: destination, ...data },
      showQuickReplies: true,
    };
  }
  if (msg.includes("safe") || msg.includes("travel safe")) {
    if (!destination) {
      return { text: "Search for a destination first and I'll check safety info for you! 🗺️", showQuickReplies: false };
    }
    const data = getAQI(destination);
    const safe = data.aqi < 100;
    return {
      text: `${safe ? "✅" : "⚠️"} ${destination} currently has an AQI of ${data.aqi} (${data.level}). ${safe ? "It's generally safe to travel!" : "Take precautions — carry a mask and stay hydrated."}`,
      showQuickReplies: true,
    };
  }
  if (msg.includes("tip") || msg.includes("advice")) {
    return {
      text: "🧳 Travel Tips:\n\n• Book flights 3–6 weeks in advance for best prices\n• Always carry a printed copy of your ticket\n• Check AQI before travel, especially in metro cities\n• Keep your ID and boarding pass easily accessible\n• Arrive at the airport 2 hours before departure",
      showQuickReplies: true,
    };
  }
  if (msg.includes("support") || msg.includes("contact") || msg.includes("help")) {
    return { text: "📞 You can reach Destinova support at:\n\n📧 support@destinova.in\n📱 1800-XXX-XXXX (Toll Free)\n🕐 Available 24/7", showQuickReplies: true };
  }
  if (msg.includes("bye") || msg.includes("thank")) {
    return { text: "Happy travels! ✈️ Come back anytime. Destinova is always here for you 🌍", showQuickReplies: false };
  }
  return { text: "I'm not sure about that, but I'm here to help with flights, AQI, and travel tips! Try one of the options below 👇", showQuickReplies: true };
};

const ChatBot = () => {
  const [isOpen, setIsOpen]     = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I'm Nova 🌍, your Destinova travel assistant! How can I help you today?", showQuickReplies: true }
  ]);
  const [input, setInput]       = useState("");
  const [destination, setDestination] = useState("");
  const bottomRef               = useRef(null);

  // Pick up destination from URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const to = params.get("to") || localStorage.getItem("lastDestination") || "";
    setDestination(to);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text) => {
    const userMsg = text || input.trim();
    if (!userMsg) return;

    const newMessages = [...messages, { from: "user", text: userMsg }];
    setMessages(newMessages);
    setInput("");

    setTimeout(() => {
      const response = getBotResponse(userMsg, destination);
      setMessages((prev) => [...prev, { from: "bot", ...response }]);
    }, 600);
  };

  const handleQuickReply = (id) => {
    const labels = { aqi: "Check AQI of my destination", safe: "Is it safe to travel?", tips: "Travel tips", support: "Contact support" };
    sendMessage(labels[id]);
  };

  return (
    <>
      {/* Floating button */}
      <button className="chat-fab" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "✖" : "💬"}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-info">
              <span className="chat-avatar">🌍</span>
              <div>
                <strong>Nova</strong>
                <p>Destinova Travel Assistant</p>
              </div>
            </div>
            <button className="chat-close" onClick={() => setIsOpen(false)}>✖</button>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i}>
                <div className={`chat-bubble ${msg.from}`}>
                  {/* AQI Card */}
                  {msg.aqi ? (
                    <div className="aqi-card">
                      <p className="aqi-city">📍 {msg.aqi.city.charAt(0).toUpperCase() + msg.aqi.city.slice(1)}</p>
                      <div className="aqi-number" style={{ color: msg.aqi.color }}>{msg.aqi.aqi}</div>
                      <div className="aqi-level" style={{ background: msg.aqi.color }}>{msg.aqi.level}</div>
                      <p className="aqi-tip">{msg.aqi.tip}</p>
                      <div className="aqi-scale">
                        <span style={{color:"#43a047"}}>● Good</span>
                        <span style={{color:"#fb8c00"}}>● Moderate</span>
                        <span style={{color:"#e53935"}}>● Unhealthy</span>
                      </div>
                    </div>
                  ) : (
                    <span style={{ whiteSpace: "pre-line" }}>{msg.text}</span>
                  )}
                </div>

                {/* Quick reply buttons after bot messages */}
                {msg.from === "bot" && msg.showQuickReplies && i === messages.length - 1 && (
                  <div className="quick-replies">
                    {QUICK_REPLIES.map((qr) => (
                      <button key={qr.id} className="quick-reply-btn" onClick={() => handleQuickReply(qr.id)}>
                        {qr.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="chat-input-area">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button className="chat-send-btn" onClick={() => sendMessage()}>➤</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;