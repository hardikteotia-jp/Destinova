import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home";
import Destinations from "./Destinations";
import Flights from "./Flights";
import Login from "./Login";
import Registration from "./Registration";
import Travel from "./Travel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} /> 
        <Route path="/travel" element={<Travel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;