import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { ShoppingCartProvider } from "./utils/context";
function App() {
  return (
    <>
      <ShoppingCartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clothes" element={<Home />} />
            <Route path="/furnitures" element={<Home />} />
            <Route path="/miscellaneous" element={<Home />} />
          </Routes>
          <Navbar />
        </Router>
      </ShoppingCartProvider>
    </>
  );
}

export default App;
