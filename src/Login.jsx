import React, { useState } from "react";
import "./styles.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateLogin = (e) => {
    e.preventDefault();

    const username = email.split("@")[0];
    localStorage.setItem("destinovaUser", username);
    localStorage.setItem("destinovaEmail", email);

    if (email === "" || password === "") {
      alert("Fill all fields");
      return;
    }

    alert("Login Successful");
    window.location.href = "/";
  };

  return (
    <div className="auth-page"
      style={{
        backgroundImage: "url('/hardik.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <div className="form-container">
        <h1>Welcome Back</h1>
        <p>Login to continue exploring amazing destinations!</p>

        <form onSubmit={validateLogin}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        <p>
          Don't have an account? <a href="/register">Sign up here</a>.
        </p>
      </div>
    </div>
  );
}

export default Login;